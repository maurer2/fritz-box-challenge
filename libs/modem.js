import fetch from 'node-fetch';

const getData = (url) => fetch(url, { compress: false })
  .then((response) => {
    if (!response.ok) {
      throw Error(response.statusText);
    }

    return response.text();
  })
  .catch(error => error);

export default getData;
