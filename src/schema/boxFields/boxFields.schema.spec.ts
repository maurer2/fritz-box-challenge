import { describe, expect, it } from 'vitest';

import { boxFieldsSchema } from './boxFields.schema';

describe('boxFieldsSchema', () => {
  const oldBodyFormat =
    'FRITZ!Box 7590 (UI)-Annex unbekannt-050502-080086-XXXXXX-XXXXXX-787903-1540825-130856-1und1';
  const newBodyFormat =
    'FRITZ!Box 7590 (UI)-Annex unbekannt-050502-080086-XXXXXX-XXXXXX-787903-1540825-130856-1und1-de';

  it('should not allow empty string', () => {
    expect(boxFieldsSchema.safeParse('').success).toBeFalsy();
  });

  it('should allow string with minimum number of segments', () => {
    expect(boxFieldsSchema.safeParse(oldBodyFormat).success).toBeTruthy();
  });

  it('should move the hyphen correctly and split up correctly powerOnHours and restarts - old format', () => {
    const result = boxFieldsSchema.safeParse(oldBodyFormat);

    expect(result.success).toBeTruthy();
    expect(result.data).toEqual([
      'FRITZ!Box 7590 (UI)',
      'Annex unbekannt',
      '05050208',
      '0086',
      'XXXXXX',
      'XXXXXX',
      '787903',
      '1540825',
      '130856',
      '1und1',
    ]);
  });

  it('should move the hyphen correctly and split up correctly powerOnHours and restarts - new format', () => {
    const result = boxFieldsSchema.safeParse(newBodyFormat);

    expect(result.success).toBeTruthy();
    expect(result.data).toEqual([
      'FRITZ!Box 7590 (UI)',
      'Annex unbekannt',
      '05050208',
      '0086',
      'XXXXXX',
      'XXXXXX',
      '787903',
      '1540825',
      '130856',
      '1und1',
      'de',
    ]);
  });

  it('should allow string with more than the minimum number of segments', () => {
    expect(boxFieldsSchema.safeParse(newBodyFormat).success).toBeTruthy();
  });

  it('should not allow string with fewer than the minimum number of segments', () => {
    expect(
      boxFieldsSchema.safeParse(
        // restarts and part of date missing
        'FRITZ!Box 7590 (UI)-Annex unbekannt-050502-XXXXXX-XXXXXX-787903-1540825-130856-1und1',
      ).success,
    ).toBeFalsy();
  });

  it('should not allow string with empty sections', () => {
    expect(
      boxFieldsSchema.safeParse(
        'FRITZ!Box 7590 (UI)-Annex unbekannt-050502-080086-XXXXXX-XXXXXX--1540825-130856-1und1',
      ).success,
    ).toBeFalsy();
  });
});
