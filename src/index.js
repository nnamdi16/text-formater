// @ts-nocheck
import fetch from "node-fetch";

const fetchJokes = async() => {
        try {
            const baseUrl = `https://api.chucknorris.io/jokes/random`
            const response = await fetch(baseUrl)
            const data = await response.json();

            const { value } = data;
            return value.split(' ');
        } catch (error) {
            console.log(error)
        }
    }
    // console.log(fetchJokes())

const boldString = (text, replaceBoldValues, replaceItalicValues, replaceString) => {

    const replacement = {
            bold: [...(new Set(replaceBoldValues))],
            italic: [...(new Set(replaceItalicValues))],
            stringReplacement: replaceString

        }
        // console.log(replacement.italic)
    const isBoldValue = replacement.bold.includes(text);
    const isItalicValue = replacement.italic.includes(text);
    const isStringReplacementValue = Object.keys(replacement.stringReplacement).includes(text);
    // console.log(Object.keys(replacement.stringReplacement))
    // console.log(isStringReplacementValue)
    if (!isBoldValue && !isItalicValue && !isStringReplacementValue) {
        return text;
    }
    let result = [];
    result.push(text)
    if (isBoldValue) {
        const boldValuePosition = replacement.bold.indexOf(text);
        const replaceValue = replacement.bold[boldValuePosition]
        result[result.length - 1] = result[result.length - 1].split(replaceValue).join(`**${replaceValue}**`)
    }

    if (isItalicValue) {
        const italicValuePosition = replacement.italic.indexOf(text);
        const replaceValue = replacement.italic[italicValuePosition]
        result[result.length - 1] = result[result.length - 1].split(replaceValue).join(`_${replaceValue}_`)

    }

    if (isStringReplacementValue) {
        //Todo: Assuming field is unique
        result[result.length - 1] = result[result.length - 1].split(text).join(replacement.stringReplacement[text])
    }
    return result.toString();


}

const textAlignment = (text, lineWidth, type) => {
    const sizeOfText = text.length
    const spacing = lineWidth - sizeOfText;
    console.log(spacing)
    if (spacing > 0 && type.toLowerCase() === 'right') {
        const result = ' '.repeat(spacing) + text;
        console.log(result);
        return result;
    } else if (spacing > 0 && type.toLowerCase() === 'left') {
        const result = text + ' '.repeat(spacing);
        console.log(result);
        return result;

    } else if (spacing > 0 && type.toLowerCase() === 'center') {
        const centerSpacing = Math.floor(spacing / 2);
        const result = ' '.repeat(centerSpacing) + text + ' '.repeat(centerSpacing);
        console.log(result);
        return result;

    } else {
        console.log(text)
        return text;
    }

}



