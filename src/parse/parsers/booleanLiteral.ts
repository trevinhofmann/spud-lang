import type TokenStream from '../TokenStream';
import { TokenType } from '../../types/tokens';
import type { BooleanLiteral } from '../../types/ast';

export default (tokenStream: TokenStream): BooleanLiteral => {
  const token = tokenStream.readTokenType(TokenType.BooleanLiteral);
  let value: boolean;
  switch (token.characters) {
    case 'true':
      value = true;
      break;
    case 'false':
      value = false;
      break;
    default:
      throw tokenStream.error('Unable to parse boolean literal', token);
  }
  return {
    type: 'BooleanLiteral',
    value,
  };
};
