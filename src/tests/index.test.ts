import { IEditString, IFormatText } from './../randomJokes.response';
import { fetchRandomJoke, boldString, textAlignment, checkRandomJokesIndentifier, formattedText, BASE_URL } from '../index';
import axios from '../__mocks__/axios'
jest.mock("axios")
const mockedAxios = axios as jest.Mocked<typeof axios>;

const text = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi sit amet lacus eu purus malesuada tortor sodales. Nunc a risus nunc.\nPraesent eget volutpat fames eros.';
const data = {
  "icon_url" : "https://assets.chucknorris.host/img/avatar/chuck-norris.png",
  "id" : "lGgiaMRxS6OLN2ThemQxWA",
  "url" : "",
  "value" : "Mr johnson is the only one who can overtake Chuck Norris in a moped race. Chuck Norris then dropkicked him continusly and killed him."
 }

describe('checRandomJokesIdentifier', () => {

  it('should check whether an input string is an identifier for adding random jokes to the text', () => {
    const sampleWord = 'flabby';
    const randomJokeIdentifierList = ['flabby', 'jammy']
    const isRandomJokeIdentifier = checkRandomJokesIndentifier(sampleWord, randomJokeIdentifierList);
    expect(isRandomJokeIdentifier).toBeTruthy()
    
    
  });

  it('should check whether an input string with punctuation marks is an identifier for adding random jokes to the text', () => {
    const sampleWord = '-flabby-';
    const randomJokeIdentifierList = ['flabby', 'jammy']
    const isRandomJokeIdentifier = checkRandomJokesIndentifier(sampleWord, randomJokeIdentifierList);
    expect(isRandomJokeIdentifier).toBeTruthy();
    
  });
  
});


describe('Fetch Random Jokes', () => {
  describe('When the API call to fetch random joke is successful', () => {
    it('should return a random Chuck Noris Joke', async () => {
      const response = ["Mr", "johnson", "is", "the", "only", "one", "who", "can", "overtake", "Chuck", "Norris", "in", "a", "moped", "race.", "Chuck", "Norris", "then", "dropkicked", "him", "continusly", "and", "killed", "him."]
      mockedAxios.get.mockImplementationOnce(() => Promise.resolve({
        data
      }))
      const randomJoke = await fetchRandomJoke().then(res => res);
      expect(axios.get).toHaveBeenCalledTimes(1)
      expect(axios.get).toHaveBeenCalledWith(BASE_URL);
     
      expect(randomJoke).toEqual(expect.arrayContaining(response))
    });
  });
  
  describe('When the API call to fetch random Joke fails ', () => {
    it('should return empty joke list', async () => {
      const message = "Network Error";
      const response: any[] = []
      mockedAxios.get.mockRejectedValueOnce(new Error(message))
      const randomJoke = await fetchRandomJoke().then(res => res);
      expect(axios.get).toHaveBeenCalledTimes(2)
      expect(axios.get).toHaveBeenCalledWith(BASE_URL);
     
      expect(randomJoke).toEqual(response)
    });
  });
  
});

describe('Format Sting Weight', () => {

 describe('Bold', () => {
  it('should make a string bold if it belongs to the bold string identifier', () => {
    const sampleWord = 'flabby';
    const boldStringIdentifier = ['flabby', 'jammy'];
    const italicStringIdentifier = ['jean'];
    const replaceWordsIndentifier = { cursus: "CURSUS", lacinia: 'malesuada nunc' }
    const editParameters: IEditString = {
      text: sampleWord,
      bold: boldStringIdentifier,
      italics: italicStringIdentifier,
      replaceString: replaceWordsIndentifier
    }
    const formatStringWeight = boldString(editParameters);
    const result = `**${sampleWord}**`
    expect(formatStringWeight).toMatch(result)
    
  });

 });
  
 describe('String not matching an bold, italic or replacing identifier', () => {
  it('should make a string  neither bold, italics or replace string ', () => {
    const sampleWord = 'flabby';
    const boldStringIdentifier = ['jammy'];
    const italicStringIdentifier = ['jean'];
    const replaceWordsIndentifier = { cursus: "CURSUS", lacinia: 'malesuada nunc' }
    const editParameters: IEditString = {
      text: sampleWord,
      bold: boldStringIdentifier,
      italics: italicStringIdentifier,
      replaceString: replaceWordsIndentifier
    }
    const formatStringWeight = boldString(editParameters);
    expect(formatStringWeight).toBe(sampleWord)
    
    
  });
  
 })
  
 describe('Italics', () => {
  it('should italicise a string if it belongs to the italic string identifier', () => {
    const sampleWord = 'jean';
    const boldStringIdentifier = ['flabby', 'jammy'];
    const italicStringIdentifier = ['jean'];
    const replaceWordsIndentifier = { cursus: "CURSUS", lacinia: 'malesuada nunc' }
    const editParameters: IEditString = {
      text: sampleWord,
      bold: boldStringIdentifier,
      italics: italicStringIdentifier,
      replaceString: replaceWordsIndentifier
    }
    const formatStringWeight = boldString(editParameters);
    const result = `_${sampleWord}_`
    expect(formatStringWeight).toMatch(result)
  });


 });
  
  
  
 describe('Replace String', () => {
  it('should replace a string with another string if it belongs to the replace string identifier', () => {
    const sampleWord = 'cursus';
    const boldStringIdentifier = ['flabby', 'jammy'];
    const italicStringIdentifier = ['jean'];
    const replaceWordsIndentifier = { cursus: "CURSUS", lacinia: 'malesuada nunc' }
    const editParameters: IEditString = {
      text: sampleWord,
      bold: boldStringIdentifier,
      italics: italicStringIdentifier,
      replaceString: replaceWordsIndentifier
    }
    const formatStringWeight = boldString(editParameters);
    const result = `CURSUS`
    expect(formatStringWeight).toMatch(result)
  });
 });

})

