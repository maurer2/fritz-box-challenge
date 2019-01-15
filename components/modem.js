import fetch from 'node-fetch';

export default class QueryComponent {
  constructor(url) {
    this.url = url;
  }

  async getData() {
    return fetch(this.url, { compress: false })
      .then((response) => {
        if (response.ok) {
          return response.text();
        }
        throw Error(`Error HTTP-${response.status}`);
      }).catch(() => '')
      .then(response => response);
  }
}
