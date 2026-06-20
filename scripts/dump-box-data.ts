import path from 'node:path';
import { writeFile } from 'node:fs/promises';

import { env } from '../src/env.ts';
import fetcher from '../src/helpers/fetcher/fetcher.ts';
import { boxHTMLSchema } from '../src/schema/boxHTML/boxHTML.schema.ts';

try {
  const bodyContent = await fetcher(env.URL_BOX_STATUS, boxHTMLSchema);
  const html = `\n<html><body>${bodyContent}</body></html>\n\n`;
  const filePath = path.resolve(import.meta.dirname, '../src/mocks/box-latest.txt');

  await writeFile(filePath, html, 'utf8');
  console.log('Successfully dumped box data');
  process.exitCode = 0;
} catch (error) {
  console.error('Error dumping box data', error);
  process.exitCode = 1;
}
