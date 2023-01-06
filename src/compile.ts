import scan from './scan';
import parse from './parse';

export default (file: string): string => {
  const tokens = scan(file);

  console.log(tokens.map((token, i) => `${i}: [${token.type}]`).join('\n'));

  const ast = parse(tokens);

  return JSON.stringify(ast);
};
