import { TokenType } from '../../types/tokens';
import type { Program, Statement, Declaration } from '../../types/ast';
import type TokenStream from '../TokenStream';
import functionDeclaration from './functionDeclaration';
import statement from './statement';
import ImportDeclaration from './importDeclaration';

export default (tokenStream: TokenStream): Program => {
  const declarations: Declaration[] = [];
  const statements: Statement[] = [];
  while (tokenStream.hasTokens()) {
    if (tokenStream.checkTokenType(TokenType.Function)) {
      declarations.push(tokenStream.read(functionDeclaration));
    } else if (tokenStream.checkTokenType(TokenType.Import)) {
      declarations.push(tokenStream.read(ImportDeclaration));
    } else {
      statements.push(tokenStream.read(statement));
    }
  }
  return {
    type: 'Program',
    declarations,
    statements,
  };
};
