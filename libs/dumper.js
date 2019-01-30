import uid from 'uid';
import fs from 'fs-extra';

const dumpData = (data) => {
  const randomHash = uid(5);
  const newFile = fs.createWriteStream(`${__dirname}/../mocks/box-${randomHash}.txt`);

  newFile.on('error', () => {
    throw new Error();
  });

  newFile.on('finish', () => {
    console.log('done');
  });

  newFile.write(data, 'utf8');
  newFile.end();
};

export default dumpData;
