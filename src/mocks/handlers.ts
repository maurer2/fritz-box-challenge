import { http, HttpResponse, delay } from 'msw';

import mockData from './box-7590-8_25.txt?raw';

type Behaviour = 'OK' | 'SLOW' | '404' | 'NETWORK' | 'TIMEOUT' | 'INVALID_HTML' | 'INVALID_FIELDS';
const behaviour: Behaviour = import.meta.env.VITE_MSW_BEHAVIOUR ?? 'OK';

const handlers = [
  http.all('/box-data', async () => {
    switch (behaviour) {
      case '404': {
        return new HttpResponse(null, { status: 404, statusText: 'Not Found' });
      }
      case 'NETWORK': {
        // simulates a fetch-level network failure
        return HttpResponse.error();
      }
      case 'TIMEOUT': {
        await delay('infinite');
        return new HttpResponse(null);
      }
      case 'INVALID_HTML': {
        return HttpResponse.text('<html><body>HorstBox</body></html>', {
          status: 200,
        });
      }
      case 'INVALID_FIELDS': {
        return HttpResponse.text('<html><body>FRITZ!Box 7590 (UI)-meow-meow</body></html>', {
          status: 200,
        });
      }
      case 'SLOW':
      default: {
        await delay(behaviour === 'SLOW' ? 2500 : undefined);
        return HttpResponse.text(mockData, { status: 200, statusText: 'OK - Mocked' });
      }
    }
  }),
];

export default handlers;
