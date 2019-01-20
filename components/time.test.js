import {
  getHours,
  getDays,
  getMonths,
  getYears,
} from './time';

const testDate = '112008–002';

test('getHours returns correct hours', () => {
  expect(getHours(testDate)).toBe(11);
  expect(getHours(testDate)).toBeLessThanOrEqual(23);
  expect(getHours(testDate)).toBeGreaterThanOrEqual(0);
});

test('getDays returns correct days', () => {
  expect(getDays(testDate)).toBe(20);

  expect(getDays(testDate)).toBeLessThanOrEqual(32);
  expect(getDays(testDate)).toBeGreaterThanOrEqual(1);
});

test('getMonths returns correct months', () => {
  expect(getMonths(testDate)).toBe(8);

  expect(getMonths(testDate)).toBeLessThanOrEqual(12);
  expect(getMonths(testDate)).toBeGreaterThanOrEqual(1);
});

test('getYears returns correct years', () => {
  expect(getYears(testDate)).toBe(2);

  expect(getYears(testDate)).toBeGreaterThanOrEqual(0);
});
