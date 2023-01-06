import { TokenType } from '../../types/tokens';
import type { Statement } from '../../types/ast';
import type TokenStream from '../TokenStream';
import ifStatement from './ifStatement';
import returnStatement from './returnStatement';
import whileStatement from './whileStatement';
import assignmentStatement from './assignmentStatement';
import expressionStatement from './expressionStatement';

export default (tokenStream: TokenStream): Statement => {
  if (tokenStream.checkTokenTypes([TokenType.Tab, TokenType.Return])) {
    return tokenStream.read(returnStatement);
  }
  if (tokenStream.checkTokenTypes([TokenType.Tab, TokenType.If])) {
    return tokenStream.read(ifStatement);
  }
  if (tokenStream.checkTokenTypes([TokenType.Tab, TokenType.While])) {
    return tokenStream.read(whileStatement);
  }
  if (tokenStream.has(assignmentStatement)) {
    return tokenStream.read(assignmentStatement);
  }
  if (tokenStream.has(expressionStatement)) {
    return tokenStream.read(expressionStatement);
  }
  throw tokenStream.error('Expected a statement');
};
