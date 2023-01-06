import { TokenType } from '../../types/tokens';
import type { WhileStatement, Statement } from '../../types/ast';
import type TokenStream from '../TokenStream';
import expression from './expression';
import statement from './statement';

export default (tokenStream: TokenStream): WhileStatement => {
  tokenStream.readTokenTypes([TokenType.Tab, TokenType.While, TokenType.Space]);
  const test = tokenStream.read(expression);
  tokenStream.readTokenType(TokenType.Newline);

  const body: Statement[] = [];
  while (tokenStream.checkTokenTypes([TokenType.Tab, TokenType.Tab])) {
    body.push(tokenStream.read(statement));
  }
  return {
    type: 'WhileStatement',
    test,
    body,
  };
};
