import { TokenType } from '../../types/tokens';
import { Type } from '../../types/types';
import type { FunctionDeclaration, Statement, TypedVariable } from '../../types/ast';
import type TokenStream from '../TokenStream';
import parameter from './parameter';
import statement from './statement';
import returnType from './returnType';

export default (tokenStream: TokenStream): FunctionDeclaration => {
  tokenStream.readTokenType(TokenType.Function);
  tokenStream.readTokenType(TokenType.Space);
  const nameToken = tokenStream.readTokenType(TokenType.UserDefinedWord);
  const name = nameToken.characters;
  tokenStream.readTokenType(TokenType.Newline);

  // Parse the function parameters
  const parameters: TypedVariable[] = [];
  while (tokenStream.checkTokenTypes([TokenType.Tab, TokenType.Plus])) {
    parameters.push(tokenStream.read(parameter));
  }

  // Parse the function return type
  let type: Type = Type.Undefined;
  if (tokenStream.checkTokenTypes([TokenType.Tab, TokenType.Greater])) {
    type = tokenStream.read(returnType);
  }

  tokenStream.readAllOfTokenType(TokenType.Newline);

  // Parse the function body
  const body: Statement[] = [];
  while (tokenStream.checkTokenType(TokenType.Tab)) {
    body.push(tokenStream.read(statement));
  }

  // Return the parsed function declaration
  return {
    type: 'FunctionDeclaration',
    name,
    parameters,
    returnType: type,
    body,
  };
};
