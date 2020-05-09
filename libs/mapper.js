const fieldsMappings = [
  'model',
  'technology',
  'powerOnHours 1',
  'powerOnHours 2',
  'restarts',
  'hash 1',
  'hash 2',
  'status',
  'firmware',
  'subfirmware',
  'branding',
];

const technologyMapping = {
  A: 'Annex A',
  B: 'Annex B',
  J: 'Annex J',
  Q: 'Annex Q',
  Cable: 'Cable',
};

const mapValueToField = (fieldValue, index) => {
  const field = fieldsMappings[index];

  if (field === 'technology') {
    const augmentedFieldValue = (fieldValue in technologyMapping)
      ? technologyMapping[fieldValue]
      : fieldValue;

    return {
      [field]: augmentedFieldValue,
    };
  }

  return {
    [field]: fieldValue,
  };
};

const flatenArray = (nestedArray) => Array.prototype.concat(...nestedArray);

const flattenMapValues = (nestedValues) => Object.assign(...nestedValues);

const getMappedFields = (fieldValues) => {
  const mappedValues = fieldValues.map((fieldValue, index) => mapValueToField(fieldValue, index));

  const flattenedValues = Object.assign(...mappedValues);

  return flattenedValues;
};

export {
  getMappedFields,
  fieldsMappings,
  flatenArray,
  flattenMapValues,
  mapValueToField,
};
