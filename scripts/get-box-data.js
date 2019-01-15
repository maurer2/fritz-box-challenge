import fetch from 'node-fetch';

const url = 'http://fritz.box/cgi-bin/system_status';

fetch(url, { compress: false })
  .then((response) => {
    if (response.ok) {
      return response.text();
    }

    throw Error(`Error HTTP-${response.status}`);
  }).catch((error) => {
    console.log(error);
  })
  .then((response) => {
    console.log(response);

    return response;
  });
