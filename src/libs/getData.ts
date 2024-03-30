import fetch from 'node-fetch';

const getData = (url: string): Promise<string> => fetch(url)
  .then((response) => {
    if (!response.ok) {
      throw Error(response.statusText);
    }

    return response.text();
  })
  .catch((error: unknown) => Promise.reject(error));

export default getData;
