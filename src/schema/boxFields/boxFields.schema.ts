import { z } from 'zod';
import { compile } from 'zod-compiler';

const minSectionsOfBoxValues = 10; // 11 with language field
const dateLength = 9;

const boxFieldsSchemaUncompiled = z
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
  // split up into segments
  .transform((value) => value.split('-'))
  // check number of segments
  .refine((value) => value.length >= minSectionsOfBoxValues, {
    error: `Array must have at least ${minSectionsOfBoxValues} segments`,
  })
  // check that there are no empty segments
  .refine((value) => value.every((entry) => entry.length > 0), {
    error: 'No segment in array must be empty',
  });

export const boxFieldsSchema = compile(boxFieldsSchemaUncompiled);
