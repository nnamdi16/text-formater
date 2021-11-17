import { IFormatString } from './../model/formatTextDetails.dto';


import axios, {AxiosResponse} from 'axios';
import { IRandomJokesResponse, TextAlign } from '../model/formatTextDetails.dto';
export const BASE_URL = `https://api.chucknorris.io/jokes/random`

export const fetchRandomJoke = async(): Promise<string[]> => {
    try {
        const response:AxiosResponse<IRandomJokesResponse> = await (await axios.get(BASE_URL));

        let randomJoke: string[] = [];
        if (response.data) {
        randomJoke  =  await (response.data.value).split(' ');
    }    
        return randomJoke; 
    } catch (error) {
        return [];
    }
}



export const formatString = (editParameters: IFormatString) => {
    const { boldStrings, italicsStrings, replaceStrings, text } = editParameters;
    const boldStringIdentifier = Array.from((new Set(boldStrings)));
    const italicStringIdentifier = Array.from((new Set(italicsStrings)));
    const stringReplacementIdentifier =  replaceStrings


    const isBoldStringIdentifier = boldStringIdentifier.includes(text);
    const isItalicStringIdentifier = italicStringIdentifier.includes(text);
    const isreplaceStringIdentifier = Object.keys(stringReplacementIdentifier).includes(text);
    if (!isBoldStringIdentifier && !isItalicStringIdentifier && !isreplaceStringIdentifier) {
        return text;
    }
    const results = [];
    results.push(text)
    if (isBoldStringIdentifier) {
        const boldValuePosition = boldStringIdentifier.indexOf(text);
        const replaceValue: string = boldStringIdentifier[boldValuePosition];
        results[results.length - 1] = results[results.length - 1].split(replaceValue).join(`**${replaceValue}**`)
    }

    if (isItalicStringIdentifier) {
        const italicValuePosition = italicStringIdentifier.indexOf(text);
        const replaceValue: string= italicStringIdentifier[italicValuePosition]
        results[results.length - 1] = results[results.length - 1].split(replaceValue).join(`_${replaceValue}_`)

    }

    if (isreplaceStringIdentifier) {
        results[results.length - 1] = results[results.length - 1].split(text).join(stringReplacementIdentifier[text])
    }
    return results.toString();


}

export const alignText = (text: string, lineWidth: number, type: TextAlign) => {
    const textSize = text.length
    const lineSpace = lineWidth - textSize;
    type = lineSpace > 0 ? type : TextAlign.DEFAULT;
    return {
        right: () => `${' '.repeat(lineSpace)}${text}`,
        left: () => `${text}${' '.repeat(lineSpace)}`,
        center: () => {
            const centerSpacing = Math.floor(lineSpace / 2);
            return `${' '.repeat(centerSpacing)}${text}${' '.repeat(centerSpacing)}`;
        },
        default: () => text
    }[type]

}

export const checkRandomJokesIndentifier = (word: string, randomJokesIndentifier: string []) => {
    const removePunctuations = word.replace(/[!"#$%&'()*+,-./:;<=>?@[\]^_`{|}~]/g, '');

    return randomJokesIndentifier.includes(removePunctuations);
}
