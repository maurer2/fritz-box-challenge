import { z } from 'zod';

const minSectionsOfBoxValues = 10; // without new "language" field
const dateLength = 9;

export const boxValueStringSchema = z
  .string({
    error: (issue) => (issue.input === undefined ? 'Value must be set' : 'Value must be a string'),
  })
  // inject a dash between power on hours and restarts as they are not separated by a dash in the raw string
  .transform((bodyContent) => {
    // dash postions are dynamic as indiovidual fields like "technology" can have different lengths
    const dashPositions = bodyContent.split('').reduce((total, current, index) => {
      if (current === '-') {
        total.push(index);
      }
      return total;
    }, [] as number[]);

    const dateStartPosition = dashPositions[1] + 1;
    const splitPoint = dateStartPosition + dateLength; // before power on hours segment starts

    // remove last dash in date part that seperates years from rest of date
    const chars = bodyContent.substring(0, splitPoint).split('').toSpliced(-3, 1);

    // reinsert dash after date segment
    return `${chars.join('')}-${bodyContent.substring(splitPoint)}`;
  })
  // check number of hyphens
  .refine((value) => (value.match(/-/g)?.length ?? 0) >= minSectionsOfBoxValues - 1, {
    error: `String must contain at least ${minSectionsOfBoxValues - 1} hyphens`,
  })
  // check that there are no empty values between hyphens, e.g. no missing sections
  .refine((value) => value.split('-').every((entry) => Boolean(entry.length)), {
    error: 'No section in string must have missing values',
  });

export type BoxValueString = z.infer<typeof boxValueStringSchema>;

export const boxValuesMap = z
  .object({
    model: z.string().min(1),
    technology: z.string().min(1), // todo add enum
    powerOnHours: z.date(),
    restarts: z.string().min(1),
    firmware: z.string().min(1),
    branding: z.string().min(1),
  })
  .strict();
export type BoxValuesMap = z.infer<typeof boxValuesMap>;
