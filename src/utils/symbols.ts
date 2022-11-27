import { TokenType } from '../types/tokens';

export default [
  {
    characters: '==',
    type: TokenType.EqualsEquals,
  },
  {
    characters: '!=',
    type: TokenType.NotEquals,
  },
  {
    characters: '+=',
    type: TokenType.PlusEquals,
  },
  {
    characters: '-=',
    type: TokenType.MinusEquals,
  },
  {
    characters: '*=',
    type: TokenType.AsteriskEquals,
  },
  {
    characters: '/=',
    type: TokenType.ForwardSlashEquals,
  },
  {
    characters: '>=',
    type: TokenType.GreaterEquals,
  },
  {
    characters: '<=',
    type: TokenType.LessEquals,
  },
  {
    characters: '\t',
    type: TokenType.Tab,
  },
  {
    characters: ' ',
    type: TokenType.Space,
  },
  {
    characters: '+',
    type: TokenType.Plus,
  },
  {
    characters: '-',
    type: TokenType.Minus,
  },
  {
    characters: '*',
    type: TokenType.Asterisk,
  },
  {
    characters: '/',
    type: TokenType.ForwardSlash,
  },
  {
    characters: '=',
    type: TokenType.Equals,
  },
  {
    characters: ':',
    type: TokenType.Colon,
  },
  {
    characters: '>',
    type: TokenType.Greater,
  },
  {
    characters: '<',
    type: TokenType.Less,
  },
  {
    characters: '!',
    type: TokenType.Not,
  },
];
