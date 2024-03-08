import { z } from 'zod';

export const boxHTMLSchema = z
  .string({
    invalid_type_error: 'field must be a string',
    required_error: 'field must be set',
  })
  .regex(/<body[^>]*>(.*?)<\/body>/is, 'field has incorrect format');

export type BoxHTML = z.infer<typeof boxHTMLSchema>;
