import { TokenType } from '../../types/tokens';
import type { AssignmentStatement } from '../../types/ast';
import type TokenStream from '../TokenStream';
import expression from './expression';
import assignmentOperator from './assignmentOperator';
import variable from './variable';

export default (tokenStream: TokenStream): AssignmentStatement => {
  tokenStream.readTokenType(TokenType.Tab);
  const left = tokenStream.read(variable);
  tokenStream.readTokenType(TokenType.Space);
  const operator = tokenStream.read(assignmentOperator);
  tokenStream.readTokenType(TokenType.Space);
  const right = tokenStream.read(expression);
  tokenStream.readTokenType(TokenType.Newline);
  return {
    type: 'AssignmentStatement',
    operator,
    left,
    right,
  };
};
