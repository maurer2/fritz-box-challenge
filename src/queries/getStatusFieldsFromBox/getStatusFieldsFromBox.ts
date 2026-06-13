import { queryOptions } from '@tanstack/react-query';

import fetcher from '../../helpers/fetcher/fetcher';
import { boxHTMLSchema } from '../../schema/boxHTML/boxHTML.schema';
import { boxFieldsSchema } from '../../schema/boxFields/boxFields.schema';

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
  'language',
] as const satisfies readonly string[];
type Fields = (typeof fields)[number];

const getStatusFieldsFromBox = async (signal?: AbortSignal) => {
  const bodyContent = await fetcher('/box-data', boxHTMLSchema, signal);

  const statusFieldsList = boxFieldsSchema.parse(bodyContent);

  const fieldEntries = fields.map((field, index) => [
    field,
    statusFieldsList.at(index) ?? null,
  ]) satisfies [Fields, string | null][];
  const fieldMap = Object.fromEntries(fieldEntries) as Record<
    (typeof fieldEntries)[number][0],
    (typeof fieldEntries)[number][1]
  >;

  return fieldMap;
};

export const getStatusFieldsFromBoxQueryOptions = queryOptions({
  queryKey: ['box-data'],
  queryFn: ({ signal }) => getStatusFieldsFromBox(signal),
  refetchOnWindowFocus: true,
  refetchOnMount: true,
  refetchOnReconnect: false,
});
