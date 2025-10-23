import { queryOptions } from '@tanstack/react-query';

import fetcher from '../../helpers/fetcher/fetcher';
import { fields } from '../../constants/mappings';
import { boxHTMLSchema } from '../../schema/boxHTML/boxHTML.schema';

const dateLength = 9;
// add dash after second dash
// power on hours and restarts are not separated by a dash
function addMissingDashBetweenPowerOnHoursAndRestarts(
  stringValue: string,
  dashPositions: number[],
): string {
  const dateStartPosition = dashPositions[1] + 1;
  const splitPoint = dateStartPosition + dateLength; // position between date and power on hours

  const stringBeforeSplitPoint = stringValue.substring(0, splitPoint);
  const stringAfterSplitPoint = stringValue.substring(splitPoint);

  const tempStringArray = stringBeforeSplitPoint.split('');
  tempStringArray.splice(-3, 1);
  const stringBeforeSplitPointWithoutLastDash = tempStringArray.join('');

  return `${stringBeforeSplitPointWithoutLastDash}-${stringAfterSplitPoint}`;
}

const getStatusFieldsFromBox = async () => {
  const boxDataHTML = await fetcher('/box-data', boxHTMLSchema);
  const bodyContent = boxDataHTML.match(/<body[^>]*>(.*?)<\/body>/is)?.[1] ?? '';

  const dashPositions = bodyContent.split('').reduce((total, current, index) => {
    if (current === '-') {
      total.push(index);
    }
    return total;
  }, [] as number[]);

  const bodyContentFixed = addMissingDashBetweenPowerOnHoursAndRestarts(bodyContent, dashPositions);
  const statusFieldsList = bodyContentFixed.split('-');
  if (fields.length !== statusFieldsList.length) {
    throw new Error('Mismatch between expected number of fields and actual fields in html string');
  }

  const fieldMap = Object.fromEntries(
    fields.map(
      (key, index) => [key, statusFieldsList[index]] satisfies [(typeof fields)[number], string],
    ),
  ) as Record<(typeof fields)[number], (typeof statusFieldsList)[number]>;

  return fieldMap;
};

export const getStatusFieldsFromBoxQueryOptions = queryOptions({
  queryKey: ['box-data'],
  queryFn: () => getStatusFieldsFromBox(),
  staleTime: Infinity,
  gcTime: Infinity,
});
