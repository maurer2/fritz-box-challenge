import { http, HttpResponse, delay } from 'msw';

const handlers = [
  http.all('/box-data', async () => {
    const response = await fetch('/mock-data.txt');

    if (!response.ok) {
      return new HttpResponse(null, {
        status: 404,
        statusText: 'Box data not found',
      });
    }

    const mockData = await response.text();

    await delay(1000);
    return HttpResponse.text(mockData, {
      status: 202,
      statusText: 'Mocked status',
    });
  }),
];

export default handlers;
