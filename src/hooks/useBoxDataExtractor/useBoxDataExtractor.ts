const dateLength = 9;

// add dash after second dash
// workaround since powerOnHours and restarts are not separated by a dash
function createValueStringWithDashes(stringValue: string, dashPositions: number[]): string {
  const dateStartPosition = dashPositions[1] + 1;
  const splitPoint = dateStartPosition + dateLength;

  const stringBeforeSplitPoint = stringValue.substring(0, splitPoint);
  const stringAfterSplitPoint = stringValue.substring(splitPoint);

  const stringBeforeSplitPointWithoutLastDash = stringBeforeSplitPoint
    .substring(0, stringBeforeSplitPoint.length - 3) + stringBeforeSplitPoint
    .substring(stringBeforeSplitPoint.length - 2);

  return `${stringBeforeSplitPointWithoutLastDash}-${stringAfterSplitPoint}`;
}

export function useBoxDataExtractor(htmlString: string): string[] {
  if (!htmlString?.length) {
    return [];
  }

  const dashPositions = htmlString
    .split('')
    .reduce((total, current, index) => {
      if (current === '-') {
        total.push(index);
      }
      return total;
    }, [] as number[]);

  const stringWithDashes = createValueStringWithDashes(htmlString, dashPositions);
  const valuesList = stringWithDashes.split('-');

  return valuesList;
}
