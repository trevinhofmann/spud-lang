import Logger from 'eleventh';
import { TokenType } from '../types/tokens';
import type { Token, PartialToken } from '../types/tokens';
import symbols from '../utils/symbols';
import reservedWords from '../utils/reservedWords';

const commentRegex = /^\/\/.*/u;
const integerRegex = /^[0-9]+/u;
const stringRegex = /^'[^']*'/u;
const wordRegex = /^[_a-zA-Z][_a-zA-Z0-9]*/u;

type Scanner = (remainingText: string) => PartialToken | undefined;

const commentScanner: Scanner = (remainingText) => {
  const matches = commentRegex.exec(remainingText);
  if (matches !== null) {
    return {
      type: TokenType.Comment,
      characters: matches[0],
    };
  }
};

const symbolScanner: Scanner = (remainingText) => {
  for (const { characters, type } of symbols) {
    if (remainingText.startsWith(characters)) {
      return {
        type,
        characters,
      };
    }
  }
};

const integerScanner: Scanner = (remainingText) => {
  const matches = integerRegex.exec(remainingText);
  if (matches !== null) {
    return {
      type: TokenType.IntegerLiteral,
      characters: matches[0],
    };
  }
};

const stringScanner: Scanner = (remainingText) => {
  const matches = stringRegex.exec(remainingText);
  if (matches !== null) {
    return {
      type: TokenType.StringLiteral,
      characters: matches[0],
    };
  }
};

const wordScanner: Scanner = (remainingText) => {
  const matches = wordRegex.exec(remainingText);
  if (matches !== null) {
    const characters = matches[0];
    const reservedWord = reservedWords
      .find(word => word.characters === characters);
    if (reservedWord !== undefined) {
      return {
        type: reservedWord.type,
        characters,
      };
    }
    return {
      type: TokenType.UserDefinedWord,
      characters,
    };
  }
};

const scanners = [
  commentScanner,
  symbolScanner,
  integerScanner,
  stringScanner,
  wordScanner,
];

export default (characters: string): Token[] => {
  let lineNumber = 1;
  let i = 0;
  let remainingText = characters;
  const tokens: Token[] = [];
  while (remainingText.length > 0) {
    const partialToken = scanners.reduce<PartialToken | undefined>(
      (token, scanner) => token ?? scanner(remainingText),
      undefined,
    );
    if (partialToken === undefined) {
      throw new Error(`Unable to scan token at ${remainingText}`);
    }
    Logger.info('Scanned token', { tokenType: partialToken.type, characters: partialToken.characters });
    tokens.push({
      ...partialToken,
      line: lineNumber,
      colStart: i,
      colEnd: i + partialToken.characters.length,
    });
    if (partialToken.type === TokenType.Newline) {
      i = 0;
      lineNumber += 1;
    } else {
      i += partialToken.characters.length;
    }
    remainingText = remainingText.slice(partialToken.characters.length);
  }
  return tokens;
};
