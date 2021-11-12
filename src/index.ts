
import axios from 'axios';

const fetchRandomJoke = async() => {
    try {
        const baseUrl = `https://api.chucknorris.io/jokes/random`
        const response = await axios.get(baseUrl)
        return await (response.data.value).split(' ');
        
    } catch (error) {
        console.log(error)
    }
}

const boldString = (text: string, boldStringIdentifiers: string[], italicStringIdentifiers: string[], replaceStringIdentifiers: any) => {

    const replacement = {
        bold: Array.from((new Set(boldStringIdentifiers))),
        italic: Array.from((new Set(italicStringIdentifiers))),
        stringReplacement: replaceStringIdentifiers

    }
    const isBoldStringIdentifier = replacement.bold.includes(text);
    const isItalicStringIdentifier = replacement.italic.includes(text);
    const isreplaceStringIdentifier = Object.keys(replacement.stringReplacement).includes(text);
    if (!isBoldStringIdentifier && !isItalicStringIdentifier && !isreplaceStringIdentifier) {
        return text;
    }
    const results = [];
    results.push(text)
    if (isBoldStringIdentifier) {
        const boldValuePosition = replacement.bold.indexOf(text);
        const replaceValue: any = replacement.bold[boldValuePosition];
        results[results.length - 1] = results[results.length - 1].split(replaceValue).join(`**${replaceValue}**`)
    }

    if (isItalicStringIdentifier) {
        const italicValuePosition = replacement.italic.indexOf(text);
        const replaceValue: any= replacement.italic[italicValuePosition]
        results[results.length - 1] = results[results.length - 1].split(replaceValue).join(`_${replaceValue}_`)

    }

    if (isreplaceStringIdentifier) {
        results[results.length - 1] = results[results.length - 1].split(text).join(replacement.stringReplacement[text])
    }
    return results.toString();


}

const textAlignment = (text: string | any[], lineWidth: number, type: string) => {
    const sizeOfText = text.length
    const spacing = lineWidth - sizeOfText;
    if (spacing > 0 && type.toLowerCase() === 'right') {
        return ' '.repeat(spacing) + text;

    } else if (spacing > 0 && type.toLowerCase() === 'left') {
        return text + ' '.repeat(spacing);
    } else if (spacing > 0 && type.toLowerCase() === 'center') {
        const centerSpacing = Math.floor(spacing / 2);
        return ' '.repeat(centerSpacing) + text + ' '.repeat(centerSpacing);
    } else {
        return text;
    }

}

