import { TokenType } from '../../types/tokens';
import type { ImportDeclaration } from '../../types/ast';
import type TokenStream from '../TokenStream';

export default (tokenStream: TokenStream): ImportDeclaration => {
  tokenStream.readTokenType(TokenType.Import);
  tokenStream.readTokenType(TokenType.Space);
  const name = tokenStream.readTokenType(TokenType.UserDefinedWord).characters;
  tokenStream.readTokenType(TokenType.Space);
  tokenStream.readTokenType(TokenType.From);
  tokenStream.readTokenType(TokenType.Space);
  const source = tokenStream.readTokenType(TokenType.StringLiteral).characters;
  tokenStream.readAllOfTokenType(TokenType.Newline);
  return {
    type: 'ImportDeclaration',
    name,
    source,
  };
};
