import fetch from 'node-fetch';
import uid from 'uid';
import fs from 'fs-extra';

const url = 'http://fritz.box/cgi-bin/system_status';

fetch(url, { compress: false })
  .then((response) => {
    if (response.ok) {
      const randomHash = uid(5);
      const newFile = fs.createWriteStream(`./mocks/box-${randomHash}.txt`);
      const content = response.body;

      content.pipe(newFile);

      return;
    }

    throw Error(`Error HTTP-${response.status}`);
  }).catch((error) => {
    console.log(error);
  });
