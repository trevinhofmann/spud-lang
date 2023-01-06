import type TokenStream from '../TokenStream';
import { TokenType } from '../../types/tokens';
import type { NumericLiteral } from '../../types/ast';

export default (tokenStream: TokenStream): NumericLiteral => {
  const integer = tokenStream.readTokenType(TokenType.IntegerLiteral);
  return {
    type: 'NumericLiteral',
    value: integer.characters,
  };
};
