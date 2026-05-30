import { queryOptions } from '@tanstack/react-query';

import fetcher from '../../helpers/fetcher/fetcher';
import { boxHTMLSchema } from '../../schema/boxHTML/boxHTML.schema';
import { boxValueStringSchema } from '../../schema/boxFields/box.schema';

const fields = [
  'model',
  'technology',
  'powerOnHours',
  'restarts',
  'hash 1',
  'hash 2',
  'status',
  'firmware',
  'subfirmware',
  'branding',
  // 'language', // probably
] as const satisfies readonly string[];

const getStatusFieldsFromBox = async () => {
  const bodyContent = await fetcher('/box-data', boxHTMLSchema);

  const bodyContentValidated = boxValueStringSchema.parse(bodyContent);
  const statusFieldsList = bodyContentValidated.split('-');

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
  refetchOnWindowFocus: true,
  refetchOnMount: true,
  refetchOnReconnect: false,
});
