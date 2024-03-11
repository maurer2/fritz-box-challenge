// split by dash
const splitString = (stringValue: string): string[] => stringValue.split('-');

const isEmptyString = (stringValue: string): boolean => Boolean(stringValue.length);

// eslint-disable-next-line max-len
const hasCorrectNumberOfParts = (parts: string | string[], numberOfParts: number): boolean => parts.length === numberOfParts;

// add Dash after second dash
// workaround since powerOnHours and restarts is not separated by a dash
const transformString = (stringValue: string, dashPositions: number[]): string => {
  const dateStartPosition = dashPositions[1] + 1;
  const dateLength = 9;
  const splitPoint = dateStartPosition + dateLength;

  const stringBeforeSplitPoint = stringValue.substring(0, splitPoint);
  const stringAfterSplitPoint = stringValue.substring(splitPoint);

  return `${stringBeforeSplitPoint}-${stringAfterSplitPoint}`;
};

const getDashPositionsInString = (stringValue: string): number[] => {
  const dashPositions: number[] = stringValue
    .split('')
    .reduce((total: number[], current: string, index: number) => {
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
  getDashPositionsInString,
};
