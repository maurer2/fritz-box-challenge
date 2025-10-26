import { ZodError, type ZodType, type z } from 'zod';

// https://github.com/colinhacks/zod#writing-generic-functions
const fetcher = async <T extends ZodType>(url: string, schema: T): Promise<z.infer<T>> => {
  try {
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(
        `${response.status.toString()} ${response.statusText} ` || `HTTP error ${url}}`,
      );
    }

    const textContent = await response.text();

    return schema.parse(textContent);
  } catch (error) {
    if (!Error.isError(error)) {
      console.warn(`Unknown error when trying to fetch "${url}"`);
      throw new Error('Unknown error');
    }

    if (error instanceof ZodError) {
      console.warn('Schema parsing error', error);
      throw new Error('Schema parsing error', { cause: error });
    }

    console.warn(`Error fetching "${url}"`);
    throw error;
  }
};

export default fetcher;
