import { fieldsMappings, technologyMapping } from '../constants/mappings';

type FieldsMappings = (typeof fieldsMappings)[number];

export const getMappedFields = (fieldValues: string[]) => {
  // assign key of value by position in array
  const mappedValues = fieldValues.map((fieldValue: FieldsMappings, index: number) => {
    const field = fieldsMappings[index];

    return {
      [field]:
        field === 'technology'
          ? technologyMapping[fieldValue as keyof typeof technologyMapping]
          : fieldValue,
    };
  });

  const mappedValuesAsSingleObject = Object.assign(...mappedValues);

  return mappedValuesAsSingleObject;
};

export const getKeyValueMapOfBoxValues = (fieldValues: string[]) => {
  const mappedValuesAsList = fieldValues.flatMap((fieldName: FieldsMappings, index: number) => {
    const field = fieldsMappings?.[index];

    if (!field) {
      return [];
    }

    return {
      [field]: field === 'technology'
        ? technologyMapping[fieldName as keyof typeof technologyMapping]
        : fieldName,
    };
  });

  const mappedValuesAsMap = Object.fromEntries(
    mappedValuesAsList.flatMap((value) => Object.entries(value)),
  );

  return mappedValuesAsMap;
};

export { fieldsMappings };
