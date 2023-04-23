import * as dotenv from 'dotenv';

import getData from '../src/libs/getData';
import dumpData from '../src/libs/dumpData';

dotenv.config();
const url = process.env.URL_BOX_STATUS;

if (!url) {
  throw new Error('URL_BOX_STATUS missing');
}

getData(url)
  .catch((error: unknown) => {
    throw new Error('Error');
  })
  .then((data: unknown) => {
    if (data instanceof Error) {
      process.exit(1);
    }

    return dumpData(data);
  })
  .catch((error: unknown) => {
    throw new Error('Error');
  })
  .then((data: unknown) => {
    if (data instanceof Error) {
      process.exit(1);
    }

    process.exit(0);
  });
