import type { UnaryExpression } from '../../types/ast';
import type TokenStream from '../TokenStream';
import expression from './expression';
import unaryOperator from './unaryOperator';

export default (tokenStream: TokenStream): UnaryExpression => {
  const operator = tokenStream.read(unaryOperator);
  const operand = tokenStream.read(expression);
  return {
    type: 'UnaryExpression',
    operator,
    operand,
  };
};
