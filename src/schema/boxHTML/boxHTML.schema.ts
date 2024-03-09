import { z } from 'zod';

export const boxHTMLSchema = z
  .string({
    invalid_type_error: 'field must be a string',
    required_error: 'field must be set',
  })
  .trim()
  .regex(/<body[^>]*>(.*?)<\/body>/is, 'body tag is missing')
  .includes('FRITZ!Box', { message: '"FRITZ!Box" is missing in string' })
  .refine((value) => value.match(/-/g).length >= 9, {
    message: 'string structure is wrong (not enough dashes)',
  });

export type BoxHTML = z.infer<typeof boxHTMLSchema>;
