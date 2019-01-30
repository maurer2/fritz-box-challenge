import {
  fieldsMappings,
  mapValueToField,
  flatenArray,
  flattenMapValues,
  splitString,
  addDashToString,
} from './mapper';

const testData = [
  'FRITZ!Box 7590 (UI)',
  'B',
  '041711–000',
  '121',
  '533176–734744',
  '147902',
  '840604',
  '28179',
  '1und1',
];

test('addDashToString WIP ', () => {
  const stringWithMissingDash = 'FRITZ!Box Fon WLAN 7390–B–041711–000121–533176–734744–147902–840604–28179–avm';
  const dashArray = addDashToString(stringWithMissingDash);

  expect(dashArray.length).toBe(10);
});

test('fieldsMapping is not empty ', () => {
  const mappings = fieldsMappings;

  expect(mappings.length).toBeGreaterThan(0);
  expect(mappings.length).toBe(testData.length);
});

test('mapValueToField returns proper object ', () => {
  const index = 0;
  const key = fieldsMappings[index];
  const value = testData[index];

  expect(mapValueToField(value, index)).toEqual({ [key]: value });
});

test('flatenArray flattens 1 level down ', () => {
  const nestedArray = [1, [2]];

  expect(flatenArray(nestedArray)).toEqual([1, 2]);
});

test('flattenMapValues map ', () => {
  const unNestedObjectsInArray = [{ test1: 'test2' }];
  const nestedObjectsInArray = [{ test1: 'test2' }, { test3: 'test4' }, { test5: 'test5' }];

  expect(flattenMapValues(unNestedObjectsInArray)).toEqual({ test1: 'test2' });
  expect(flattenMapValues(nestedObjectsInArray)).toEqual({ test1: 'test2', test3: 'test4', test5: 'test5' });
});
