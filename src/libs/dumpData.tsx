import uid from 'uid';
import fs from 'fs-extra';

const dumpData = (data: unknown) => new Promise((resolve, reject) => {
  const newFile = fs.createWriteStream(`${__dirname}/../mocks/box-${uid(5)}.txt`);

  newFile.on('error', () => {
    reject();
  });

  newFile.on('finish', () => {
    resolve('done');
  });

  newFile.write(data, 'utf8');
  newFile.end();
});

export default dumpData;
