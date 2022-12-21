export enum TokenType {
  // Symbols
  EqualsEquals = 'EqualsEquals',
  NotEquals = 'NotEquals',
  PlusEquals = 'PlusEquals',
  MinusEquals = 'MinusEquals',
  AsteriskEquals = 'AsteriskEquals',
  ForwardSlashEquals = 'ForwardSlashEquals',
  GreaterEquals = 'GreaterEquals',
  LessEquals = 'LessEquals',
  Tab = 'Tab',
  Space = 'Space',
  Newline = 'Newline',
  Plus = 'Plus',
  Minus = 'Minus',
  Asterisk = 'Asterisk',
  ForwardSlash = 'ForwardSlash',
  Equals = 'Equals',
  Colon = 'Colon',
  Greater = 'Greater',
  Less = 'Less',
  Not = 'Not',
  ParenthesisOpen = 'ParenthesisOpen',
  ParenthesisClose = 'ParenthesisClose',
  // Numbers
  Integer = 'Integer',
  // Words
  For = 'For',
  In = 'In',
  While = 'While',
  Function = 'Function',
  If = 'If',
  Else = 'Else',
  Return = 'Return',
  UserDefinedWord = 'UserDefinedWord',
  // Types
  Boolean = 'Boolean',
  String = 'String',
  Undefined = 'Undefined',
  Uint = 'Uint',
  Int = 'Int',
  Uint8 = 'Uint8',
  Int8 = 'Int8',
  Uint16 = 'Uint16',
  Int16 = 'Int16',
  Uint32 = 'Uint32',
  Int32 = 'Int32',
  Uint64 = 'Uint64',
  Int64 = 'Int64',
  // Miscellaneous
  Comment = 'Comment',
  Unknown = 'Unknown',
}

export type PartialToken = {
  type: TokenType;
  characters: string;
};

export type Token = {
  type: TokenType;
  characters: string;
  line: number;
  colStart: number;
  colEnd: number;
};
