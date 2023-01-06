import type TokenStream from '../TokenStream';
import { BinaryOperator } from '../../types/operators';

const operatorMap: Record<string, BinaryOperator | undefined> = {
  '==': BinaryOperator.EqualityComparison,
  '!=': BinaryOperator.InequalityComparison,
  '>=': BinaryOperator.GreaterEqualityComparison,
  '<=': BinaryOperator.LessEqualityComparison,
  '+': BinaryOperator.Addition,
  '-': BinaryOperator.Subtraction,
  '*': BinaryOperator.Multiplication,
  '/': BinaryOperator.Division,
};

export default (tokenStream: TokenStream): BinaryOperator => {
  const { characters } = tokenStream.readToken();
  const operator = operatorMap[characters];
  if (operator === undefined) {
    throw tokenStream.error('Unable to read the binary operator', operator,);
  }
  return operator;
};
