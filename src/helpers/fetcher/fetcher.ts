import { ZodSchema } from 'zod';

// import { boxHTMLSchema } from '../../schema/boxHTML/boxHTML.schema';

const fetcher = async <T>(url: string, schema: ZodSchema): Promise<T> => {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(response.statusText || `Error fetching from ${url}}`);
  }

  const textContent = response.text();

  return schema.parse(await textContent);
};

export default fetcher;
