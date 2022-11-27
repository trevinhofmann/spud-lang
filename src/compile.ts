import { scanLines } from './utils/scan';

export default (file: string): string => {
  const lines = scanLines(file);

  // TODO:
  return lines.map(line => line.tokens.map(token => `[${token.type}]`).join(' ')).join('\n');
};
