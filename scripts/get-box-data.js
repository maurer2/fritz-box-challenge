import fetch from 'node-fetch';

const url = 'http://fritz.box/cgi-bin/system_status';

fetch(url)
  .then(response => response.text())
  .then((response) => {
    console.log(response);
  });
