const splitString = stringValue => stringValue.split('-');

const isEmptyString = stringValue => stringValue.length === 0;

const hasCorrectNumberOfParts = (parts, numberOfParts) => parts.length === numberOfParts;

// add Dash after second dash
// workaround since powerOnHours and restarts is not seperated by a dash
const transformString = (stringValue, dashPositions) => {
  const dateStartPosition = dashPositions[1] + 1;
  const dateLength = 10;
  const splitPoint = dateStartPosition + dateLength;

  const stringBeforeSplitPoint = stringValue.substring(0, splitPoint);
  const stringAfterSplitPoint = stringValue.substring(splitPoint);

  return `${stringBeforeSplitPoint}-${stringAfterSplitPoint}`;
};

const getDashPositonsInString = (stringValue) => {
  const dashPositions = stringValue.split('').reduce((total, current, index) => {
    if (current === '-') {
      total.push(index);
    }
    return total;
  }, []);

  return dashPositions;
};

export {
  splitString,
  isEmptyString,
  hasCorrectNumberOfParts,
  transformString,
  getDashPositonsInString,
};
