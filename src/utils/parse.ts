import { TokenType } from '../types/tokens';
import type { Token } from '../types/tokens';
import type {
  Program,
  UnaryExpression,
  BinaryExpression,
  FunctionDeclaration,
  Variable,
  NumericLiteral,
  StringLiteral,
  Expression,
  ExpressionStatement,
  IfStatement,
  WhileStatement,
  ReturnStatement,
  Statement,
  Declaration,
} from '../types/ast';

type ParseResult<T> = {
  ast: T;
  remainder: Token[];
};

type Parser<T> = (token: Token[]) => ParseResult<T>;

/* eslint-disable @typescript-eslint/no-use-before-define */

export const parseProgram: Parser<Program> = (tokens) => {
  const declarations: Declaration[] = [];
  const statements: Statement[] = [];
  while (tokens.length > 0) {
    if (tokens[0].type === TokenType.Function) {
      const { ast, remainder } = parseFunctionDeclaration(tokens);
      declarations.push(ast);
      tokens = remainder;
    } else {
      const { ast, remainder } = parseStatement(tokens);
      statements.push(ast);
      tokens = remainder;
    }
  }

  return {
    ast: {
      type: 'Program',
      declarations,
      statements,
    },
    remainder: tokens,
  };
};

const parseFunctionDeclaration: Parser<FunctionDeclaration> = (tokens) => {
  // Parse the "function" keyword and the function name
  const functionToken = tokens.shift();
  if (functionToken?.type !== TokenType.Function) {
    throw new Error('Expected "function" keyword');
  }
  const nameToken = tokens.shift();
  if (nameToken?.type !== TokenType.UserDefinedWord) {
    throw new Error('Expected function name');
  }
  const name = nameToken.characters;

  // Parse the function parameters
  const parameters: Variable[] = [];
  if (tokens[0].type === TokenType.ParenthesisOpen) {
    tokens.shift();
    while (tokens[0].type !== TokenType.ParenthesisClose) {
      // Parse a function parameter
      const { ast, remainder } = parseParameter(tokens);
      parameters.push(ast);
      tokens = remainder;
    }
    tokens.shift();
  }

  // Parse the function return type
  const returnTypeToken = tokens.shift();
  if (returnTypeToken === undefined || returnTypeToken.type !== TokenType.UserDefinedWord) {
    throw new Error('Expected function return type');
  }
  const returnType = parseType(returnTypeToken);

  // Parse the function body
  const { ast: body, remainder } = parseBlock(tokens);

  // Return the parsed function declaration
  return {
    ast: {
      type: 'FunctionDeclaration',
      name,
      parameters,
      returnType,
      body,
    },
    remainder,
  };
};

