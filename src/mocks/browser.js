import { setupWorker } from 'msw/browser';
import { http, HttpResponse } from 'msw';

const mockResponse = '<html><body>FRITZ!Box 7590 (UI)-B-030601-050110-XXXXXX-XXXXXX-787902-1540750-101716-1und1</body></html>';

export const handlers = [
  http.get('http://fritz.box/cgi-bin/system_status', () => HttpResponse.text(mockResponse)),
];

export const worker = setupWorker(...handlers);
