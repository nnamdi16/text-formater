import { textAlignment, fetchRandomJoke, checkRandomJokesIndentifier, boldString } from '../index';
import { IFormatText, IReplaceString } from './../randomJokes.response';

// class TextFormat implements IFormatText, FormatTextOperation{
//   lineWidth: number;
//   textAlign:string;
//   textSpacing: string;
//   randomJokesIndentifier: string[];
//   text: string;
//   bold: string[];
//   italics: string[];
//   replaceString: IReplaceString;

//   constructor(lineWidth:number, params:IFormatText) {
//     this.lineWidth = lineWidth;
//     this.textAlign = params.textAlign;
//     this.textSpacing = params.textSpacing;
//     this.randomJokesIndentifier = params.randomJokesIdentifier;
//     this.text = params.text;
//     this.bold = params.bold;
//     this.italics = params.italics;
//     this.replaceString = params.replaceString

//   }
//   sentenceNotGreaterThanLineWidth(lineWidth: number, sentenceWidth: string, formattedString: string): void {
//     throw new Error('Method not implemented.');
//   }
//   sentenceEndsWithNewLine(): void {
//     throw new Error('Method not implemented.');
//   }

//   sentenceGreaterThanLineWidth(): void {
//     throw new Error('Method not implemented.');
//   }
// }

interface FormatTextOperation {
  sentenceEndsWithNewLine(): void;
  sentenceNotGreaterThanLineWidth(lineWidth:number, sentenceWidth:string, formattedString:string): void;
  sentenceGreaterThanLineWidth(): void;
}


interface StringFormatResponse {
  readonly lineSentence: string;
  readonly sentenceArray: string[],
  readonly splittedText: string[],
  readonly index: number;
}

interface Handler {
  setNext(handler: Handler): Handler;
  handle(request:FormatStringParameter): Promise<StringFormatResponse> 
}



abstract class AbstractHandler implements Handler {
  private nextHandler!: Handler;
  public setNext(handler: Handler): Handler {
    this.nextHandler = handler;
    
    return handler;
  }

   public async handle(request: FormatStringParameter): Promise<StringFormatResponse> {
    if (this.nextHandler) {
      return this.nextHandler.handle(request)
    }
    return {lineSentence:request.lineSentence, sentenceArray:request.sentenceArray,splittedText:request.splittedText, index:request.index}
  }
  
}

class FormattedStringWithNewLineHandler extends AbstractHandler {
   public async handle(request: FormatStringParameter): Promise<StringFormatResponse> {
     if (request.formattedString?.indexOf("\n") > -1) {
       request.lineSentence += `${request.formattedString.substring(0, request.formattedString.indexOf("\n"))}`;
      //  console.log(request.lineSentence);
      request.sentenceArray?.push(textAlignment(request.lineSentence?.trim(), request.lineWidth, request.textAlign));
      request.sentenceWidthCounter = 0;
      if (request.randomJokeCounter > 0) {
        const unformattedStrings: string[] = request.splittedText.slice(request.index + 1);
        const randomJoke = await fetchRandomJoke();
        if (randomJoke.length > 0) {
          randomJoke.push(request.formattedString.substring(request.formattedString.indexOf("\n") + 1));
          request.splittedText = randomJoke.concat(unformattedStrings);
          request.index = -1;
        }
        request.randomJokeCounter = 0;
        request.lineSentence = '';
        return {lineSentence:request.lineSentence, sentenceArray:request.sentenceArray,splittedText:request.splittedText, index: request.index}
      } else {
        request.lineSentence = request.formattedString.substring(request.formattedString.indexOf("\n") + 1);
        return {lineSentence:request.lineSentence, sentenceArray:request.sentenceArray, splittedText: request.splittedText, index:request.index}
      }
    }
    return super.handle(request)
  }
  
}

class FormattedStringNotGreaterThanLineWidthHandler extends AbstractHandler {

  public async handle(request: FormatStringParameter): Promise<StringFormatResponse> {
    if (request.sentenceWidthCounter < request.lineWidth &&  (request.sentenceWidthCounter + request.formattedString.length) <= request.lineWidth) {
      request.lineSentence += ` ${request.formattedString}`;
      return {lineSentence:request.lineSentence, sentenceArray:request.sentenceArray, splittedText: request.splittedText,index: request.index}
    }
    return super.handle(request)
  }
}


class FormattedStringLessThanLineWidthHandler extends AbstractHandler {
  public async  handle(request: FormatStringParameter): Promise<StringFormatResponse> {
 if ((request.sentenceWidthCounter + request.formattedString.length) > request.lineWidth) {
  request.sentenceArray?.push(textAlignment(request.lineSentence?.trim(), request.lineWidth, request.textAlign));
  request.lineSentence = ` ${request.formattedString}`;
  request.sentenceWidthCounter = 0;
  return {lineSentence:request.lineSentence, sentenceArray:request.sentenceArray, splittedText:request.splittedText, index:request.index}
 }
 return super.handle(request);
  }
}

interface FormatStringParameter extends IFormatText {
  formattedString: string;
  splittedText: string[];
  sentenceWidthCounter: number;
  sentenceArray: string[];
  lineSentence: string;
  randomJokeCounter: number;
  index: number;

}
export const formatStringNewLine = new FormattedStringWithNewLineHandler();
const formatStringLess = new FormattedStringLessThanLineWidthHandler();
const formatStringGreat = new FormattedStringNotGreaterThanLineWidthHandler();
formatStringNewLine.setNext(formatStringLess).setNext(formatStringGreat);

export const textFormatter = async (handler: Handler, formatter: IFormatText) => {
  let randomJokeCounter = 0;
  let sentenceWidthCounter = 0;
  let  sentenceArray: string[] = [];
  let  lineSentence = '';
  
 

  const {randomJokesIdentifier, text, bold, italics, replaceString, lineWidth, textAlign = 'left', textSpacing = 'single'} = formatter

  let splittedText = text.split(' ');


  for (let index = 0; index < splittedText.length; index++) {
   
    const isRandomJokeIdentifier = checkRandomJokesIndentifier(splittedText[index], randomJokesIdentifier);
    if (isRandomJokeIdentifier) {
      randomJokeCounter += 1;
    }
   
    const splitWord = splittedText[index].split(/([?,!,.,\n,''])/);
    const formattedString = (splitWord.map((text: string) => boldString({ text, bold, italics, replaceString }))).join('');
    const formattedStringResult = await (handler.handle({ formattedString, splittedText, sentenceWidthCounter, sentenceArray, lineSentence, randomJokeCounter, index, lineWidth, textAlign, textSpacing, randomJokesIdentifier, text, bold, italics, replaceString }))
    sentenceWidthCounter = formattedStringResult.lineSentence.length
    sentenceArray = formattedStringResult.sentenceArray;
    splittedText = formattedStringResult.splittedText;
    lineSentence = formattedStringResult.lineSentence;
    index = formattedStringResult.index
  }
  return (textSpacing.toLocaleLowerCase() === 'double') ? sentenceArray.join('\n\n') : sentenceArray.join('\n')
}



