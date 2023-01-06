import type { Expression, BinaryExpression } from '../../types/ast';
import type { BinaryOperator } from '../../types/operators';
import { precedence } from '../../types/operators';
import { TokenType } from '../../types/tokens';
import type TokenStream from '../TokenStream';
import subbinaryExpression from './subbinaryExpression';
import binaryOperator from './binaryOperator';

const continuation = (tokenStream: TokenStream): void => {
  tokenStream.readTokenType(TokenType.Space);
  tokenStream.read(binaryOperator);
  tokenStream.readTokenType(TokenType.Space);
  tokenStream.read(subbinaryExpression);
};

export default (tokenStream: TokenStream): BinaryExpression => {
  const expressions: Expression[] = [];
  const operators: BinaryOperator[] = [];
  expressions.push(tokenStream.read(subbinaryExpression));
  do {
    tokenStream.readTokenType(TokenType.Space);
    operators.push(tokenStream.read(binaryOperator));
    tokenStream.readTokenType(TokenType.Space);
    expressions.push(tokenStream.read(subbinaryExpression));
  } while (tokenStream.has(continuation));

  while (expressions.length > 2) {
    const maxPrecedence = operators
      .map(operator => precedence(operator))
      .reduce((max, precedence) => Math.max(max, precedence), 0);
    const index = operators.findIndex(operator => (
      precedence(operator) === maxPrecedence
    ));
    const operator = operators.splice(index, 1)[0];
    const [left, right] = expressions.splice(index, 2);
    expressions.splice(index, 0, {
      type: 'BinaryExpression',
      operator,
      left,
      right,
    });
  }

  return {
    type: 'BinaryExpression',
    operator: operators[0],
    left: expressions[0],
    right: expressions[1],
  };
};
