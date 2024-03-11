import fetch from 'node-fetch';
import getData from './getData';

jest.mock('node-fetch');

const positivePromise = new Promise((resolve) => {
  resolve({
    ok: true,
    text: () => { 'test'; },
  });
});

const negativePromise = new Promise((resolve) => {
  resolve({
    ok: false,
  });
});


describe('modem', () => {
  test('getData response is okay', () => {
    fetch.mockReturnValue(Promise.resolve(positivePromise));

    getData('url').then((data) => {
      expect(fetch).toHaveBeenCalledTimes(1);
      expect(data.ok).toBe(true);
      expect(data.text).toBe('test');
    });
  });

  test('getData response throws error', () => {
    fetch.mockImplementation(() => {
      throw new Error();
    });

    getData('url').then(() => {
      expect(fetch).toHaveBeenCalledTimes(1);
    });
  });
});
