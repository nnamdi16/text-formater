export interface IRandomJokesResponse {
  readonly icon_url: string;
  readonly id: string;
  readonly url: string;
  readonly value: string;
}

export interface IFormatString {
  readonly text: string;
  readonly boldStrings: string[];
  readonly italicsStrings: string[];
  readonly replaceStrings: IReplaceString;


}

export interface IReplaceString {
  [key:string] : string
}

export interface IFormatText extends IFormatString{
  readonly lineWidth: number;
  readonly textAlignment: string;
  readonly lineSpacing: string;
  readonly randomJokesIdentifier:string[]

}

export interface IFormatTextResponse {
  lineSentence: string;
  sentenceArray: string[],
  splittedText: string[],
  index: number;
}


export interface IFormatTextParameter extends IFormatText, IFormatTextResponse {
  formattedString: string;
  sentenceWidthCounter: number;
  randomJokeCounter: number;
}

export interface IHandler {
  setNext(handler: IHandler): IHandler;
  handle(request:IFormatTextParameter): Promise<IFormatTextResponse> 
}

export enum TextAlign {
  CENTER = 'center',
  LEFT = 'left',
  RIGHT = 'right'
}

export enum LineSpacing {
  SINGLE = 'single',
  DOUBLE = 'double'
}

