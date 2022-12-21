import scan from './utils/scan';

export default (file: string): string => {
  const tokens = scan(file);

  // TODO:
  return tokens.map(token => `[${token.type}]`).join('\n');
};
