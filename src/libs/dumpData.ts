import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { writeFile } from 'node:fs/promises';

const dumpData = async (data: unknown) => {
  const path = resolve(dirname(fileURLToPath(import.meta.url)), '../../public/mock-data.txt');

  if (typeof data !== 'string') {
    throw new Error('Invalid data parameter');
  }

  await writeFile(path, data, 'utf8');
};

export default dumpData;
