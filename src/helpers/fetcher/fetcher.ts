import { type ZodType, type z } from 'zod';

// https://zod.dev/library-authors
// https://github.com/colinhacks/zod/issues/4532#issuecomment-2913734406
// https://github.com/colinhacks/zod/issues/6060
const fetcher = async <T extends ZodType>(
  url: string,
  schema: T,
  signal?: AbortSignal,
  timeout = 10_000,
): Promise<z.output<T>> => {
  const abortSignal = signal
    ? AbortSignal.any([signal, AbortSignal.timeout(timeout)])
    : AbortSignal.timeout(timeout);

  let response: Response;

  try {
    response = await fetch(url, { signal: abortSignal });
  } catch (error) {
    if (error instanceof DOMException) {
      if (error.name === 'TimeoutError') {
        throw new Error('Request timed out', { cause: error });
      }

      // AbortError
      throw error;
    }
    throw new Error('Network error', { cause: error });
  }

  const data = await response.text().catch(() => null);

  if (!response.ok) {
    throw new Error(`${response.status} - ${response.statusText}`, {
      cause: { status: response.status, data },
    });
  }

  const result = schema.safeParse(data);
  if (!result.success) {
    throw new Error('Invalid payload', { cause: result.error });
  }
  return result.data;
};

export default fetcher;
