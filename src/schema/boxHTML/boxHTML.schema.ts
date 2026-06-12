import { z } from 'zod';

export const boxHTMLSchema = z
  .string({
    error: (issue) =>
      issue.input === undefined ? 'Field is required' : 'Field must be a string',
  })
  .trim()
  .regex(/<body[^>]*>(.*?)<\/body>/is, 'Body tag is missing')
  // at this point the string is guaranteed to contain a body tag
  .transform((html) => html.match(/<body[^>]*>(.*?)<\/body>/is)![1])
  .refine((value) => value.includes('FRITZ!Box'), {
    message: '"FRITZ!Box" string is missing',
  });

export type BoxHTML = z.infer<typeof boxHTMLSchema>;
