import util from 'util';
import fs from 'fs';
import Logger from 'eleventh';
import getScriptPath from './getScriptPath';
import compile from './compile';

const readFile = util.promisify(fs.readFile);

const main = async(): Promise<void> => {
  const scriptPath = getScriptPath();
  Logger.info('Reading spud script', { scriptPath });
  const script = await readFile(scriptPath, 'utf-8');
  Logger.info('Compiling spud script', { scriptPath });
  const compiled = compile(script);
  console.log(compiled);
  Logger.info('Compiled spud script', { scriptPath });
};

main()
  .catch((e: Error) => {
    Logger.fatal(e.message);
    process.exit(1);
  });
