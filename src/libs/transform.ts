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

// move hyphen between powerOnHours and restarts as they are not separated by a hyphen
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

const fixFirmware = (value: string, positionsOfHyphens: number[]): string => {
  const startPosition = positionsOfHyphens[6] + 1; // + 1 to get first character after hyphen
  const endPosition = positionsOfHyphens[7];

  const firmwareString = value.substring(startPosition, endPosition);
  const fixedFirmwareString = firmwareString.slice(-3); // firmware is Xxx, e.g. 7.50

  return value.replace(firmwareString, fixedFirmwareString);
};

const getValueList = (value: string): string[] => {
  const positionsOfHyphensBeforeFix: number[] = getPositionsOfHyphensInString(value);
  const valueWithFixedRestartsAndPowerOnHours: string = getValueWithFixedPowerOnHoursAndRestarts(
    value,
    positionsOfHyphensBeforeFix,
  );
  // breaks positionsOfHyphensBeforeFix
  const valueWithFixedFirmware: string = fixFirmware(
    valueWithFixedRestartsAndPowerOnHours,
    positionsOfHyphensBeforeFix,
  );

  const valuesAsList: string[] = valueWithFixedFirmware.split('-');

  return valuesAsList;
};

export { getValueList };