const checkRandomJokesIndentifier = (word: string, randomJokesIndentifier: string | any[]) => {
    //Todo: Remove punctuations from text.
    const removePunctuations = word.replace(/[!"#$%&'()*+,-./:;<=>?@[\]^_`{|}~]/g, '');

    //Todo: Check if the string exist as part of strings to identify where to add random jokes
    return randomJokesIndentifier.includes(removePunctuations);
}



const formattedText = async(lineWidth: number, textAlign: string, textSpacing: string, boldWords: string[], italicString: string[], stringReplacement: { cursus: string; lacinia: string; }, randomJokesIndentifier: string[], text: string) => {
    //Todo: Split the sentence to an array of words
    let splitText = text.split(' ');

    //Todo: Define countSentenceLength that tracks line width 
    let countSentenceLength = 0

    //Todo: Define Sentence array that temporarily stores formatted sentences.
    const sentenceArray = [];

    //Todo: Define Sentence Formation that combines formatted sentences that belongs to a particular line within the line width limit
    let sentenceFormation = '';

    //Todo Defines countRandomString that keeps track of selected words for adding random Chuck norris joke  after the paragraph of such selected words
    let countRandomString = 0;

    //Todo: Loop through the splitted sentences to format them based on certain criteria
    for (let index = 0; index < splitText.length; index++) {

        const isRandomJokeIdentifier = checkRandomJokesIndentifier(splitText[index], randomJokesIndentifier)

        //Todo: If the string exist increment the value of countRandomString
        if (isRandomJokeIdentifier) {
            countRandomString += 1;
        }
        //Todo:Split text to dissociate them from punctuations and so that can be formatted as based on the criteria set
        const splitWord = splitText[index].split(/([?,!,.,\n,''])/);
        const formatString = (splitWord.map((item: any) => boldString(item, boldWords, italicString, stringReplacement))).join('')

        //Todo: Check if a new line character is attached to a formatted string
        if (formatString.indexOf("\n") !== -1) {
            //Todo: Seperate the formatString  from the new line character and add it to the already existing formatted text
            sentenceFormation += `${formatString.substring(0, formatString.indexOf("\n"))}`;

            //Todo: Add the aligned text to a list of formatted text.
            sentenceArray.push(textAlignment(sentenceFormation.trim(), lineWidth, textAlign));

            //Todo: Set the line width tracker to zero.
            countSentenceLength = 0;

            //Todo: Check if strings that notifies when to add random sentences are identified.
            if (countRandomString > 0) {
                //Todo: Remove already formatted string from the array
                const unformattedStrings = splitText.slice(index + 1)

                //Todo: Fetch the random joke
                const randomJoke:string[] = await fetchRandomJoke();
                if (randomJoke.length > 0) {
                    //Todo: Push text after the new line to the random jokes array.
                    randomJoke.push(formatString.substring(formatString.indexOf("\n") + 1))

                    //Todo:Join the new array from splitText to the random jokes array and assign it to splitText 
                    splitText = randomJoke.concat(unformattedStrings);

                    //Todo: Set the loop index to -1 so as to start looping the new array 
                    index = -1;
                }

                //Todo: set the tracker that counts where to add the random string to zero.
                countRandomString = 0;

                //Todo: Reset the sentence formation to an empty string 
                sentenceFormation = '';
            } else {
                //Todo: If the random string tracker is not greater than zero, add the next string to the after the new line to the sentence.
                sentenceFormation = `${formatString.substring(formatString.indexOf("\n")+1)}`
            }


            //Todo: If the sentence length is less than the set line width and the adding it with the newly formated string is still less than the line width, add the formatted string to the formed sentence.

        } else if (countSentenceLength < lineWidth && (countSentenceLength + formatString.length) <= lineWidth) {
            sentenceFormation += ` ${formatString}`

        } else {
            //Todo: Trim the formed sentence, set its alignment and push it to the already formatted sentence array
            sentenceArray.push(textAlignment(sentenceFormation.trim(), lineWidth, textAlign));
            //Todo: Create a new sentence formation by assigning the most recent string to sentenceFormation as the first element
            sentenceFormation = formatString

            //TOdo: Reset countSentenceLength
            countSentenceLength = 0;

        }
        //Todo: Update the sentenceLength at the end of each loop.
        countSentenceLength = sentenceFormation.length
    }
    //Todo: Return the entire formatted sentence.
    // console.log(sentenceArray.join('\n'));
    return (textSpacing.toLocaleLowerCase() === 'double') ? sentenceArray.join('\n\n') : sentenceArray.join('\n')
   
    // return boldString(sentenceArray.toString(), ['Aliquam', 'Mauris'], ['elit'], [{ cursus: "CURSUS" }, { lacinia: 'malesuada nunc' }]);
}
const words = `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi sit amet lacus eu purus malesuada sodales. Nunc a risus nunc.\nPraesent eget volutpat eros. Fusce mollis gravida nunc, vitae accumsan ligula varius vitae. Duis in tellus non est pulvinar efficitur quis ac tortor. Aliquam dictum, magna quis venenatis pharetra, leo sapien mollis mauris, et vestibulum arcu est eget turpis. Etiam tortor erat, lacinia et faucibus vitae, maximus et elit.\nDonec nisl nisi, imperdiet vitae felis ut, maximus condimentum ante. Curabitur efficitur sem sed ligula eleifend varius. Mauris et risus quis libero mattis auctor id ut orci.\nAliquam cursus sapien et euismod vestibulum. In maximus dolor eu vulputate tempus. Aenean ultricies nisl id elit mattis, vitae finibus libero interdum. Vestibulum ornare quam nec ornare fermentum.`


// const result = async() => {
//     await formattedText(100, 'center', '', ['Aliquam', 'Mauris', 'Aliquam'], ['elit'], { cursus: "CURSUS", lacinia: 'malesuada nunc' }, ["tortor", "fames"], words)
// };
// result()

formattedText(100, 'left', 'double', ['Aliquam', 'Mauris', 'Aliquam'], ['elit'], { cursus: "CURSUS", lacinia: 'malesuada nunc' }, ["tortor", "fames"], words).then((res) => console.log(res))