# Backend Interview Exercise

## Process

1. This repo is your own, you can use it to work and commit your solution here.
2. Solve the exercise within a time frame of 1 week. It normally takes around 3-4 hours to complete.
3. Once you are ready with your solution submit a Pull Request and we will review your task and leave comments.
4. We review your solution within 2 days, provide feedback for you and schedule a call to discuss as a next step.
5. Demo your solution to future colleagues (product managers and engineers) on the call.

## What we review

- **Solution:** structured problem solving and working solution :)
- **Architecture:** how clean is the separation of concerns, folder structuring and design patterns? Does the code specifically follow OOP paradigm, FP paradigm or an appropriate mixture of both? Is the code imperative or declarative?
- **Code Quality:** are namings across the code appropriate? Is the code reusable and readable? Are there any ESLint issues?
- **Testing:** how through are the tests?
- **Documentation:** are technical choices and trade-offs explained? What are the limitations of the system?

## The epic

Design a service that given a string with line breaks ("\n") and formatting parameters, returns a string formatted with basic markdown syntax.

Example input:

```
Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi sit amet lacus eu purus malesuada sodales. Nunc a risus nunc.\nPraesent eget volutpat eros. Fusce mollis gravida nunc, vitae accumsan ligula varius vitae. Duis in tellus non est pulvinar efficitur quis ac tortor. Aliquam dictum, magna quis venenatis pharetra, leo sapien mollis mauris, et vestibulum arcu est eget turpis. Etiam tortor erat, lacinia et faucibus vitae, maximus et elit.\nDonec nisl nisi, imperdiet vitae felis ut, maximus condimentum ante. Curabitur efficitur sem sed ligula eleifend varius. Mauris et risus quis libero mattis auctor id ut orci.\nAliquam cursus sapien et euismod vestibulum. In maximus dolor eu vulputate tempus. Aenean ultricies nisl id elit mattis, vitae finibus libero interdum. Vestibulum ornare quam nec ornare fermentum.
```

The service should be able to:

- Limit text to a specified line width.
- Align text to left, right and center within the specified line width.
- Set single or double line spacing.
- Given a list of words, turn them bold using markdown syntax. (ie. all **Aliquam** words in text should be made bold)
- Given a list of words, turn them italic using markdown syntax. (ie. all _elit_ words in text should be made italic)
- Given a list of words and their substitutions, replace all occurrences of the specified words with their substitutions. (ie. replace every Duis with DUIS and so on)
- Given a list of words, add a random Chuck Norris fact after the paragraph where such words are found. (possible source https://api.chucknorris.io/)

Further requirements would be added in the next sprint.

### A test case

Given the parameters:

```
- Line width: 80
- Text alignment: right
- Spacing: single
- Bold strings: "Aliquam", "Mauris"
- Italic strings: "elit"
- Replace strings: ("cursus", "CURSUS"), ("lacinia", "malesuada nunc")
- Chuck Norris food fact strings: "tortor", "fames"
```

And the input text:

```
Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi sit amet lacus eu purus malesuada sodales. Nunc a risus nunc.\nPraesent eget volutpat eros. Fusce mollis gravida nunc, vitae accumsan ligula varius vitae. Duis in tellus non est pulvinar efficitur quis ac tortor. Aliquam dictum, magna quis venenatis pharetra, leo sapien mollis mauris, et vestibulum arcu est eget turpis. Etiam tortor erat, lacinia et faucibus vitae, maximus et elit.\nDonec nisl nisi, imperdiet vitae felis ut, maximus condimentum ante. Curabitur efficitur sem sed ligula eleifend varius. Mauris et risus quis libero mattis auctor id ut orci.\nAliquam cursus sapien et euismod vestibulum. In maximus dolor eu vulputate tempus. Aenean ultricies nisl id elit mattis, vitae finibus libero interdum. Vestibulum ornare quam nec ornare fermentum.
```

One possible output could be:

```
 Lorem ipsum dolor sit amet, consectetur adipiscing _elit_. Morbi sit amet lacus\n                                  eu purus malesuada sodales. Nunc a risus nunc.\n   Praesent eget volutpat eros. Fusce mollis gravida nunc, vitae accumsan ligula\n         varius vitae. Duis in tellus non est pulvinar efficitur quis ac tortor.\n    **Aliquam** dictum, magna quis venenatis pharetra, leo sapien mollis mauris,\n        et vestibulum arcu est eget turpis. Etiam tortor erat, malesuada nunc et\n                                              faucibus vitae, maximus et _elit_.\n          When Chuck Norris is in the mood for seafood... he enjoys fresh caught\n                                                                     Kracken!!!!\n  Donec nisl nisi, imperdiet vitae felis ut, maximus condimentum ante. Curabitur\n       efficitur sem sed ligula eleifend varius. **Mauris** et risus quis libero\n                                                       mattis auctor id ut orci.\n  **Aliquam** CURSUS sapien et euismod vestibulum. In maximus dolor eu vulputate\n  tempus. Aenean ultricies nisl id _elit_ mattis, vitae finibus libero interdum.\n                                    Vestibulum ornare quam nec ornare fermentum.
```

Or what's the same but replacing the "\n" with actual line breaks for better readability in this Readme:

```
 Lorem ipsum dolor sit amet, consectetur adipiscing _elit_. Morbi sit amet lacus
                                  eu purus malesuada sodales. Nunc a risus nunc.
   Praesent eget volutpat eros. Fusce mollis gravida nunc, vitae accumsan ligula
         varius vitae. Duis in tellus non est pulvinar efficitur quis ac tortor.
    **Aliquam** dictum, magna quis venenatis pharetra, leo sapien mollis mauris,
        et vestibulum arcu est eget turpis. Etiam tortor erat, malesuada nunc et
                                              faucibus vitae, maximus et _elit_.
          When Chuck Norris is in the mood for seafood... he enjoys fresh caught
                                                                     Kracken!!!!
  Donec nisl nisi, imperdiet vitae felis ut, maximus condimentum ante. Curabitur
       efficitur sem sed ligula eleifend varius. **Mauris** et risus quis libero
                                                       mattis auctor id ut orci.
  **Aliquam** CURSUS sapien et euismod vestibulum. In maximus dolor eu vulputate
  tempus. Aenean ultricies nisl id _elit_ mattis, vitae finibus libero interdum.
                                    Vestibulum ornare quam nec ornare fermentum.
```
