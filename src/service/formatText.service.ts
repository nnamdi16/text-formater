import { LineSpacing, TextAlign } from './../model/formatTextDetails.dto';
import { FormatTextWithLineBreakHandler, FormatTextBelowLineWidthHandler, FormatTextAboveLineWidthHandler } from './formatTextHandler.service';
import { formatString } from '../util/util';
import { IReplaceString } from '../randomJokes.response';

import { checkRandomJokesIndentifier } from '../util/util';
import { FormatTextBuilder } from '../model/formatTextBuilder';

const formatTextWithLineBreakHandler = new FormatTextWithLineBreakHandler();
const formatStringLess = new FormatTextBelowLineWidthHandler();
const formatStringGreat = new FormatTextAboveLineWidthHandler();
formatTextWithLineBreakHandler.setNext(formatStringGreat).setNext(formatStringLess);

export class FormatTextDetails {
  handler= formatTextWithLineBreakHandler;
  lineWidth: number;
  text: string;
  textAlignment: TextAlign;
  lineSpacing: LineSpacing;
  italicsStrings: string[];
  boldStrings: string[];
  replaceStrings: IReplaceString;
  randomJokesIdentifier: string[]
  
  constructor(stringFormatBuilder:FormatTextBuilder) {
    this.lineWidth = stringFormatBuilder.lineWidth;
    this.text = stringFormatBuilder.text;
    this.textAlignment = stringFormatBuilder.textAlignment;
    this.lineSpacing = stringFormatBuilder.lineSpacing;
    this.italicsStrings = stringFormatBuilder.italicsStrings;
    this.boldStrings = stringFormatBuilder.boldStrings;
    this.replaceStrings = stringFormatBuilder.replaceStrings;
    this.randomJokesIdentifier = stringFormatBuilder.randomJokesIdentifier;

  }

  async formatText() {
    let randomJokeCounter = 0;
    let sentenceWidthCounter = 0;
    let sentenceArray: string[] = [];
    let lineSentence = '';
    let splittedText = this.text.split(' ');
    for (let index = 0; index < splittedText.length; index++) {
   
      const isRandomJokeIdentifier = checkRandomJokesIndentifier(splittedText[index], this.randomJokesIdentifier);
      if (isRandomJokeIdentifier) {
        randomJokeCounter += 1;
      }
     
      const splitWord = splittedText[index].split(/([?,!,.,\n,''])/);
      const formattedString = (splitWord.map((text: string) => formatString({ text, boldStrings:this.boldStrings, italicsStrings: this.italicsStrings, replaceStrings: this.replaceStrings }))).join('');
      const formattedStringResult = await (this.handler.handle({ formattedString, splittedText, sentenceWidthCounter, sentenceArray, lineSentence, randomJokeCounter, index, lineWidth:this.lineWidth, textAlignment:this.textAlignment, lineSpacing:this.lineSpacing, randomJokesIdentifier: this.randomJokesIdentifier, text:this.text, boldStrings: this.boldStrings, italicsStrings:this.italicsStrings, replaceStrings:this.replaceStrings }))
      sentenceWidthCounter = formattedStringResult.lineSentence.length
      sentenceArray = formattedStringResult.sentenceArray;
      splittedText = formattedStringResult.splittedText;
      lineSentence = formattedStringResult.lineSentence;
      index = formattedStringResult.index
    }
    return (this.lineSpacing.toLocaleLowerCase() === 'double') ? sentenceArray.join('\n\n') : sentenceArray.join('\n')
  }

}