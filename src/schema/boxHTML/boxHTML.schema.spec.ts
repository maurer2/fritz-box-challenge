// eslint-disable-next-line import/no-extraneous-dependencies
import { describe, expect, it } from 'vitest';

import { boxHTMLSchema } from './boxHTML.schema';

describe('boxHTMLSchema', () => {
  it('should allow string with language-segment introduced in newer firmware versions', () => {
    expect(
      boxHTMLSchema.safeParse(
        '<html><body>FRITZ!Box 7590 (UI)-Annex unbekannt-050502-080086-XXXXXX-XXXXXX-787903-1540825-130856-1und1-de</body></html>',
      ).success,
    ).toBeTruthy();
  });

  it('should allow string without missing language-segment', () => {
    expect(
      boxHTMLSchema.safeParse(
        '<html><body>FRITZ!Box 7590 (UI)-B-022100-060121-XXXXXX-XXXXXX-787902-1540757-107893-1und1</body></html>',
      ).success,
    ).toBeTruthy();
  });

  it('should fail if any of the segments are missing, e.g. number of dashes is below limit', () => {
    expect(
      boxHTMLSchema.safeParse(
        '<html><body>FRITZ!Box 7590 (UI)-Annex unbekannt-050502-080086-XXXXXX-XXXXXX-787903-1540825-130856</body></html>',
      ).success,
    ).toBeFalsy();
  });

  it('should fail if body tag is missing', () => {
    expect(
      boxHTMLSchema.safeParse(
        'FRITZ!Box 7590 (UI)-Annex unbekannt-050502-080086-XXXXXX-XXXXXX-787903-1540825-130856-1und1',
      ).success,
    ).toBeFalsy();
  });

  it('should fail if "FRITZ!Box" string is missing', () => {
    expect(
      boxHTMLSchema.safeParse(
        '<html><body>7590 (UI)-Annex unbekannt-050502-080086-XXXXXX-XXXXXX-787903-1540825-130856-1und1</body></html>',
      ).success,
    ).toBeFalsy();
  });
});
