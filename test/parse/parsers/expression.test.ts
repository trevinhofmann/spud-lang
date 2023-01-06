import scan from '../../../src/scan';
import expression from '../../../src/parse/parsers/expression';
import TokenStream from '../../../src/parse/TokenStream';

const testCases = [
  '4 + 5',
  'a + b',
  '1 + 2 + 3',
  '4 * 7 + a * b',
  '!a',
  '-b',
];

describe('expression', () => {
  testCases.forEach(testCase => {
    it(testCase, () => {
      const tokens = scan(testCase);
      const tokenStream = new TokenStream(tokens);
      const result = tokenStream.read(expression);
      expect(result).toMatchSnapshot();
    });
  });
});