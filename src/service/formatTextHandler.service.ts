import { IFormatTextParameter, IHandler, IFormatTextResponse } from '../model/formatTextDetails.dto';
import { alignText, fetchRandomJoke } from './../util/util';



abstract class AbstractHandler implements IHandler {
  private nextHandler!: IHandler;
  public setNext(handler: IHandler): IHandler {
    this.nextHandler = handler;
    
    return handler;
  }

   public async handle(request: IFormatTextParameter): Promise<IFormatTextResponse> {
    if (this.nextHandler) {
      return this.nextHandler.handle(request)
    }
    return {lineSentence:request.lineSentence, sentenceArray:request.sentenceArray,splittedText:request.splittedText, index:request.index}
  }
  
}

export class FormatTextWithLineBreakHandler extends AbstractHandler {
   public async handle(request: IFormatTextParameter): Promise<IFormatTextResponse> {
     if (request.formattedString?.includes("\n")) {
       request.lineSentence += `${request.formattedString.substring(0, request.formattedString.indexOf("\n"))}`;
      request.sentenceArray?.push(alignText(request.lineSentence?.trim(), request.lineWidth, request.textAlignment));
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

export class FormatTextBelowLineWidthHandler extends AbstractHandler {

  public async handle(request: IFormatTextParameter): Promise<IFormatTextResponse> {
    if (request.sentenceWidthCounter < request.lineWidth &&  (request.sentenceWidthCounter + request.formattedString.length) <= request.lineWidth) {
      request.lineSentence += ` ${request.formattedString}`;
      return {lineSentence:request.lineSentence, sentenceArray:request.sentenceArray, splittedText: request.splittedText,index: request.index}
    }
    return super.handle(request)
  }
}


export class FormatTextAboveLineWidthHandler extends AbstractHandler {
  public async  handle(request: IFormatTextParameter): Promise<IFormatTextResponse> {
 if ((request.sentenceWidthCounter + request.formattedString.length) > request.lineWidth) {
  request.sentenceArray?.push(alignText(request.lineSentence?.trim(), request.lineWidth, request.textAlignment));
  request.lineSentence = ` ${request.formattedString}`;
  request.sentenceWidthCounter = 0;
  return {lineSentence:request.lineSentence, sentenceArray:request.sentenceArray, splittedText:request.splittedText, index:request.index}
 }
 return super.handle(request);
  }
}








