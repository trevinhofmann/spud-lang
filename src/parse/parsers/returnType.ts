import { TokenType } from '../../types/tokens';
import type { Type } from '../../types/types';
import type TokenStream from '../TokenStream';
import variableType from './variableType';

export default (tokenStream: TokenStream): Type => {
  tokenStream.readTokenTypes([
    TokenType.Tab,
    TokenType.Greater,
    TokenType.Space,
  ]);
  return tokenStream.read(variableType);
};
