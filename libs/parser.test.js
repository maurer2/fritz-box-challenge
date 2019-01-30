import parseData from './parser';

const detailsString = '<html><body>FRITZ!Box 6590 Cable-Kabel-042601-000024-076465-246657-787902-1480701-63195-avm</body></html>';
const parsedString = 'FRITZ!Box 6590 Cable-Kabel-042601-000024-076465-246657-787902-1480701-63195-avm';

test('parserData returns proper details string', () => {
  expect(parseData(detailsString)).toBe(parsedString);
});
