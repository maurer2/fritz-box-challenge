import * as z from 'zod';

const boxHTMLSchemaUncompiledSchema = z
  .string({
    error: (issue) => (issue.input === undefined ? 'Value is required' : 'Value must be a string'),
  })
  .trim()
  .transform((html, ctx) => {
    const match = html.match(/<body[^>]*>(.*?)<\/body>/isu);
    if (!match) {
      ctx.issues.push({ code: 'custom', message: 'Body tag is missing', input: html });
      // https://zod.dev/api?id=transforms#transforms
      return z.NEVER;
    }
    return match[1];
  })
  .refine((value) => value.includes('FRITZ!Box'), {
    error: '"FRITZ!Box" string is missing',
  });

export const boxHTMLSchema = z.compile(boxHTMLSchemaUncompiledSchema);

export type BoxHTML = z.output<typeof boxHTMLSchema>;
