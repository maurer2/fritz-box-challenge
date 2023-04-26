import { z } from 'zod';

import { fieldsShown } from '../constants/mappings';

export const sectionsOfBoxValues = 10;

export const boxValueString = z
  .string({
    invalid_type_error: 'value must be a string',
    required_error: 'value must be set',
  })
  .trim()
  .min(1, { message: 'empty string is not a valid value' })
  // number of hyphens
  .refine(
    (value): boolean => (value.match(/-/g)?.length ?? 0) === sectionsOfBoxValues - 1,
    { message: `string must have ${sectionsOfBoxValues - 1} hyphens` },
  )
  // no empty values between hyphens
  .refine(
    (value): boolean => (value.split('-').every((entry) => Boolean(entry.length))),
    { message: 'no section in string must have missing values' },
  ) satisfies z.ZodType<string>;

export const boxValues = z
  .object(
    Object.fromEntries(fieldsShown.map((field) => [z.literal(field), z.string()])),
  ) satisfies z.ZodType<Record<string, string>>;
