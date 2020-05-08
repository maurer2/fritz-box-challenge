import { format } from 'date-fns';

import {
  getHours,
  getDays,
  getMonths,
  getYears,
  getDate,
  getDateAsIsoDate,
  getTimeBetween,
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

test('getDate returns correct getDate', () => {
  const formattedDate = format(testDate, 'MM.DD.YYYY-HH:MM');

  expect(getDate(formattedDate)).toEqual(formattedDate);
});

test('getDateAsIsoDate returns correct iso string', () => {
  const nowDate = format(new Date(2019, 1, 1));
  const oldDate = format('2016-05-11T11:00:00.000Z');

  expect(getDateAsIsoDate(testDate, nowDate)).toBe(oldDate);
});

test('formatDistance returns time span', () => {
  const nowDate = format(new Date(2019, 1, 1));
  const oldDate = format(new Date(2018, 1, 1));

  expect(getTimeBetween(nowDate, oldDate)).toBe('about 1 year');
});
