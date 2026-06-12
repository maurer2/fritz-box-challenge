import { z } from 'zod';

const minSectionsOfBoxValues = 9; // without new "language" field
const dateLength = 9;

export const boxValueStringSchema = z
  .string({
    error: (issue) => (issue.input === undefined ? 'Value is required' : 'Value must be a string'),
  })
  // inject a hyphen between power on hours and restarts as they are not separated by a hyphen in the raw string
  .transform((bodyContent) => {
    // hyphen positions are dynamic as individual fields like "technology" can have different lengths
    const hyphenPositions = bodyContent.split('').reduce((total, current, index) => {
      if (current === '-') {
        total.push(index);
      }
      return total;
    }, [] as number[]);

    const dateStartPosition = hyphenPositions[1] + 1;
    const splitPoint = dateStartPosition + dateLength; // before power on hours segment starts

    const newBodyContent = bodyContent
      .split('')
      // remove last hyphen in date segment that separates years from rest of date
      .toSpliced(splitPoint - 3, 1)
      // reinsert hyphen after date segment; -1 because of the removed hyphen
      .toSpliced(splitPoint - 1, 0, '-')
      .join('');

    return newBodyContent;
  })
  // check number of hyphens
  .refine((value) => (value.match(/-/g)?.length ?? 0) >= minSectionsOfBoxValues, {
    error: `String must contain at least ${minSectionsOfBoxValues} hyphens`,
  })
  // check that there are no empty values between hyphens, e.g. no missing sections
  .refine((value) => value.split('-').every((entry) => Boolean(entry.length)), {
    error: 'No section in string must have missing values',
  });
