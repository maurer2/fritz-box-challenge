import { z } from 'zod';

export const boxHTMLSchema = z
  .string({
    invalid_type_error: 'field must be a string',
    required_error: 'field must be set',
  })
  .trim()
  .regex(/<body[^>]*>(.*?)<\/body>/is, 'body tag is missing')
  .includes('FRITZ!Box', { message: '"FRITZ!Box" is missing in string' })
  .refine(
    (value) => {
      const listOfDashes = value?.match(/-/g) ?? [];

      if (!listOfDashes.length || listOfDashes.length < 9) {
        return false;
      }
      return true;
    },
    {
      message: 'structure of string is invalid (not enough or too few dashes)',
    },
  );

export type BoxHTML = z.infer<typeof boxHTMLSchema>;
