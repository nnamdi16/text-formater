export interface IRandomJokesResponse {
  readonly icon_url: string;
  readonly id: string;
  readonly url: string;
  readonly value: string;
}

export interface IEditString {
  readonly text: string;
  readonly bold: string[];
  readonly italics: string[];
  readonly replaceString:IReplaceString


}

interface IReplaceString {
  [key:string] : string
}

export interface IFormatText extends IEditString{
  readonly lineWidth: number;
  readonly textAlign: string;
  readonly textSpacing: string;
  readonly randomJokesIndentifier:string[]

}