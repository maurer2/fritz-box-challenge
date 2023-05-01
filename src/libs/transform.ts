const getPositionsOfHyphensInString = (value: string): number[] => {
  const dashPositions: number[] = value
    .split('')
    .reduce((total: number[], current: string, index: number) => {
      if (current === '-') {
        total.push(index);
      }
      return total;
    }, []);

  return dashPositions;
};

// add Dash after second dash since powerOnHours and restarts are not separated by a hyphen
const getValueWithFixedPowerOnHoursAndRestarts = (
  value: string,
  positionsOfHyphens: number[],
): string => {
  const dateStartPosition = positionsOfHyphens[1] + 1; // + 1 to get first character after hyphen
  const dateLength = 9;
  const splitPoint = dateStartPosition + dateLength;

  const stringBeforeSplitPoint = value
    .substring(0, splitPoint)
    // string needs to be reversed to remove last occurrence via replace and then unreversed again
    .split('')
    .reverse()
    .join('')
    .replace('-', '') // remove incorrect hyphen to avoid having two dates
    .split('')
    .reverse()
    .join('');
  const stringAfterSplitPoint = value.substring(splitPoint);

  return `${stringBeforeSplitPoint}-${stringAfterSplitPoint}`;
};

const getValueList = (value: string): string[] => {
  const positionsOfHyphensBeforeFix: number[] = getPositionsOfHyphensInString(value);
  const fixedValue: string = getValueWithFixedPowerOnHoursAndRestarts(
    value,
    positionsOfHyphensBeforeFix,
  );
  const valuesAsList: string[] = fixedValue.split('-');

  return valuesAsList;
};

export { getValueList };