describe('String alignment', () => {

  describe('Align string Right', () => {
   it('should align a string to the right', () => {
     const sampleWord = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit';
     const formatStringAlignment = textAlignment(sampleWord, 60, 'RIGHT' );
     const result = `     Lorem ipsum dolor sit amet, consectetur adipiscing elit`
     expect(formatStringAlignment).toMatch(result)
     
   });
 
  });
   
  describe('Align string Left', () => {
    it('should align a string to the left', () => {
      const sampleWord = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit';
      const formatStringAlignment = textAlignment(sampleWord, 60, 'LEFT' );
      const result = `Lorem ipsum dolor sit amet, consectetur adipiscing elit     `
      expect(formatStringAlignment).toMatch(result)
      
    });
  
   });
   
   describe('Align string Center', () => {
    it('should align a string to the center', () => {
      const sampleWord = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit';
      const formatStringAlignment = textAlignment(sampleWord, 60, 'CENTER' );
      const result = `  Lorem ipsum dolor sit amet, consectetur adipiscing elit  `
      expect(formatStringAlignment).toMatch(result)
      
    });
  
   });
  
   describe('String without alignment specified', () => {
    it('should return a string with aligning it when the alignment type is not specified', () => {
      const sampleWord = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit';
      const formatStringAlignment = textAlignment(sampleWord, 60, '' );
      const result = `Lorem ipsum dolor sit amet, consectetur adipiscing elit`
      expect(formatStringAlignment).toMatch(result)
      
    });
  
   });
   
   
})
 
describe('Format String', () => {
  beforeEach(() => {
    mockedAxios.get.mockImplementationOnce(() => Promise.resolve({
      data
    }))
  })
  const lineWidth = 50
  const textAlign = 'left';
  const textSpacing = { single: 'single', double: 'double' }
  const randomJokesIdentifier=["tortor", "fames"]
  const bold = ['Aliquam', 'Mauris', 'Aliquam']
  const italics = ['elit']
  const replaceString = { cursus: "CURSUS", lacinia: 'malesuada nunc' }
  


  describe('Format a string based on parmeters specified such as line width ', () => {
    it('should align a string with single spacing', async () => {
      const formatTextParameter: IFormatText = {
        lineWidth,
        textAlign,
        textSpacing: textSpacing.single,
        randomJokesIdentifier,
        text,
        bold,
        italics,
        replaceString
      }
      const formatString = await formattedText(formatTextParameter);
     const result = `Lorem ipsum dolor sit amet, consectetur adipiscing\n_elit_. Morbi sit amet lacus eu purus malesuada   \ntortor sodales. Nunc a risusnunc.                 \nMr johnson is the only one who can overtake Chuck \nNorris in a moped race. Chuck Norris then         \ndropkicked him continusly and killed him. Praesent`
     expect(formatString).toBe(result)
     
   });
    
    it('should align a string with double spacing', async () => {
      const formatTextParameter: IFormatText = {
        lineWidth,
        textAlign,
        textSpacing: textSpacing.double,
        randomJokesIdentifier,
        text,
        bold,
        italics,
        replaceString
      }
    const formatString = await formattedText(formatTextParameter);
   const result = `Lorem ipsum dolor sit amet, consectetur adipiscing\n\n_elit_. Morbi sit amet lacus eu purus malesuada   \n\ntortor sodales. Nunc a risusnunc.                 \n\nMr johnson is the only one who can overtake Chuck \n\nNorris in a moped race. Chuck Norris then         \n\ndropkicked him continusly and killed him. Praesent`
   expect(formatString).toBe(result)
   
 });
 
  });
   
  
   
   
 })