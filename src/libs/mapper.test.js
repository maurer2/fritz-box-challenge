import {
  fieldsMappings,
  mapValueToField,
} from './mapper';

const testData = [
  'FRITZ!Box 7590 (UI)',
  'B',
  '041711-000',
  '121',
  '533176',
  '734744',
  '147902',
  '840604',
  '28179',
  '1und1',
];

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

