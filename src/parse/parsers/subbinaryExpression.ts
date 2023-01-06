import type { Expression } from '../../types/ast';
import type TokenStream from '../TokenStream';
import unaryExpression from './unaryExpression';
import numericLiteral from './numericLiteral';
import stringLiteral from './stringLiteral';
import booleanLiteral from './booleanLiteral';
import untypedVariable from './untypedVariable';
import functionCall from './functionCall';

export default (tokenStream: TokenStream): Expression => {
  if (tokenStream.has(unaryExpression)) {
    return tokenStream.read(unaryExpression);
  }
  if (tokenStream.has(numericLiteral)) {
    return tokenStream.read(numericLiteral);
  }
  if (tokenStream.has(stringLiteral)) {
    return tokenStream.read(stringLiteral);
  }
  if (tokenStream.has(booleanLiteral)) {
    return tokenStream.read(booleanLiteral);
  }
  if (tokenStream.has(functionCall)) {
    return tokenStream.read(functionCall);
  }
  if (tokenStream.has(untypedVariable)) {
    return tokenStream.read(untypedVariable);
  }
  throw tokenStream.error('Expected a "subbinary" expression');
};
