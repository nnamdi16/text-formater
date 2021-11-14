export interface IRandomJokesResponse {
  readonly icon_url: string;
  readonly id: string;
  readonly url: string;
  readonly value: string;
}

export interface IFormatString {
  readonly text: string;
  readonly bold: string[];
  readonly italics: string[];
  readonly replaceString: IReplaceString;


}

export interface IReplaceString {
  [key:string] : string
}

export interface IFormatText extends IFormatString{
  readonly lineWidth: number;
  readonly textAlign: string;
  readonly textSpacing: string;
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

