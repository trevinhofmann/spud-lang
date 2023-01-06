import type { Token } from '../types/tokens';
import type { Program } from '../types/ast';
import parseProgram from './parsers/program';
import TokenStream from './TokenStream';

export default (tokens: Token[]): Program => {
  const tokenStream = new TokenStream(tokens);
  return parseProgram(tokenStream);
};
