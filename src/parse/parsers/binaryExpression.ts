import type { Expression, BinaryExpression } from '../../types/ast';
import type { BinaryOperator } from '../../types/operators';
import { precedence } from '../../types/operators';
import { TokenType } from '../../types/tokens';
import type TokenStream from '../TokenStream';
import subbinaryExpression from './subbinaryExpression';
import binaryOperator from './binaryOperator';

// TODO: consider implementing this recursively.
// More details in the comment at the end of this file.

// TODO: consider left-associative and right-associative, not only precedence?

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

/*

The current implementation above is O(n^2) for 'n' operators because we need to
iterate (approximately halfway) through the list of tokens once for each
operator. A recursive implementation that simply works left-to-rght once ought
to be possible, which would perform in O(n).

While the performance difference in the recursive implementation is unlikely to
matter in typical scenarios (one would not typically write very length binary
expressions such as "1 + 2 + 3 + ... + 9998 + 9999 + 10000"), I would still like
to implement it that way at least once because I struggled for about 3 days with
that approach before giving up and using the current approach. It would be a fun
exercise to complete.

To visualize the differences, here is an example that I will demonstrate with
each approach: 1 * 2 + 3 + 4 * 5 + 6 / 7 - 8

Current approach:
  * Step 0: 1 * 2 + 3 + 4 * 5 + 6 / 7 - 8
  * Step 1: (1*2) + 3 + 4 * 5 + 6 / 7 - 8
  * Step 2: (1*2) + 3 + (4*5) + 6 / 7 - 8
  * Step 3: (1*2) + 3 + (4*5) + (6/7) - 8
  * Step 4: ((1*2)+3) + (4*5) + (6/7) - 8
  * Step 5: (((1*2)+3)+(4*5)) + (6/7) - 8
  * Step 6: ((((1*2)+3)+(4*5))+(6/7)) - 8
  * Step 7: (((((1*2)+3)+(4*5))+(6/7))-8)

Recursive approach:
  * Step 0: 1 * 2 + 3 + 4 * 5 + 6 / 7 - 8
  * Step 1: (1*2) + 3 + 4 * 5 + 6 / 7 - 8
  * Step 2: ((1*2)+3) + 4 * 5 + 6 / 7 - 8
  * Step 3: ((1*2)+3)+(4 * 5 + 6 / 7 - 8)
  * Step 4: ((1*2)+3)+((4*5) + 6 / 7 - 8)
  * Step 5: ((1*2)+3)+((4*5)+(6 / 7 - 8))
  * Step 6: ((1*2)+3)+((4*5)+((6/7) - 8))
  * Step 7: ((1*2)+3)+((4*5)+(((6/7)-8)))

It is concerning that the two results are different, although seemingly correct
and evaluating to the same result. This needs further consideration.

Here's an imperfect pseudocode implementation of the recursive approach:

function parse(tokens)
  let left = read(operand)
  let operator = read(operator)
  let right = peek(operand)

  while has(nextOperator)
    let nextOperator = peeK(nextOperator)
    if nextOperator <= operator
      right = read(operand)
      left = (left, operator, right)
      operator = read(operator)
      right = peek(operand)
    else
      right = parse(tokens)

*/
