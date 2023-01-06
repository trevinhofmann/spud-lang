import { TokenType } from '../../types/tokens';
import type { TypedVariable } from '../../types/ast';
import type TokenStream from '../TokenStream';
import typedVariable from './typedVariable';

export default (tokenStream: TokenStream): TypedVariable => {
  tokenStream.readTokenTypes([TokenType.Tab, TokenType.Plus, TokenType.Space]);
  const variable = tokenStream.read(typedVariable);
  tokenStream.readTokenType(TokenType.Newline);
  return variable;
};
