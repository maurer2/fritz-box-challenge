import { http, HttpResponse, delay } from 'msw';

import { env } from '../env';

import mockData from './box-7590-8_25.txt?raw';

const behaviour = env.VITE_MSW_BEHAVIOUR;
const handlers = [
  http.all('/box-data', async () => {
    switch (behaviour) {
      case '404': {
        return new HttpResponse(null, { status: 404, statusText: 'Not Found' });
      }
      case 'NETWORK': {
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
      case 'SLOW': {
        await delay(5000);
        return HttpResponse.text(mockData, { status: 200, statusText: 'OK - Mocked' });
      }
      case 'OK':
      default: {
        return HttpResponse.text(mockData, { status: 200, statusText: 'OK - Mocked' });
      }
    }
  }),
];

export default handlers;
