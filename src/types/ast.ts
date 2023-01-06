import type { Type } from './types';
import type { UnaryOperator, BinaryOperator, AssignmentOperator } from './operators';

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
  parameters: TypedVariable[];
  returnType: Type;
  body: Statement[];
};

export type ImportDeclaration = {
  type: 'ImportDeclaration';
  name: string;
  source: string;
};

export type Declaration = FunctionDeclaration | ImportDeclaration;

export type UntypedVariable = {
  type: 'UntypedVariable';
  name: string;
};

export type TypedVariable = {
  type: 'TypedVariable';
  name: string;
  variableType: Type;
};

export type Variable = UntypedVariable | TypedVariable;

export type NumericLiteral = {
  type: 'NumericLiteral';
  value: string;
};

export type StringLiteral = {
  type: 'StringLiteral';
  value: string;
};

export type BooleanLiteral = {
  type: 'BooleanLiteral';
  value: boolean;
};

export type Expression =
| UntypedVariable
| NumericLiteral
| StringLiteral
| BooleanLiteral
| UnaryExpression
| BinaryExpression;

export type AssignmentStatement = {
  type: 'AssignmentStatement';
  operator: AssignmentOperator;
  left: Variable;
  right: Expression;
};

export type ExpressionStatement = {
  type: 'ExpressionStatement';
  expression: Expression;
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
  | AssignmentStatement
  | ExpressionStatement
  | IfStatement
  | WhileStatement
  | ReturnStatement;
