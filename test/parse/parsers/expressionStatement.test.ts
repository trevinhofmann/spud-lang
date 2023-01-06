import scan from '../../../src/utils/scan';
import expressionStatement from '../../../src/parse/parsers/expressionStatement';
import TokenStream from '../../../src/parse/TokenStream';

const testCases = [
  '\t4 + 5\n',
  '\ta + b\n',
  '\t1 + 2 + 3\n',
  '\t1 * 2 + 3\n',
  '\t4 * 7 + a * b\n',
  '\t!a\n',
  '\t-b\n',
];

describe('expressionStatement', () => {
  testCases.forEach(testCase => {
    it(testCase, () => {
      const tokens = scan(testCase);
      const tokenStream = new TokenStream(tokens);
      const result = tokenStream.read(expressionStatement);
      expect(result).toMatchSnapshot();
    });
  });
});