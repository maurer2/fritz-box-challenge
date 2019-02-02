const fieldsMappings = [
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
];

const mapValueToField = (fieldValue, index) => ({ [fieldsMappings[index]]: fieldValue });

const flatenArray = nestedArray => Array.prototype.concat(...nestedArray);

const flattenMapValues = nestedValues => Object.assign(...nestedValues);

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
