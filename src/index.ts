
// import { FormatTextBuilder } from "./model/formatTextBuilder";
// import { LineSpacing, TextAlign } from "./model/formatTextDetails.dto";





const text = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi sit amet lacus eu purus malesuada sodales. Nunc a risus nunc.\nPraesent eget volutpat eros. Fusce mollis gravida nunc, vitae accumsan ligula varius vitae. Duis in tellus non est pulvinar efficitur quis ac tortor. Aliquam dictum, magna quis venenatis pharetra, leo sapien mollis mauris, et vestibulum arcu est eget turpis. Etiam tortor erat, lacinia et faucibus vitae, maximus et elit.\nDonec nisl nisi, imperdiet vitae felis ut, maximus condimentum ante. Curabitur efficitur sem sed ligula eleifend varius. Mauris et risus quis libero mattis auctor id ut orci.\nAliquam cursus sapien et euismod vestibulum. In maximus dolor eu vulputate tempus. Aenean ultricies nisl id elit mattis, vitae finibus libero interdum. Vestibulum ornare quam nec ornare fermentum.';
const lineWidth = 50
const randomJokesIdentifier = ["tortor", "fames"];
const italicsStrings = ["elit"]
const boldStrings = ["Aliquam", "Mauris"]
const replaceString = {
  cursus: 'CURSUS', 
  lacinia: 'malesuada nunc'
}



// const stringFormat = new FormatTextBuilder()
//       .setLineWidth(lineWidth)
//       .setText(text)
//       .setTextAlignment(TextAlign.RIGHT)
//       .setLineSpacing(LineSpacing.DOUBLE)
//       .setRandomJokeIdentifier(randomJokesIdentifier)
//       .setItalicsStrings(italicsStrings)
//       .setBoldStrings(boldStrings)
//       .setReplaceStrings(replaceString).build();


// stringFormat.formatText().then(res => console.log(res))
