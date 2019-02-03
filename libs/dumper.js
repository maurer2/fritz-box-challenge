import uid from 'uid';
import fs from 'fs-extra';

const dumpData = data => new Promise((resolve, reject) => {
  const randomHash = uid(5);
  const newFile = fs.createWriteStream(`${__dirname}/../mocks/box-${randomHash}.txt`);

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
