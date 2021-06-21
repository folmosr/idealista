import { IWordResult } from './interfaces/IWordReslt';

function isWord(str: string): boolean {
  var alphaNumericFound = false;
  for (let i = 0; i < str.length; i++) {
    let code = str.charCodeAt(i);
    if (
      (code > 47 && code < 58) ||
      (code > 64 && code < 91) ||
      (code > 96 && code < 123)
    ) {
      alphaNumericFound = true;
      return alphaNumericFound;
    }
  }
  return alphaNumericFound;
}

export function wordCounter(text: string): IWordResult {
  var wordsArray = text.split(" ");
  var wordCount = 0;
  for (let i = 0; i < wordsArray.length; i++) {
    let word = wordsArray[i];
    if (word !== " " && isWord(word)) {
      wordCount++;
    }
  }
  return {
    words: wordsArray,
    count: wordCount,
  } as IWordResult;
}
