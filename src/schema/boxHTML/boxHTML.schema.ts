import { z } from 'zod';
import { compile } from 'zod-compiler';

const boxHTMLSchemaUncompiled = z
  .string({
    error: (issue) => (issue.input === undefined ? 'Value is required' : 'Value must be a string'),
  })
  .trim()
  .regex(/<body[^>]*>(.*?)<\/body>/is, 'Body tag is missing')
  // at this point the string is guaranteed to contain a body tag
  .transform((html) => html.match(/<body[^>]*>(.*?)<\/body>/is)![1])
  .refine((value) => value.includes('FRITZ!Box'), {
    message: '"FRITZ!Box" string is missing',
  });

export type BoxHTML = z.infer<typeof boxHTMLSchema>;

export const boxHTMLSchema = compile(boxHTMLSchemaUncompiled);
// export type BoxHTML = z.infer<typeof boxHTMLSchema>; // returns unknown instead of string
