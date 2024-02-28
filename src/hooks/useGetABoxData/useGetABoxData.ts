import { useQuery } from '@tanstack/react-query';

import { boxValueString as boxStatusSchema } from '../../schema/box.schema'; // todo fix naming
import fetcher from '../../helpers/fetcher/fetcher';

export function useGetData({ key, url }: { key: string; url: string }) {
  const queryResult = useQuery({
    queryKey: [key],
    queryFn: () => fetcher(url),
  });

  // todo schema validation

  return queryResult;
}
