import scan from '../../../src/utils/scan';
import binaryExpression from '../../../src/parse/parsers/binaryExpression';
import TokenStream from '../../../src/parse/TokenStream';

const testCases = [
  '4 + 5',
  'a + b',
  '1 + 2 + 3',
  '1 * 2 + 3',
  '4 * 7 + a * b',
];

describe('binaryExpression', () => {
  testCases.forEach(testCase => {
    it(testCase, () => {
      const tokens = scan(testCase);
      const tokenStream = new TokenStream(tokens);
      const result = tokenStream.read(binaryExpression);
      expect(result).toMatchSnapshot();
    });
  });
});