/* eslint-disable import/extensions */
import * as dotenv from 'dotenv';

import fetcher from '../src/helpers/fetcher/fetcher.ts';
import dumpData from '../src/libs/dumpData.ts';
import { boxHTMLSchema } from '../src/schema/boxHTML/boxHTML.schema.ts';

dotenv.config();
const url = process.env.URL_BOX_STATUS;

if (!url) {
  throw new Error('URL_BOX_STATUS missing');
}

try {
  const htmlString = await fetcher(url, boxHTMLSchema);
  await dumpData(htmlString);
} catch (error) {
  console.error('Error dumping box data');
  process.exit(1);
}
