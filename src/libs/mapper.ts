import { fieldsMappings, technologyMapping } from '../src/constants/mappings';

const mapValueToField = (fieldValue: string, index: number) => {
  const field = fieldsMappings[index];

  if (field === 'technology') {
    const augmentedFieldValue =
      fieldValue in technologyMapping ? technologyMapping[fieldValue] : fieldValue;

    return {
      [field]: augmentedFieldValue,
    };
  }

  return {
    [field]: fieldValue,
  };
};

const flattenMapValues = (nestedValues: any) => Object.assign(...nestedValues);

const getMappedFields = (fieldValues: typeof fieldsMappings) => {
  const mappedValues = fieldValues.map((fieldValue, index: number) =>
    mapValueToField(fieldValue, index)
  );

  const flattenedValues = Object.assign(...mappedValues);

  return flattenedValues;
};

export { getMappedFields, fieldsMappings, flattenMapValues, mapValueToField };
