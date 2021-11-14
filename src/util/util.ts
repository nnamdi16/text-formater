

import axios, {AxiosResponse} from 'axios';
import { IRandomJokesResponse, IEditString } from '../randomJokes.response';
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

enum TextAlign {
    CENTER = 'center',
    LEFT = 'left',
    RIGHT = 'right'
}

export const formatString = (editParameters: IEditString) => {
    const {boldStrings, italicsStrings, replaceStrings, text} = editParameters
    const formatStringParameters = {
        boldStringIdentifier: Array.from((new Set(boldStrings))),
        italicStringIdentifier: Array.from((new Set(italicsStrings))),
        stringReplacementIdentifier: replaceStrings

    }
  const {boldStringIdentifier, italicStringIdentifier, stringReplacementIdentifier}= formatStringParameters
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

export const alignText = (text: string, lineWidth: number, type: string) => {
    const textSize = text.length
    const lineSpace = lineWidth - textSize;
    if (lineSpace > 0 && type.toLowerCase() === TextAlign.RIGHT) {
        return ' '.repeat(lineSpace) + text;

    } else if (lineSpace > 0 && type.toLowerCase() === TextAlign.LEFT) {
        return text + ' '.repeat(lineSpace);
    } else if (lineSpace > 0 && type.toLowerCase() === TextAlign.CENTER) {
        const centerSpacing = Math.floor(lineSpace / 2);
        return ' '.repeat(centerSpacing) + text + ' '.repeat(centerSpacing);
    } else {
        return text;
    }

}

export const checkRandomJokesIndentifier = (word: string, randomJokesIndentifier: string []) => {
    //Todo: Remove punctuations from text.
    const removePunctuations = word.replace(/[!"#$%&'()*+,-./:;<=>?@[\]^_`{|}~]/g, '');

    //Todo: Check if the string exist as part of strings to identify where to add random jokes
    return randomJokesIndentifier.includes(removePunctuations);
}
