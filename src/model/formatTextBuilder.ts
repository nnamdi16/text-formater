import { LineSpacing, TextAlign } from './formatTextDetails.dto';
import { FormatTextDetails } from './../service/formatText.service';
import { IReplaceString } from '../randomJokes.response';

export class FormatTextBuilder {

  lineWidth!: number;
  text!: string;
  textAlignment!: TextAlign;
  lineSpacing!: LineSpacing;
  italicsStrings!: string[];
  boldStrings!: string[];
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

  setTextAlignment(textAlignment:TextAlign) {
    this.textAlignment = textAlignment;
      return this;
  }

  setLineSpacing(lineSpacing: LineSpacing) {
      this.lineSpacing = lineSpacing
      return this;
  }
  
    setItalicsStrings(italicsStrings: string[]) {
      this.italicsStrings = italicsStrings;
      return this;
    }
  
    setBoldStrings(boldStrings: string[]) {
      this.boldStrings = boldStrings;
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