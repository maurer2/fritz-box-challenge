import { describe, expect, it } from 'vitest';

import { boxValueString, sectionsOfBoxValues } from './box.schema';

describe('boxValueString', () => {
  it('should allow string with correct number of hyphens', () => {
    expect(boxValueString.safeParse('meow-meow-meow-meow-meow-meow-meow-meow-meow-meow').success).toBeTruthy();
  });

  it('should not allow string, that doesn\'t have correct number of hyphens', () => {
    Array.from(Array(sectionsOfBoxValues - 1).keys()).forEach((index) => {
      const value = `meow${'-meow'.repeat(index)}`;
      expect(boxValueString.safeParse(value).success).toBeFalsy();
    });
  });

  it('should not allow string, that has one or more empty value(s) between hyphens', () => {
    expect(boxValueString.safeParse('meow-meow-meow-m-meow-meow-meow-meow-meow').success).toBeFalsy();
    expect(boxValueString.safeParse('meow---meow-meow-meow-meow-meow-meow-meow-meow').success).toBeFalsy();
    expect(boxValueString.safeParse('meow-- -meow-meow-meow-meow-meow-meow-meow-meow').success).toBeFalsy();
  });

  it('should not allow falsy values', () => {
    [false, null, 0, NaN, undefined, ''].forEach((value) => {
      expect(boxValueString.safeParse(value).success).toBeFalsy();
    });
  });
});
