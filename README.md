# TEXT FORMATTER

## DESCRIPTION

Text formatter is a service designed to format text including those with line breaks ("\n")  based on some formatting parameters such as line width  (limits text to a specified width), textAlign(aligns a text left, right or center), boldStrings(list of words to turn bold), italicsStrings(list of words to turn italics) etc.

## REQUIREMENTS

* Node Installation: Visit [official Node.js website](https://nodejs.org/) and download the installer.
* Typescript installation: Visit  [Official Typescript website](https://www.typescriptlang.org/download)  to install typescript.
* Clone the project [Text Formatter](https://github.com/entyre-hire/backend-exercise-nnamdi16.git).
* cd into the project folder
* Run yarn install to install dependencies
* To run the project or extend text formatter, see sample code below:

```apache
const text = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi sit amet lacus eu purus malesuada sodales. Nunc a risus nunc.\nPraesent eget volutpat eros. Fusce mollis gravida nunc, vitae accumsan ligula varius vitae. Duis in tellus non est pulvinar efficitur quis ac tortor. Aliquam dictum, magna quis venenatis pharetra, leo sapien mollis mauris, et vestibulum arcu est eget turpis. Etiam tortor erat, lacinia et faucibus vitae, maximus et elit.\nDonec nisl nisi, imperdiet vitae felis ut, maximus condimentum ante. Curabitur efficitur sem sed ligula eleifend varius. Mauris et risus quis libero mattis auctor id ut orci.\nAliquam cursus sapien et euismod vestibulum. In maximus dolor eu vulputate tempus. Aenean ultricies nisl id elit mattis, vitae finibus libero interdum. Vestibulum ornare quam nec ornare fermentum.';
const lineWidth = 80
const randomJokesIdentifier = ["tortor", "fames"];
const italicsString = ["elit"]
const boldString = ["Aliquam", "Mauris"]
const replaceString = {
  cursus: 'CURSUS', 
  lacinia: 'malesuada nunc'
}
```

```bash
    const stringFormat = new FormatTextBuilder()
      .setLineWidth(lineWidth)
      .setText(text)
      .setTextAlignment(TextAlign.LEFT)
      .setLineSpacing(LineSpacing.DOUBLE)
      .setRandomJokeIdentifier(randomJokesIdentifier)
      .setItalicsStrings(italicsStrings)
      .setBoldStrings(boldStrings)
      .setReplaceStrings(replaceString).build();


stringFormat.formatText().then(res => console.log(res))
```

* Run npm run start on your CLI
* To run the test script , run npm run test.

## TECHNICAL CHOICES AND TRADE-OFFS

Design the text formatter required adopting a hybrid paradigm which includes Object Oriented Programming (OOP)  and Functional programming (FP) . Also Typescript was adopted relying on its advanced statical type system to improve the code readablility and debugging as well as it supports OOP. Design patterns such as Builder design pattern, Module design pattern and the Chain of responsibility design pattern was adopted.

## LIMITATIONS

A few branches are untested due to assigning a default handler in FormatTextDetails class.

![Branch Coverage](badge-branches.svg)![function-coverage](badge-functions.svg)![Lines coverage](badge-lines.svg)![Statement coverage](badge-statements.svg)
