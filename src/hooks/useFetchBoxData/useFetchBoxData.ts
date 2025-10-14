import { useQuery, queryOptions } from '@tanstack/react-query';
// import { boxValueString as boxStatusSchema } from '../../schema/box.schema'; // todo fix naming

import fetcher from '../../helpers/fetcher/fetcher';
import { boxHTMLSchema } from '../../schema/boxHTML/boxHTML.schema';

const dateLength = 9;
// add dash after second dash
// power on hours and restarts are not separated by a dash
function addMissingDashes(stringValue: string, dashPositions: number[]): string {
  const dateStartPosition = dashPositions[1] + 1;
  const splitPoint = dateStartPosition + dateLength; // position between date and power in hours

  const stringBeforeSplitPoint = stringValue.substring(0, splitPoint);
  const stringAfterSplitPoint = stringValue.substring(splitPoint);

  const tempStringArray = stringBeforeSplitPoint.split('');
  tempStringArray.splice(-3, 1);
  const stringBeforeSplitPointWithoutLastDash = tempStringArray.join('');

  return `${stringBeforeSplitPointWithoutLastDash}-${stringAfterSplitPoint}`;
}

export const fetchBoxDataQueryOptions = queryOptions({
  queryKey: ['box-data'],
  queryFn: () => fetcher('/box-data', boxHTMLSchema),
  select: (data) => {
    const bodyContent = data.match(/<body[^>]*>(.*?)<\/body>/is)?.[1] ?? '';

    const dashPositions = bodyContent.split('').reduce<number[]>((total, current, index) => {
      if (current === '-') {
        total.push(index);
      }
      return total;
    }, []);

    const stringWithFixedDashPositions = addMissingDashes(bodyContent, dashPositions);
    const boxData = stringWithFixedDashPositions.split('-');

    return boxData;
  },
  staleTime: Infinity,
  gcTime: Infinity,
});

export function useFetchBoxData({ key, url }: { key?: string; url?: string }) {
  const queryResult = useQuery(fetchBoxDataQueryOptions);

  return queryResult;
}
