import { TokenType } from '../../types/tokens';
import type { ReturnStatement } from '../../types/ast';
import type TokenStream from '../TokenStream';
import expression from './expression';

export default (tokenStream: TokenStream): ReturnStatement => {
  tokenStream.readTokenTypes([
    TokenType.Tab,
    TokenType.Return,
    TokenType.Space,
  ]);
  const child = tokenStream.read(expression);
  tokenStream.readTokenType(TokenType.Newline);
  return {
    type: 'ReturnStatement',
    child,
  };
};
