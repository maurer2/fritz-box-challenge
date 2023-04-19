import { fieldsMappings, technologyMapping } from '../constants/mappings';

type FieldsMappings = typeof fieldsMappings[number];
// type FieldsWithValues = Record<FieldsMappings, string | number>;

// eslint-disable-next-line
const getMappedFields = (fieldValues: string[]) => {
  // assign key of value by position in array
  const mappedValues = fieldValues.map((fieldValue: FieldsMappings, index: number) => {
    const field = fieldsMappings[index];

    return {
      [field]: field === 'technology'
        ? technologyMapping[fieldValue as keyof typeof technologyMapping]
        : fieldValue,
    };
  });

  const mappedValuesAsSingleObject = Object.assign(...mappedValues);

  return mappedValuesAsSingleObject;
};

export { getMappedFields, fieldsMappings };
