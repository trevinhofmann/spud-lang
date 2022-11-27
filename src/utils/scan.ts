import Logger from 'eleventh';
import { TokenType } from '../types/tokens';
import type { Line } from '../types/lines';
import type { Token, PartialToken } from '../types/tokens';
import symbols from './symbols';
import reservedWords from './reservedWords';

const commentRegex = /^\/\/.*/u;
const integerRegex = /^[0-9]+/u;
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
      type: TokenType.Integer,
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
  wordScanner,
];

const scanLine = (characters: string, lineNumber: number): Line => {
  let i = 0;
  let remainingText = characters;
  const tokens: Token[] = [];
  const line: Line = {
    lineNumber,
    characters,
    tokens,
  };
  while (i < characters.length) {
    const partialToken = scanners.reduce<PartialToken | undefined>(
      (token, scanner) => token ?? scanner(remainingText),
      undefined,
    );
    if (partialToken === undefined) {
      throw new Error('Unable to scan token');
    }
    Logger.info('Scanned token', { tokenType: partialToken.type, characters: partialToken.characters });
    tokens.push({
      ...partialToken,
      line,
      colStart: i,
      colEnd: i + partialToken.characters.length,
    });
    i += partialToken.characters.length;
    remainingText = remainingText.slice(partialToken.characters.length);
  }
  return line;
};

export const scanLines = (file: string): Line[] => (
  file
    .split('\n')
    .map((characters, i) => scanLine(characters, i + 1))
);
