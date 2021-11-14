




// export const formattedText = async (formatTextParameter: IFormatText) => {
//     //Todo: Test when this parameters are not provided. Implement negative testing
//     const {lineWidth, textAlign = TextAlign.LEFT, textSpacing ='single', randomJokesIdentifier, text, bold, italics, replaceString  } = formatTextParameter;
//     //Todo: Split the sentence to an array of words
//     let splitText = text.split(' ');

//     //Todo: Define countSentenceLength that tracks line width 
//     let countSentenceLength = 0

//     //Todo: Define Sentence array that temporarily stores formatted sentences.
//     const sentenceArray = [];

//     //Todo: Define Sentence Formation that combines formatted sentences that belongs to a particular line within the line width limit
//     let sentenceFormation = '';

//     //Todo Defines countRandomString that keeps track of selected words for adding random Chuck norris joke  after the paragraph of such selected words
//     let countRandomString = 0;

//     //Todo: Loop through the splitted sentences to format them based on certain criteria
//     for (let index = 0; index < splitText.length; index++) {

//         const isRandomJokeIdentifier = checkRandomJokesIndentifier(splitText[index], randomJokesIdentifier)

//         //Todo: If the string exist increment the value of countRandomString
//         if (isRandomJokeIdentifier) {
//             countRandomString += 1;
//         }
//         //Todo:Split text to dissociate them from punctuations and so that can be formatted as based on the criteria set
//         const splitWord = splitText[index].split(/([?,!,.,\n,''])/);
        
//         const formatString = (splitWord.map((item: string) => boldString({text:item, bold, italics, replaceString}))).join('')

//         //Todo: Check if a new line character is attached to a formatted string
//         if (formatString.indexOf("\n") > -1) {
//             //Todo: Seperate the formatString  from the new line character and add it to the already existing formatted text
//             sentenceFormation += `${formatString.substring(0, formatString.indexOf("\n"))}`;

//             //Todo: Add the aligned text to a list of formatted text.
//             sentenceArray.push(textAlignment(sentenceFormation.trim(), lineWidth, textAlign));

//             //Todo: Set the line width tracker to zero.
//             countSentenceLength = 0;

//             //Todo: Check if strings that notifies when to add random sentences are identified.
//             if (countRandomString > 0) {
//                 //Todo: Remove already formatted string from the array
//                 const unformattedStrings = splitText.slice(index + 1)

//                 //Todo: Fetch the random joke
//                 const randomJoke: string[] = await fetchRandomJoke();
//                 if (randomJoke.length > 0) {
//                     //Todo: Push text after the new line to the random jokes array.
//                     randomJoke.push(formatString.substring(formatString.indexOf("\n") + 1))

//                     //Todo:Join the new array from splitText to the random jokes array and assign it to splitText 
//                     splitText = randomJoke.concat(unformattedStrings);

//                     //Todo: Set the loop index to -1 so as to start looping the new array 
//                     index = -1;
//                 }

//                 //Todo: set the tracker that counts where to add the random string to zero.
//                 countRandomString = 0;

//                 //Todo: Reset the sentence formation to an empty string 
//                 sentenceFormation = '';
//             } else {
//                 //Todo: If the random string tracker is not greater than zero, add the next string to the after the new line to the sentence.
//                 sentenceFormation = `${formatString.substring(formatString.indexOf("\n") + 1)}`
//             }


//             //Todo: If the sentence length is less than the set line width and the adding it with the newly formated string is still less than the line width, add the formatted string to the formed sentence.

//         } else if (countSentenceLength < lineWidth && (countSentenceLength + formatString.length) <= lineWidth) {
//             sentenceFormation += ` ${formatString}`

//         } else {
//             //Todo: Trim the formed sentence, set its alignment and push it to the already formatted sentence array
//             sentenceArray.push(textAlignment(sentenceFormation.trim(), lineWidth, textAlign));
//             //Todo: Create a new sentence formation by assigning the most recent string to sentenceFormation as the first element
//             sentenceFormation = formatString

//             //TOdo: Reset countSentenceLength
//             countSentenceLength = 0;

//         }
//         //Todo: Update the sentenceLength at the end of each loop.
//         countSentenceLength = sentenceFormation.length
//     }
//     //Todo: Return the entire formatted sentence.
  
//     return (textSpacing.toLocaleLowerCase() === 'double') ? sentenceArray.join('\n\n') : sentenceArray.join('\n')
   



//     // formattedText(100, 'left', 'double', ['Aliquam', 'Mauris', 'Aliquam'], ['elit'], { cursus: "CURSUS", lacinia: 'malesuada nunc' }, ["tortor", "fames"], words).then((res) => console.log(res))
// }



const text = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi sit amet lacus eu purus malesuada sodales. Nunc a risus nunc.\nPraesent eget volutpat eros. Fusce mollis gravida nunc, vitae accumsan ligula varius vitae. Duis in tellus non est pulvinar efficitur quis ac tortor. Aliquam dictum, magna quis venenatis pharetra, leo sapien mollis mauris, et vestibulum arcu est eget turpis. Etiam tortor erat, lacinia et faucibus vitae, maximus et elit.\nDonec nisl nisi, imperdiet vitae felis ut, maximus condimentum ante. Curabitur efficitur sem sed ligula eleifend varius. Mauris et risus quis libero mattis auctor id ut orci.\nAliquam cursus sapien et euismod vestibulum. In maximus dolor eu vulputate tempus. Aenean ultricies nisl id elit mattis, vitae finibus libero interdum. Vestibulum ornare quam nec ornare fermentum.';
const lineWidth = 80
const textAlign = 'center'
const textSpacing = 'double'
const randomJokesIdentifier = ["tortor", "fames"];
const italics = ["elit"]
const bold = ["Aliquam", "Mauris"]
const replaceString = {
  cursus: 'CURSUS', 
  lacinia: 'malesuada nunc'
}
// console.log(textFormatter(formatStringNewLine, { text, lineWidth, textAlign, textSpacing, randomJokesIdentifier, replaceString, bold, italics }).then(res => console.log(res)));

// console.log(formattedText({ text, lineWidth, textAlign, textSpacing, randomJokesIdentifier, replaceString, bold, italics }).then(res => {
//     console.log(res)
// }))

// const stringFormat = new TextFormatDetailsBuilder()
//     .setLineWidth(lineWidth)
//     .setText(text)
//     .setAlignText(textAlign)
//     .setTextSpacing(textSpacing)
//     .setRandomJokeIdentifier(randomJokesIdentifier)
//     .setItalics(italics)
//     .setBold(bold)
//     .setReplaceStrings(replaceString).build();
//     stringFormat.formatText().then(res => console.log(res))