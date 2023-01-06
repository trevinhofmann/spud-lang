import type { Expression } from '../../types/ast';
import type TokenStream from '../TokenStream';
import binaryExpression from './binaryExpression';
import subbinaryExpression from './subbinaryExpression';

export default (tokenStream: TokenStream): Expression => {
  if (tokenStream.has(binaryExpression)) {
    const result = tokenStream.read(binaryExpression);
    return result;
  }
  if (tokenStream.has(subbinaryExpression)) {
    return tokenStream.read(subbinaryExpression);
  }
  throw tokenStream.error('Expeced an expression');
};
