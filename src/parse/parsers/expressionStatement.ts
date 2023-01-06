import { TokenType } from '../../types/tokens';
import type { ExpressionStatement } from '../../types/ast';
import type TokenStream from '../TokenStream';
import expression from './expression';

export default (tokenStream: TokenStream): ExpressionStatement => {
  tokenStream.readTokenType(TokenType.Tab);
  const child = tokenStream.read(expression);
  tokenStream.readTokenType(TokenType.Newline);
  return {
    type: 'ExpressionStatement',
    expression: child,
  };
};
