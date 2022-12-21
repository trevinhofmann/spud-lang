import type { Type } from './types';
import type { UnaryOperator, BinaryOperator } from './operators';

/* eslint-disable @typescript-eslint/no-use-before-define */

export type Program = {
  type: 'Program';
  declarations: Declaration[];
  statements: Statement[];
};

export type UnaryExpression = {
  type: 'UnaryExpression';
  operator: UnaryOperator;
  operand: Expression;
};

export type BinaryExpression = {
  type: 'BinaryExpression';
  operator: BinaryOperator;
  left: Expression;
  right: Expression;
};

export type FunctionDeclaration = {
  type: 'FunctionDeclaration';
  name: string;
  parameters: Variable[];
  returnType: Type;
  body: Statement[];
};

export type Variable = {
  type: 'Variable';
  name: string;
  variableType: Type;
};

export type NumericLiteral = {
  type: 'Number';
  value: string;
};

export type StringLiteral = {
  value: string;
};

export type Expression = UnaryExpression | BinaryExpression;

export type ExpressionStatement = {
  type: 'ExpressionStatement';
  statement: Statement;
};

export type IfStatement = {
  type: 'IfStatement';
  test: Expression;
  consequent: Statement[];
};

export type WhileStatement = {
  type: 'WhileStatement';
  test: Expression;
  body: Statement[];
};

export type ReturnStatement = {
  type: 'ReturnStatement';
  child: Expression;
};

export type Statement =
  | ExpressionStatement
  | IfStatement
  | WhileStatement
  | ReturnStatement;

export type Declaration = FunctionDeclaration;
