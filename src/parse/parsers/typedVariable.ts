import type TokenStream from '../TokenStream';
import { TokenType } from '../../types/tokens';
import type { TypedVariable } from '../../types/ast';
import variableType from './variableType';

export default (tokenStream: TokenStream): TypedVariable => {
  const type = tokenStream.read(variableType);
  tokenStream.readTokenType(TokenType.Space);
  const token = tokenStream.readTokenType(TokenType.UserDefinedWord);
  return {
    type: 'TypedVariable',
    name: token.characters,
    variableType: type,
  };
};
