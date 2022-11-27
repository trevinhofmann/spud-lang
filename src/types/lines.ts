import type { Token } from './tokens';

export type Line = {
  lineNumber: number;
  characters: string;
  tokens: Token[];
};