const formattedText = async(lineWidth, textAlign, textSpacing, boldWords, italicString, stringReplacement, randomText, text) => {
    // const textSplit = text.match(/.{1,80}(\s|$)/g)
    let splitText = text.split(' ');
    console.log(splitText)
    let countSentenceLength = 0
    const sentenceArray = [];
    let sentenceFormation = '';
    let countRandomString = 0;
    const randomStringArray = []
    for (let index = 0; index < splitText.length; index++) {
        const cleanString = splitText[index].replace(/[!"#$%&'()*+,-./:;<=>?@[\]^_`{|}~]/g, '')
            // .replace(/s{2,}/g, " ");
            // console.log(cleanString);
        const isRandomString = randomText.includes(cleanString);
        if (isRandomString) {
            countRandomString += 1;
        }
        // console.log(isRandomString)
        const splitWord = splitText[index].split(/([?,!,.,\n,''])/);
        // console.log(`Count random  ${countRandomString}`)

        // console.log(splitWord)
        //Check if word is a random word;
        // const isRandomWord = splitWord.map((item) => randomText.includes)
        let formatString = (splitWord.map((item) => boldString(item, boldWords, italicString, stringReplacement))).join('')
            // const sample = formatString.join('')
            // console.log(formatString, sentenceFormation)
        if (formatString.indexOf("\n") !== -1) {

            sentenceFormation += `${formatString.substring(0, formatString.indexOf("\n"))}`;
            // console.log(`the light ${sentenceFormation}`)
            countSentenceLength = 0;
            sentenceArray.push(textAlignment(sentenceFormation.trim(), lineWidth, textAlign));
            if (countRandomString > 0) {
                const freshSplit = splitText.slice(index + 1)
                const randomJokes = await fetchJokes();
                if (randomJokes.length > 0) {
                    randomJokes.push(formatString.substring(formatString.indexOf("\n") + 1))
                    let freshText = randomJokes.concat(freshSplit);
                    splitText = freshText;
                    index = -1;
                    console.log(`The old splitText`, splitText, index)
                }
                countRandomString = 0;

                sentenceFormation = '';
            } else {
                sentenceFormation = `${formatString.substring(formatString.indexOf("\n")+1)}`
                console.log(`The way ${sentenceFormation}`)
            }



        } else if (countSentenceLength < lineWidth && (countSentenceLength + formatString.length) <= lineWidth) {
            sentenceFormation += ` ${formatString}`

        } else {
            countSentenceLength = 0;
            // console.log(`Searching ${sentenceFormation}, ${formatString}`)
            sentenceArray.push(textAlignment(sentenceFormation.trim(), lineWidth, textAlign));
            sentenceFormation = formatString

        }
        countSentenceLength = sentenceFormation.length
    }
    console.log(sentenceArray.join('\n'));
    return sentenceArray;
    // return boldString(sentenceArray.toString(), ['Aliquam', 'Mauris'], ['elit'], [{ cursus: "CURSUS" }, { lacinia: 'malesuada nunc' }]);
}
const words = `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi sit amet lacus eu purus malesuada sodales. Nunc a risus nunc.\nPraesent eget volutpat eros. Fusce mollis gravida nunc, vitae accumsan ligula varius vitae. Duis in tellus non est pulvinar efficitur quis ac tortor. Aliquam dictum, magna quis venenatis pharetra, leo sapien mollis mauris, et vestibulum arcu est eget turpis. Etiam tortor erat, lacinia et faucibus vitae, maximus et elit.\nDonec nisl nisi, imperdiet vitae felis ut, maximus condimentum ante. Curabitur efficitur sem sed ligula eleifend varius. Mauris et risus quis libero mattis auctor id ut orci.\nAliquam cursus sapien et euismod vestibulum. In maximus dolor eu vulputate tempus. Aenean ultricies nisl id elit mattis, vitae finibus libero interdum. Vestibulum ornare quam nec ornare fermentum.`
    // console.log(words.match(/.{1,80}(\s|$)/g))
    // const textRegex = new RegExp(`.{1,40}(\s|$)`, 'g')
    // console.log(words.match(textRegex)

// console.log(words.split(' '));

const textWords = `This process was continued for several years for the deaf
child does not here in a month or even in two or three years the
numberless items and expressions using the simplest daily intercourse
little hearing child learns from these constant rotation and imitation the
conversation he hears in his home simulates is mine and suggest topics and
called forth the spontaneous expression of his own thoughts.`;
// console.log(words.split(' ').length);


const splitString = (str = '') => {
        // const search = str.replace(/\n/g, " ")
        const isNewLine = str.indexOf("\n")
        console.log(isNewLine)
            // const regex = new RegExp(String.raw `\S.{1,${size}}\S(?= |$)`, 'g')
            // const regex = new RegExp(String.raw `\S.{1,${size}}\S(?= |$)`, 'g')
            // return search.match(regex);

    }
    // console.log(splitString('Nunc a risus nunc.\n'))

// console.log(words.replace(/\n/g, " "))

const checkResult = formattedText(100, 'center', '', ['Aliquam', 'Mauris', 'Aliquam'], ['elit'], { cursus: "CURSUS", lacinia: 'malesuada nunc' }, ["tortor", "fames"], words)

console.log(checkResult)
    // const watch = 'Mauris'
    // console.log(['Aliquam', 'Mauris'].includes(watch));

// let paragraph = 'nunc Praesent';
// let sentences = paragraph.split(/([?,!,.,\n,' '])/);
// let languages = ['C', 'C++', 'Java', 'JavaScript'];
// let str = languages.toString()
// str = ' '.repeat(7) + str;
// console.log(str)
// languages.splice(1, 1, ['Python', 'Fresh', 'Great'].toString());
// console.log(languages)

// let sentence = paragraph.split(/[\\.!?]/)
// console.log(sentences);

// console.log(words.indexOf('tortor', 267))
// console.log(boldString('Aliquam', ['Aliquam', 'Mauris'], ['elit']clea