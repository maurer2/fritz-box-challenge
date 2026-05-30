// eslint-disable-next-line import/no-extraneous-dependencies
import { describe, expect, it } from 'vitest';

import { boxValueStringSchema, boxValuesMap } from './box.schema';

describe('boxValueStringSchema', () => {
  const oldBodyFormat =
    'FRITZ!Box 7590 (UI)-Annex unbekannt-050502-080086-XXXXXX-XXXXXX-787903-1540825-130856-1und1';
  const newBodyFormat =
    'FRITZ!Box 7590 (UI)-Annex unbekannt-050502-080086-XXXXXX-XXXXXX-787903-1540825-130856-1und1-de';

  it('should not allow empty string', () => {
    expect(boxValueStringSchema.safeParse('').success).toBeFalsy();
  });

  it('should allow string with minimum number of segments', () => {
    expect(boxValueStringSchema.safeParse(oldBodyFormat).success).toBeTruthy();
  });

  it('should move the dash correctly within the string to correctly separate powerOnHours from restarts', () => {
    const result = boxValueStringSchema.safeParse(oldBodyFormat);

    expect(result.success).toBeTruthy();
    expect(result.data).toBe(
      'FRITZ!Box 7590 (UI)-Annex unbekannt-05050208-0086-XXXXXX-XXXXXX-787903-1540825-130856-1und1',
    );
  });

  it('should allow string with more than the minimum number of segments', () => {
    expect(boxValueStringSchema.safeParse(newBodyFormat).success).toBeTruthy();
  });

  it('should not allow string with fewer than the minimum number of segments', () => {
    expect(
      boxValueStringSchema.safeParse(
        // restarts and part of date missing
        'FRITZ!Box 7590 (UI)-Annex unbekannt-050502-XXXXXX-XXXXXX-787903-1540825-130856-1und1',
      ).success,
    ).toBeFalsy();
  });

  it('should not allow string with empty sections', () => {
    expect(
      boxValueStringSchema.safeParse(
        'FRITZ!Box 7590 (UI)-Annex unbekannt-050502-080086-XXXXXX-XXXXXX--1540825-130856-1und1',
      ).success,
    ).toBeFalsy();
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
