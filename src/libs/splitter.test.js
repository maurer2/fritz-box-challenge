import {
  splitString,
  isEmptyString,
  hasCorrectNumberOfParts,
  transformString,
  // getDashPositonsInString,
} from './splitter';

const testData = [
  'FRITZ!Box 7590 (UI)',
  'B',
  '041711-00',
  '0121',
  '533176',
  '734744',
  '147902',
  '840604',
  '28179',
  '1und1',
];

test('isEmpty string works', () => {
  expect(isEmptyString('')).toEqual(true);
  expect(isEmptyString('test')).toEqual(false);
});

test('splitString creates correct number of parts ', () => {
  expect(splitString('AB–CD–E')).toEqual(['AB', 'CD', 'E']);
  expect(splitString('AB')).toEqual(['AB']);
});

test('hasCorrectNumberOfParts', () => {
  const desiredLength = testData.length;
  const testStringArray = [
    'FRITZ!Box Fon WLAN 7390',
    'B',
    '041711',
    '000121',
    '533176',
    '734744',
    '147902',
    '840604',
    '28179',
    'avm',
  ];

  expect(hasCorrectNumberOfParts(testStringArray, desiredLength)).toBe(true);
});

// test('getDashPositonsInString returns array ', () => {
//   expect(getDashPositonsInString('this–is–a–test')).toBeInstanceOf(Array);
//   expect(getDashPositonsInString('this–is–a–test')).toEqual([4, 7, 9]);
//   expect(getDashPositonsInString('–a')).toEqual([0]);
//   expect(getDashPositonsInString('a')).toEqual([]);
// });

test('transformString function adds dash between power on hours and restarts ', () => {
  const stringWithMissingDash = 'FRITZ!Box Fon WLAN 7390–B–041711–000121–533176–734744–147902–840604–28179–avm';
  const stringWithoutMissingDash = 'FRITZ!Box Fon WLAN 7390–B–041711–000-121–533176–734744–147902–840604–28179–avm';
  const dashPositions = [23, 25, 32, 39, 46, 53, 60, 67, 73];

  const fixedString = transformString(stringWithMissingDash, dashPositions);

  expect(fixedString).toEqual(stringWithoutMissingDash);
});
