import { FormatTextDetails } from './../service/formatText.service';
import { IReplaceString } from '../randomJokes.response';

export class FormatTextBuilder {

  lineWidth!: number;
  text!: string;
  alignText!: string;
  textSpacing!: string;
  italics!: string[];
  bold!: string[];
  replaceStrings!: IReplaceString;
  randomJokesIdentifier!: string[];

  setText(text:string) {
      this.text = text ;
      return this;
  }

  setLineWidth(lineWidth: number) {
      this.lineWidth = lineWidth ;
      return this;
  }

  setAlignText(alignText:string) {
    this.alignText = alignText;
      return this;
  }

  setTextSpacing(textSpacing: string) {
      this.textSpacing = textSpacing
      return this;
  }
  
    setItalics(italics: string[]) {
      this.italics = italics;
      return this;
    }
  
    setBold(bold: string[]) {
      this.bold = bold;
      return this;
    }
  
    setReplaceStrings(replaceStrings:IReplaceString) {
      this.replaceStrings = replaceStrings;
      return this;
    }
  
    setRandomJokeIdentifier(randomJokeIdentifier:string[]) {
      this.randomJokesIdentifier = randomJokeIdentifier;
      return this;
    }
  
  
  
  

  
  build() {
 
      return new FormatTextDetails(this);
  }

}