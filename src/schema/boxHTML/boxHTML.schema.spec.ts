// eslint-disable-next-line import/no-extraneous-dependencies
import { describe, expect, it } from 'vitest';

import { boxHTMLSchema } from './boxHTML.schema';

describe('boxHTMLSchema', () => {
  const oldBodyContent =
    '<html><body>FRITZ!Box 7590 (UI)-B-022100-060121-XXXXXX-XXXXXX-787902-1540757-107893-1und1</body></html>';
  const newBodyContent =
    '<html><body>FRITZ!Box 7590 (UI)-Annex unbekannt-050502-080086-XXXXXX-XXXXXX-787903-1540825-130856-1und1-de</body></html>';

  it('should allow string with language-segment introduced in newer firmware versions', () => {
    const result = boxHTMLSchema.safeParse(newBodyContent);

    expect(result.success).toBeTruthy();
    expect(result.data).toBe(
      'FRITZ!Box 7590 (UI)-Annex unbekannt-050502-080086-XXXXXX-XXXXXX-787903-1540825-130856-1und1-de',
    );
  });

  it('should allow string without language-segment', () => {
    const result = boxHTMLSchema.safeParse(oldBodyContent);

    expect(result.success).toBeTruthy();
    expect(result.data).toBe(
      'FRITZ!Box 7590 (UI)-B-022100-060121-XXXXXX-XXXXXX-787902-1540757-107893-1und1',
    );
  });

  it('should fail if empty', () => {
    expect(boxHTMLSchema.safeParse('').success).toBeFalsy();
  });

  it('should fail if body tag is missing', () => {
    expect(
      boxHTMLSchema.safeParse(
        '<html>FRITZ!Box 7590 (UI)-Annex unbekannt-050502-080086-XXXXXX-XXXXXX-787903-1540825-130856-1und1</html>',
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
