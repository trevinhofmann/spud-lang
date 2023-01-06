import type TokenStream from '../TokenStream';
import { TokenType } from '../../types/tokens';
import type { Expression, FunctionCall } from '../../types/ast';
import expression from './expression';

export default (tokenStream: TokenStream): FunctionCall => {
  const nameToken = tokenStream.readTokenType(TokenType.UserDefinedWord);
  tokenStream.readTokenType(TokenType.ParenthesisOpen);
  const args: Expression[] = [];
  if (tokenStream.has(expression)) {
    args.push(tokenStream.read(expression));
  }
  while (tokenStream.checkTokenType(TokenType.Comma)) {
    tokenStream.readTokenTypes([TokenType.Comma, TokenType.Space]);
    args.push(tokenStream.read(expression));
  }
  tokenStream.readTokenType(TokenType.ParenthesisClose);
  return {
    type: 'FunctionCall',
    functionName: nameToken.characters,
    arguments: args,
  };
};
