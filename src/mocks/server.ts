import { http, HttpResponse } from 'msw';
import { setupServer } from 'msw/browser';

// import { handlers } from './handlers';

const mockResponse = '<html><body>FRITZ!Box 7590 (UI)-B-030601-050110-XXXXXX-XXXXXX-787902-1540750-101716-1und1</body></html>';
// const mockResponse = '';

export function makeServer() {
  // const res = await fetch('box-iu7nl.text');
  // const data = await res.text();

  // console.log(data);

  const server = setupServer(
    http.get('http://fritz.box/cgi-bin/system_status', () => HttpResponse.text(mockResponse)),
  );

  // server.listen();

  // const server = createServer({
  //   urlPrefix: 'http://localhost:3000/',
  //   routes() {
  //     this.get('http://fritz.box/cgi-bin/system_status', () => mockResponse);
  //   },
  // });

  return server;
}
