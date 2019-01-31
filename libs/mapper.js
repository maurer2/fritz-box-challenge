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

const splitString = stringValue => stringValue.split('–');

// have: FRITZ!Box Fon WLAN 7390–B–041711–000121–533176–734744–147902–840604–28179–avm
// want: FRITZ!Box Fon WLAN 7390–B–041711–000-121–533176–734744–147902–840604–28179–avm

// workaround since powerOnHours and restarts is not seperated by a dash
const addDashToString = (stringValue) => {
  const dashPositions = stringValue.split('').reduce((total, current, index) => {
    if (current === '–') {
      total.push(index);
    }
    return total;
  }, []);

  // date starts after second dash
  const dateStartPosition = dashPositions[1] + 1;
  const dateLength = 10;
  const splitPoint = dateStartPosition + dateLength;

  const stringBeforeSplitPoint = stringValue.substring(0, splitPoint);
  const stringAfterSplitPoint = stringValue.substring(splitPoint);

  return `${stringBeforeSplitPoint}-${stringAfterSplitPoint}`;
};

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
  splitString,
  addDashToString,
};
