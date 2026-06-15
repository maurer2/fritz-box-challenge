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
type FieldsMap = Map<Fields, string>;

const getStatusFieldsFromBox = async (signal?: AbortSignal): Promise<FieldsMap> => {
  const bodyContent = await fetcher('/box-data', boxHTMLSchema, signal);

  const fieldsResult = boxFieldsSchema.safeParse(bodyContent);
  if (!fieldsResult.success) {
    throw new Error('Invalid fields', { cause: fieldsResult.error });
  }
  const fieldEntries = fields
    .map((field, index) => [field, fieldsResult.data.at(index)] as const)
    .filter((entry): entry is readonly [Fields, string] => entry[1] !== undefined);

  return new Map<Fields, string>(fieldEntries);
};

export const getStatusFieldsFromBoxQueryOptions = queryOptions({
  queryKey: ['box-data'],
  queryFn: ({ signal }) => getStatusFieldsFromBox(signal),
  refetchOnWindowFocus: true,
  refetchOnMount: true,
  refetchOnReconnect: false,
});
