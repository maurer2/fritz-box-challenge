import fs from 'fs-extra';

const dumpData = (data: unknown) => new Promise((resolve, reject) => {
  const newFile = fs.createWriteStream(`${__dirname}/../../public/mock-data.txt`);

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
