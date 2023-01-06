import type TokenStream from '../TokenStream';
import { AssignmentOperator } from '../../types/operators';

const operatorMap: Record<string, AssignmentOperator | undefined> = {
  '=': AssignmentOperator.Assignment,
  '+=': AssignmentOperator.AdditionAssignment,
  '-=': AssignmentOperator.SubtractionAssignment,
  '*-': AssignmentOperator.MultiplicationAssignment,
  '/=': AssignmentOperator.DivisionAssignment,
};

export default (tokenStream: TokenStream): AssignmentOperator => {
  const { characters } = tokenStream.readToken();
  const operator = operatorMap[characters];
  if (operator === undefined) {
    throw tokenStream.error('Unable to read the assignment operator', operator,);
  }
  return operator;
};
