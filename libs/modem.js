import fetch from 'node-fetch';

const getData = url => fetch(url)
  .then((response) => {
    if (!response.ok) {
      throw Error(response.statusText);
    }

    return response.text();
  })
  .catch(error => Promise.reject(error));

export default getData;
