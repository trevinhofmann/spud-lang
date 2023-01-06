import type TokenStream from '../TokenStream';
import type { Variable } from '../../types/ast';
import variableType from './variableType';
import typedVariable from './typedVariable';
import untypedVariable from './untypedVariable';

export default (tokenStream: TokenStream): Variable => {
  if (tokenStream.has(variableType)) {
    return tokenStream.read(typedVariable);
  }
  if (tokenStream.has(untypedVariable)) {
    return tokenStream.read(untypedVariable);
  }
  throw tokenStream.error('Expected a variable');
};
