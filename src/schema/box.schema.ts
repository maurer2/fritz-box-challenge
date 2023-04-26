import { z } from 'zod';

export const sectionsOfBoxValues = 10;

export const boxValueString = z
  .string({
    invalid_type_error: 'value must be a string',
    required_error: 'value must be set',
  })
  .trim()
  .min(1, { message: 'empty string is not a valid value' })
  .refine(
    (value: string): boolean => (value.match(/-/g)?.length ?? 0) === sectionsOfBoxValues - 1,
    { message: `string must have ${sectionsOfBoxValues - 1} dashes` },
  ) satisfies z.ZodType<string>;

export const boxValues = z.object({
  test: z.string(),
  // todo object keys
}) satisfies z.ZodType<Record<string, unknown>>;
