import { z } from 'zod';

export const minSectionsOfBoxValues = 10;

export const boxValueStringSchema = z
  .string({
    error: (issue) => (issue.input === undefined ? 'Value must be set' : 'Value must be a string'),
  })
  .trim()
  .min(1, { error: 'String must not be empty' })
  // number of hyphens
  .refine((value) => (value.match(/-/g)?.length ?? 0) >= minSectionsOfBoxValues - 1, {
    error: `String must contain at least ${minSectionsOfBoxValues - 1} hyphens`,
  })
  // no empty values between hyphens/ no missing sections leading to empty spaces
  .refine((value) => value.split('-').every((entry) => Boolean(entry.length)), {
    error: 'No section in string must have missing values',
  }) satisfies z.ZodType<string>;
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
