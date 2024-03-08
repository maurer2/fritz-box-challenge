const dateLength = 9;

// add dash after second dash
// power on hours  and restarts are not separated by a dash
function addDashBetweenDateAndRestarts(stringValue: string, dashPositions: number[]): string {
  const dateStartPosition = dashPositions[1] + 1;
  const splitPoint = dateStartPosition + dateLength; // position between date and power in hours

  const stringBeforeSplitPoint = stringValue.substring(0, splitPoint);
  const stringAfterSplitPoint = stringValue.substring(splitPoint);

  const tempStringArray = stringBeforeSplitPoint.split('');
  tempStringArray.splice(-3, 1);
  const stringBeforeSplitPointWithoutLastDash = tempStringArray.join('');

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

  const stringWithFixedDashPositions = addDashBetweenDateAndRestarts(htmlString, dashPositions);
  const valuesList = stringWithFixedDashPositions.split('-');

  return valuesList;
}
