import {
  getHours,
  getDays,
  getMonths,
  getYears,
} from './time';

const testDate = '112008–002';

test('getHours returns correct hours', () => {
  expect(getHours(testDate)).toBe('11');
});

test('getDays returns correct days', () => {
  expect(getDays(testDate)).toBe('20');
});

test('getMonths returns correct months', () => {
  expect(getMonths(testDate)).toBe('08');
});

test('getYears returns correct years', () => {
  expect(getYears(testDate)).toBe('002');
});
