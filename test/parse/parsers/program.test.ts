import scan from '../../../src/scan';
import program from '../../../src/parse/parsers/program';
import TokenStream from '../../../src/parse/TokenStream';

const testCases = [
  `function sum
	+ uint a
	+ uint b
	> uint

	a = 4 + 5
	return a + b
`,
  `import print from 'print'
import max from './max'
import sum from './sum'
import product from './product'

function main

	uint four = max(3, 4)
	uint nine = sum(four, 5)
	uint eighteen = product(2, nine)
	print(eighteen)
`
];

describe('program', () => {
  testCases.forEach(testCase => {
    it(testCase, () => {
      const tokens = scan(testCase);
      const tokenStream = new TokenStream(tokens);
      const result = tokenStream.read(program);
      expect(result).toMatchSnapshot();
    });
  });
});
