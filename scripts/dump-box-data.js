import getData from '../libs/modem';
import dumpData from '../libs/dumper';

const url = 'http://fritz.box/cgi-bin/system_status';

getData(url)
  .catch((error) => {
    throw new Error(error);
  })
  .then((data) => {
    if (data instanceof Error) {
      process.exit(1);

      return false;
    }

    return dumpData(data);
  })
  .catch((error) => {
    throw new Error(error);
  })
  .then((data) => {
    if (data instanceof Error) {
      process.exit(1);
    }

    process.exit(0);
  });
