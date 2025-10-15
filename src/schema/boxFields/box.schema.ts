import { z } from 'zod';

export const sectionsOfBoxValues = 10;

export const boxValueString = z
  .string({
    invalid_type_error: 'value must be a string',
    required_error: 'value must be set',
  })
  .trim()
  .min(1, { message: 'string must not be empty' })
  // number of hyphens
  .refine((value) => (value.match(/-/g)?.length ?? 0) === sectionsOfBoxValues - 1, {
    message: `string must contain exactly ${sectionsOfBoxValues - 1} hyphens`,
  })
  // no empty values between hyphens/ no missing sections leading to empty spaces
  .refine((value) => value.split('-').every((entry) => Boolean(entry.length)), {
    message: 'no section in string must have missing values',
  }) satisfies z.ZodType<string>;
export type BoxValueString = z.infer<typeof boxValueString>;

export const boxValuesMap = z
  .object({
    model: z.string().min(1),
    technology: z.string().min(1), // todo add enum
    powerOnHours: z.date(), // todo rename
    restarts: z.string().min(1),
    firmware: z.string().min(1),
    branding: z.string().min(1),
  })
  .strict();
export type BoxValuesMap = z.infer<typeof boxValuesMap>;
