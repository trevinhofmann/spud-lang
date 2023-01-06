import type TokenStream from '../TokenStream';
import { TokenType } from '../../types/tokens';
import type { StringLiteral } from '../../types/ast';

export default (tokenStream: TokenStream): StringLiteral => {
  const string = tokenStream.readTokenType(TokenType.String);
  return {
    type: 'StringLiteral',
    value: string.characters,
  };
};
