import { format, formatDistance, parseISO } from 'date-fns';
import {
  subHours as subHoursFP,
  subDays as subDaysFP,
  subMonths as subMonthsFP,
  subYears as subYearsFP,
} from 'date-fns/fp';
import { flow } from 'lodash';

import { fieldsMappings, technologyMapping } from '../../constants/mappings';

type FieldsMappings = (typeof fieldsMappings)[number];
type FieldMap = Record<FieldsMappings, string>;

const getHours = (dateString: string): number => {
  const hoursString = dateString.substring(0, 2);

  return parseInt(hoursString, 10);
};

const getDays = (dateString: string): number => {
  const daysString = dateString.substring(2, 4);

  return parseInt(daysString, 10);
};

const getMonths = (dateString: string): number => {
  const monthString = dateString.substring(4, 6);

  return parseInt(monthString, 10);
};

const getYears = (dateString: string): number => {
  const yearString = dateString.substring(6);

  return parseInt(yearString, 10);
};

const getTimeBetweenTwoDates = (dateString: string): string => {
  const nowDate = format(new Date(), "yyyy-MM-dd'T'HH:mm:ss.SSSxxx");
  const time = formatDistance(parseISO(dateString), parseISO(nowDate));

  return time;
};

// calculated production date based on current date - power on hours count
const getApproximateProductionDate = (dateString: string): string => {
  const hours: number = getHours(dateString);
  const days: number = getDays(dateString);
  const months: number = getMonths(dateString);
  const years: number = getYears(dateString);

  const nowDate = format(new Date(), "yyyy-MM-dd'T'HH:mm:ss.SSSxxx");
  const nowDateStringFormatted = parseISO(nowDate, { additionalDigits: 2 });

  const calculatedProductionDate = flow(
    subHoursFP(hours),
    subDaysFP(days),
    subMonthsFP(months),
    subYearsFP(years),
  )(nowDateStringFormatted);

  return format(calculatedProductionDate, "yyyy-MM-dd'T'HH:mm:ss.SSSxxx");
};

export function useGetMappedData(
  fieldValues: string[],
): FieldMap & { age: string; runtime: string } {
  const mappedValuesAsList = fieldValues.flatMap((fieldName, index) => {
    const field = fieldsMappings?.[index];

    if (!field) {
      return [];
    }

    return {
      [field]:
        field === 'technology'
          ? technologyMapping[fieldName as keyof typeof technologyMapping]
          : (fieldName as Omit<FieldsMappings, 'technology'>),
    };
  });

  const mappedValuesAsMap = Object.fromEntries(
    mappedValuesAsList.flatMap((value) => Object.entries(value)),
  ) as FieldMap & { age: string; runtime: string };

  const runtime = mappedValuesAsList?.length
    ? getApproximateProductionDate(mappedValuesAsMap?.powerOnHours)
    : '';
  const age = mappedValuesAsList?.length ? getTimeBetweenTwoDates(runtime) : '';

  mappedValuesAsMap.runtime = runtime;
  mappedValuesAsMap.age = age;

  return mappedValuesAsMap;
}
