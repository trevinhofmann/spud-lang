import scan from '../../../src/utils/scan';
import assignmentStatement from '../../../src/parse/parsers/assignmentStatement';
import TokenStream from '../../../src/parse/TokenStream';

const testCases = [
  '\tuint a = 4 + 5\n',
  '\ta = 4 + 5\n',
  '\ta = max(a, b)\n',
];

describe('assignmentStatement', () => {
  testCases.forEach(testCase => {
    it(testCase, () => {
      const tokens = scan(testCase);
      const tokenStream = new TokenStream(tokens);
      const result = tokenStream.read(assignmentStatement);
      expect(result).toMatchSnapshot();
    });
  });
});