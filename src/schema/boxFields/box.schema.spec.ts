// eslint-disable-next-line import/no-extraneous-dependencies
import { describe, expect, it } from 'vitest';

import { boxValueStringSchema, boxValuesMap } from './box.schema';

const oldBodyFormat =
  'FRITZ!Box 7590 (UI)-Annex unbekannt-050502-080086-XXXXXX-XXXXXX-787903-1540825-130856-1und1';
const newBodyFormat =
  'FRITZ!Box 7590 (UI)-Annex unbekannt-050502-080086-XXXXXX-XXXXXX-787903-1540825-130856-1und1-de';

describe('boxValueStringSchema', () => {
  it('should allow body string with minimum number of segments', () => {
    expect(boxValueStringSchema.safeParse(oldBodyFormat).success).toBeTruthy();
  });

  it('should allow body string with more than the minimum number of segments', () => {
    expect(boxValueStringSchema.safeParse(newBodyFormat).success).toBeTruthy();
  });

  it('should not allow body string with fewer than the minimum number of segments', () => {
    expect(
      boxValueStringSchema.safeParse(
        // restarts and part of date missing
        'FRITZ!Box 7590 (UI)-Annex unbekannt-050502-XXXXXX-XXXXXX-787903-1540825-130856-1und1',
      ).success,
    ).toBeFalsy();
  });

  it('should not allow body string with empty sections', () => {
    expect(
      boxValueStringSchema.safeParse(
        'FRITZ!Box 7590 (UI)-Annex unbekannt-050502-080086-XXXXXX-XXXXXX--1540825-130856-1und1',
      ).success,
    ).toBeFalsy();
  });

  it('should not allow falsy values', () => {
    [false, null, 0, NaN, undefined, ''].forEach((value) => {
      expect(boxValueStringSchema.safeParse(value).success).toBeFalsy();
    });
  });
});

describe('boxValuesMap', () => {
  it('should contain all object keys', () => {
    expect(
      boxValuesMap.safeParse({
        model: 'Model',
        technology: 'Technology',
        restarts: 'Restarts',
        firmware: 'Firmware',
        branding: 'Branding',
        powerOnHours: new Date(),
      }).success,
    ).toBeTruthy();
  });

  it('should fail if one or more keys is missing', () => {
    expect(
      boxValuesMap.safeParse({
        model: 'Model',
      }).success,
    ).toBeFalsy();
  });

  it('should fail if one or more values have a mismatching type', () => {
    expect(
      boxValuesMap.safeParse({
        model: 0,
        technology: 'Technology',
        restarts: 'Restarts',
        firmware: 'Firmware',
        branding: 'Branding',
        powerOnHours: new Date(),
      }).success,
    ).toBeFalsy();
  });
});
