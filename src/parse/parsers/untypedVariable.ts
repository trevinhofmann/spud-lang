import type TokenStream from '../TokenStream';
import { TokenType } from '../../types/tokens';
import type { UntypedVariable } from '../../types/ast';

export default (tokenStream: TokenStream): UntypedVariable => {
  const token = tokenStream.readTokenType(TokenType.UserDefinedWord);
  return {
    type: 'UntypedVariable',
    name: token.characters,
  };
};
