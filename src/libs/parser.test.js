import parseData from './parser';

test('parserData returns proper details string', () => {
  const detailsString = '<html><body>FRITZ!Box 6590 Cable-Kabel-042601-000024-076465-246657-787902-1480701-63195-avm</body></html>';
  const parsedString = 'FRITZ!Box 6590 Cable-Kabel-042601-000024-076465-246657-787902-1480701-63195-avm';

  expect(parseData(detailsString)).toBe(parsedString);
});

test('parserData returns empty string if markup is incorrect', () => {
  const detailsString = 'Test';
  const parsedString = '';

  expect(parseData(detailsString)).toBe(parsedString);
});

test('parserData returns empty string if markup is incorrect 2', () => {
  const detailsString = '<html>FRITZ!Box 6590 Cable-Kabel-042601-000024-076465-246657-787902-1480701-63195-avm</html>';
  const parsedString = '';

  expect(parseData(detailsString)).toBe(parsedString);
});
