import { z } from 'zod';

export const boxHTMLSchema = z
  .string({
    error: (issue) =>
      issue.input === undefined ? 'Field must be filled in/out' : 'Field must be a string',
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
      message: 'Structure of body is invalid. There are not enough or too few dashes.',
    },
  );

export type BoxHTML = z.infer<typeof boxHTMLSchema>;
