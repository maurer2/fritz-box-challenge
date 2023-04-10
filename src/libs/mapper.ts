import { fieldsMappings, technologyMapping } from '../constants/mappings';

const mapValueToField = (fieldValue: string, index: number) => {
  const field = fieldsMappings[index];

  if (field === 'technology') {
    const augmentedFieldValue = Object.hasOwn(technologyMapping, fieldValue)
      ? technologyMapping[fieldValue as keyof typeof technologyMapping]
      : fieldValue;

    return {
      [field]: augmentedFieldValue,
    };
  }

  return {
    [field]: fieldValue,
  };
};

const getMappedFields = (fieldValues: typeof fieldsMappings) => {
  console.log(fieldValues);

  // assign key of value by position in array
  const mappedValues = fieldValues.map((fieldValue, index: number) =>
    mapValueToField(fieldValue, index)
  );

  const flattenedValues = Object.assign(...mappedValues);

  return flattenedValues;
};

export { getMappedFields, fieldsMappings, mapValueToField };
