import type { ZodType, z } from 'zod';
import { ZodError } from 'zod';

// import { boxHTMLSchema } from '../../schema/boxHTML/boxHTML.schema';

// https://github.com/colinhacks/zod#writing-generic-functions
const fetcher = async <T extends ZodType>(url: string, schema: T): Promise<z.infer<T>> => {
  try {
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(response.statusText || `Error fetching from ${url}}`);
    }

    const textContent = await response.text();

    return schema.parse(textContent);
  } catch (error) {
    // if (error instanceof SyntaxError) {
    //   console.warn('Payload error', error);
    //   throw new Error('Payload error', { cause: error });
    // }

    if (error instanceof ZodError) {
      console.warn('Parsing error', error);
      throw new Error('Payload error', { cause: error });
    }

    throw new Error('Unknown error', { cause: error });
  }
};

export default fetcher;
