import type { Token, TokenType } from '../types/tokens';

type Parser<T> = (tokenStream: TokenStream) => T;

export default class TokenStream {
  private readonly tokens: Token[];

  private index: number = 0;

  public constructor(tokens: Token[]) {
    this.tokens = tokens;
  }

  public peekToken = (index = 0): Token => {
    if (!this.hasTokens(index + 1)) {
      throw new Error('Token expected');
    }
    index += this.index;
    return this.tokens[index];
  };

  public peekTokenType = (type: TokenType, index = 0): Token => {
    const token = this.peekToken(index);
    if (token.type !== type) {
      throw this.error(`Expected ${type} token`);
    }
    return token;
  };

  public peekTokenTypes = (types: TokenType[]): Token[] => (
    types.map((type, i) => this.peekTokenType(type, i))
  );

  public readToken = (): Token => {
    if (!this.hasTokens(1)) {
      throw new Error('Token expected');
    }
    const token = this.tokens[this.index];
    this.index += 1;
    return token;
  };

  public readTokenType = (type: TokenType): Token => {
    const token = this.readToken();
    if (token.type !== type) {
      throw this.error(`Expected "${type}" token`);
    }
    return token;
  };

  public readTokenTypes = (types: TokenType[]): Token[] => (
    types.map(type => this.readTokenType(type))
  );

  public readAllOfTokenType = (type: TokenType, minimum = 1): Token[] => {
    const tokens: Token[] = [];
    while (this.checkTokenType(type)) {
      tokens.push(this.readTokenType(type));
    }
    if (tokens.length < minimum) {
      throw new Error(`Expected at least ${minimum} ${type} tokens. Found ${tokens.length}.`);
    }
    return tokens;
  };

  public checkTokenType = (type: TokenType, index = 0): boolean => {
    if (!this.hasTokens()) {
      return false;
    }
    const token = this.peekToken(index);
    return token.type === type;
  };

  public checkTokenTypes = (types: TokenType[]): boolean => {
    if (!this.hasTokens(types.length)) {
      return false;
    }
    return types.reduce((matches, type, i) => (
      matches && this.checkTokenType(type, i)
    ), true);
  };

  public hasTokens = (quantity = 1): boolean => {
    quantity += this.index;
    return this.tokens.length >= quantity;
  };

  public peek = <T>(parser: Parser<T>, index = 0): T => {
    const originalIndex = this.index;
    this.index += index;
    const node = parser(this);
    this.index = originalIndex;
    return node;
  };

  public read = <T>(parser: Parser<T>): T => {
    const node = parser(this);
    return node;
  };

  public readAll = <T>(parser: Parser<T>): T[] => {
    const nodes: T[] = [];
    while (this.has(parser)) {
      nodes.push(this.read(parser));
    }
    return nodes;
  };

  public has = <T>(parser: Parser<T>, index = 0): boolean => {
    const originalIndex = this.index;
    try {
      this.peek(parser, index);
      return true;
    } catch (e: unknown) {
      return false;
    } finally {
      this.index = originalIndex;
    }
  };

  public error = (message: string, token?: Token): Error => {
    if (token === undefined) {
      token = this.peekToken();
    }
    message = `${message}.
Token: ${token.type} (${token.characters})
Location: Line ${token.line}, Column ${token.colStart}`;
    return new Error(message);
  };
}
