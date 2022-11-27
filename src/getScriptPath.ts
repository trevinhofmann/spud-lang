export default (): string => {
  if (process.argv.length !== 3) {
    throw new Error('Usage: node dist [script]');
  }

  const scriptPath = process.argv[2];

  if (scriptPath.split('.').pop() !== 'spud') {
    throw new Error('Script filename must end in ".spud"');
  }

  return scriptPath;
};
