import fetch from 'node-fetch';

const getData = (url: string): string => fetch(url, {})
  // eslint-disable-next-line
  .then((response: any) => {
    if (!response.ok) {
      throw Error(response.statusText);
    }

    return response.text();
  })
  .catch((error) => Promise.reject(error));

export default getData;
