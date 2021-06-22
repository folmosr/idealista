import { IWordResult } from './interfaces/IWordReslt';

function isWord(str: string): boolean {
  let alphaNumericFound = false;
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
  const wordsArray = text.split(" ");
  let realWords: string[] = [];
  let wordCount = 0;
  for (let i = 0; i < wordsArray.length; i++) {
    let word = wordsArray[i];
    if (word !== " " && isWord(word)) {
      wordCount++;
      realWords = [...realWords, word];
    }
  }
  return {
    words: realWords,
    count: wordCount,
  } as IWordResult;
}
