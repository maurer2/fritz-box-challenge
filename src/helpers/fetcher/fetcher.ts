import { ZodType, z } from 'zod';

// import { boxHTMLSchema } from '../../schema/boxHTML/boxHTML.schema';

// https://github.com/colinhacks/zod#writing-generic-functions
const fetcher = async <T extends ZodType>(url: string, schema: T): Promise<z.infer<T>> => {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(response.statusText || `Error fetching from ${url}}`);
  }

  const textContent = await response.text();

  return schema.parse(textContent);
};

export default fetcher;
