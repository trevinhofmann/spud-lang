import scan from '../../../src/utils/scan';
import functionCall from '../../../src/parse/parsers/functionCall';
import TokenStream from '../../../src/parse/TokenStream';

const testCases = [
  'sum(a, b)',
  'max()',
];

describe('functionCall', () => {
  testCases.forEach(testCase => {
    it(testCase, () => {
      const tokens = scan(testCase);
      const tokenStream = new TokenStream(tokens);
      const result = tokenStream.read(functionCall);
      expect(result).toMatchSnapshot();
    });
  });
});