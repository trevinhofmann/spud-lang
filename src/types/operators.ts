export enum UnaryOperator {
  Negative = 'Negative',
  Negation = 'Negation',
}

export enum BinaryOperator {
  EqualityComparison = 'EqualityComparison',
  InequalityComparison = 'InequalityComparison',
  GreaterEqualityComparison = 'GreaterEqualityComparison',
  LessEqualityComparison = 'LessEqualityComparison',
  Addition = 'Addition',
  Subtraction = 'Subtraction',
  Multiplication = 'Multiplication',
  Division = 'Division',
}

export enum AssignmentOperator {
  Assignment = 'Assignment',
  AdditionAssignment = 'AdditionAssignment',
  SubtractionAssignment = 'SubtractionAssignment',
  MultiplicationAssignment = 'MultiplicationAssignment',
  DivisionAssignment = 'DivisionAssignment',
}

const precedenceMap: Record<BinaryOperator, number> = {
  [BinaryOperator.EqualityComparison]: 1,
  [BinaryOperator.InequalityComparison]: 1,
  [BinaryOperator.GreaterEqualityComparison]: 1,
  [BinaryOperator.LessEqualityComparison]: 1,
  [BinaryOperator.Addition]: 2,
  [BinaryOperator.Subtraction]: 2,
  [BinaryOperator.Multiplication]: 3,
  [BinaryOperator.Division]: 3,
};

export const precedence = (operator: BinaryOperator): number => (
  precedenceMap[operator]
);
