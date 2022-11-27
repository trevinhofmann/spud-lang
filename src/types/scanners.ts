import type { TokenType } from './tokens';

export type ScanResult = {
  start: number;
  end: number;
  type: TokenType;
};

export type TokenScanner = (characters: string) => ScanResult | undefined;
