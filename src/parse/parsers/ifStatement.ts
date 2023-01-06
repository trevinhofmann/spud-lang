import { TokenType } from '../../types/tokens';
import type { IfStatement, Statement } from '../../types/ast';
import type TokenStream from '../TokenStream';
import expression from './expression';
import statement from './statement';

export default (tokenStream: TokenStream): IfStatement => {
  tokenStream.readTokenTypes([TokenType.Tab, TokenType.If, TokenType.Space]);
  const test = tokenStream.read(expression);
  tokenStream.readTokenType(TokenType.Newline);

  const consequent: Statement[] = [];
  while (tokenStream.checkTokenTypes([TokenType.Tab, TokenType.Tab])) {
    consequent.push(tokenStream.read(statement));
  }
  return {
    type: 'IfStatement',
    test,
    consequent,
  };
};
