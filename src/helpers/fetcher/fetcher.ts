import { ZodError, type ZodType, type z } from 'zod';

// https://zod.dev/library-authors
// https://github.com/colinhacks/zod/issues/4532#issuecomment-2913734406
const fetcher = async <T extends ZodType>(url: string, schema: T): Promise<z.output<T>> => {
  let response: Response;

  try {
    response = await fetch(url);
  } catch (error) {
    throw new Error('Network error', {
      cause: error,
    });
  }

  const data = await response.text().catch(() => null);

  if (!response.ok) {
    throw new Error(`${response.status} - ${response.statusText}`, {
      cause: { status: response.status, data },
    });
  }

  try {
    return schema.parse(data);
  } catch (error) {
    if (error instanceof ZodError) {
      throw new Error('Invalid payload', { cause: error });
    }

    throw error;
  }
};

export default fetcher;
