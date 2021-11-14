import { FormatTextWithNewLineHandler, FormatTextBelowLineWidthHandler, FormatTextAboveLineWidthHandler } from './formatTextHandler.service';
import { formatString } from '../util/util';
import { IReplaceString } from '../randomJokes.response';

import { checkRandomJokesIndentifier } from '../util/util';
import { FormatTextBuilder } from '../model/formatTextBuilder';

const formatTextWithNewLineHandler = new FormatTextWithNewLineHandler();
const formatStringLess = new FormatTextBelowLineWidthHandler();
const formatStringGreat = new FormatTextAboveLineWidthHandler();
formatTextWithNewLineHandler.setNext(formatStringLess).setNext(formatStringGreat);

export class FormatTextDetails {
  handler= formatTextWithNewLineHandler;
  lineWidth: number;
  text: string;
  alignText: string;
  textSpacing: string;
  italics: string[];
  bold: string[];
  replaceStrings: IReplaceString;
  randomJokesIdentifier: string[]
  
  constructor(stringFormatBuilder:FormatTextBuilder) {
    this.lineWidth = stringFormatBuilder.lineWidth;
    this.text = stringFormatBuilder.text;
    this.alignText = stringFormatBuilder.alignText;
    this.textSpacing = stringFormatBuilder.textSpacing;
    this.italics = stringFormatBuilder.italics;
    this.bold = stringFormatBuilder.bold;
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
      const formattedString = (splitWord.map((text: string) => formatString({ text, bold:this.bold, italics: this.italics, replaceString: this.replaceStrings }))).join('');
      const formattedStringResult = await (this.handler.handle({ formattedString, splittedText, sentenceWidthCounter, sentenceArray, lineSentence, randomJokeCounter, index, lineWidth:this.lineWidth, textAlign:this.alignText, textSpacing:this.textSpacing, randomJokesIdentifier: this.randomJokesIdentifier, text:this.text, bold: this.bold, italics:this.italics, replaceString:this.replaceStrings }))
      sentenceWidthCounter = formattedStringResult.lineSentence.length
      sentenceArray = formattedStringResult.sentenceArray;
      splittedText = formattedStringResult.splittedText;
      lineSentence = formattedStringResult.lineSentence;
      index = formattedStringResult.index
    }
    return (this.textSpacing.toLocaleLowerCase() === 'double') ? sentenceArray.join('\n\n') : sentenceArray.join('\n')
  }

}