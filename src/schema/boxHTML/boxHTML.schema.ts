import { z } from 'zod';

const minNumberOfDashes = 9; // without new "language" field

export const boxHTMLSchema = z
  .string({
    error: (issue) =>
      issue.input === undefined ? 'Field must be filled in/out' : 'Field must be a string',
  })
  .trim()
  .regex(/<body[^>]*>(.*?)<\/body>/is, 'Body tag is missing')
  // at this point the string is guaranteed to contain a body tag
  .transform((html) => html.match(/<body[^>]*>(.*?)<\/body>/is)![1])
  .refine((value) => value.includes('FRITZ!Box'), {
    message: '"FRITZ!Box" string is missing',
  })
  .refine(
    (value) => {
      const listOfDashes = value?.match(/-/g) ?? [];

      if (!listOfDashes.length || listOfDashes.length < minNumberOfDashes) {
        return false;
      }
      return true;
    },
    {
      message: 'Structure of body is invalid. There are not enough dashes.',
    },
  );

export type BoxHTML = z.infer<typeof boxHTMLSchema>;
