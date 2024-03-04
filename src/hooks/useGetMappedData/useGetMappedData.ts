import { fieldsMappings2, technologyMapping } from '../../constants/mappings';

type FieldsMappings2 = (typeof fieldsMappings2)[number];

type FieldMap = Record<FieldsMappings2, string>;

export function useGetMappedData(fieldValues: string[]): FieldMap {
  const mappedValuesAsList = fieldValues.flatMap((fieldName, index) => {
    const field = fieldsMappings2?.[index];

    if (!field) {
      return [];
    }

    return {
      [field]: field === 'technology'
        ? technologyMapping[fieldName as keyof typeof technologyMapping]
        : fieldName as Omit<FieldsMappings2, 'technology'>,
    };
  });

  const mappedValuesAsMap = Object.fromEntries(
    mappedValuesAsList.flatMap((value) => Object.entries(value)),
  ) as FieldMap;

  return mappedValuesAsMap;
}
