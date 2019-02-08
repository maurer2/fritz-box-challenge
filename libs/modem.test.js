import getData from './modem';

describe('modem', () => {
  global.fetch = jest.fn().mockImplementation(() => {
    const mockedReturn = new Promise((resolve) => {
      resolve({
        ok: true,
        text: () => { 'test'; },
      });
    });

    return mockedReturn;
  });

  it('getData response is okay', (done) => {
    getData('url')
      .then((response) => {
        expect(response.ok).toBe(true);
        expect(response.text()).toBe('test');

        done();
      })
      .catch(error => error);
  });

  it('getData response is not okay', () => {
    global.fetch = jest.fn().mockImplementation(() => Promise.resolve({
      ok: false,
    }));

    getData('url')
      .then(() => {
        expect(() => {
          throw new Error();
        }).toThrow();
      })
      .catch(error => error);
  });
});
