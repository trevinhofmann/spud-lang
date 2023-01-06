import type TokenStream from '../TokenStream';
import type { Type } from '../../types/types';
import { readType } from '../../types/types';

export default (tokenStream: TokenStream): Type => (
  readType(tokenStream.readToken().characters)
);
