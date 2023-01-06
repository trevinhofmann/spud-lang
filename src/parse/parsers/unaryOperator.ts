import type TokenStream from '../TokenStream';
import { UnaryOperator } from '../../types/operators';

const operatorMap: Record<string, UnaryOperator | undefined> = {
  '!': UnaryOperator.Negation,
  '-': UnaryOperator.Negative,
};

export default (tokenStream: TokenStream): UnaryOperator => {
  const { characters } = tokenStream.readToken();
  const operator = operatorMap[characters];
  if (operator === undefined) {
    throw tokenStream.error('Unable to read the unary operator', operator,);
  }
  return operator;
};
