import { format, formatDistance, parseISO, isValid } from 'date-fns';
import {
  subHours as subHoursFP,
  subDays as subDaysFP,
  subMonths as subMonthsFP,
  subYears as subYearsFP,
} from 'date-fns/fp';
import { flow } from 'lodash';

import { fields, technologyMapping, type FieldValueMap } from '../../constants/mappings';

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

// const relativeTimeFormatter = new Intl.RelativeTimeFormat('en-GB', { style: 'long' });

const getTimeBetweenTwoDates = (dateString: string): string => {
  const nowDate = format(new Date(), "yyyy-MM-dd'T'HH:mm:ss.SSSxxx");
  const time = formatDistance(parseISO(dateString), parseISO(nowDate));

  // const days = differenceInDays(parseISO(dateString), parseISO(nowDate));

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

export function useGetMappedData(fieldValues: string[]): FieldValueMap {
  const mappedValuesAsList = fieldValues.map((fieldValue, index) => {
    const currentFieldName = fields?.[index];

    switch (currentFieldName) {
      case 'branding':
      case 'hash 1':
      case 'hash 2':
      case 'model':
      case 'subfirmware':
      case 'status': {
        return {
          [currentFieldName]: fieldValue,
        };
      }
      case 'technology': {
        return {
          technology: technologyMapping[fieldValue as keyof typeof technologyMapping],
        };
      }
      case 'restarts': {
        // https://www.ip-phone-forum.de/threads/servicecode-der-fritzbox.310849/
        // https://www.ip-phone-forum.de/threads/was-wird-beim-system-status-angezeigt.138546/
        // todo: investigate calculation changes in fritz os 8+
        const majorValue = fieldValue.substring(0, 2);
        const minorValue = fieldValue.substring(2);

        const calculatedRestarts = parseInt(majorValue, 10) * 32 + parseInt(minorValue, 10);
        const calculatedRestartsFormatted = calculatedRestarts.toString().padStart(4, '0');

        return {
          restarts: calculatedRestartsFormatted,
        };
      }
      case 'firmware': {
        return {
          firmware: `${fieldValue.slice(-3, -2)}.${fieldValue.slice(-2)}`,
        };
      }
      case 'powerOnHours': {
        const guesstimateProductionDate = getApproximateProductionDate(fieldValue);
        const guesstimateProductionDateAsDate = parseISO(guesstimateProductionDate);
        const elapsedTime = getTimeBetweenTwoDates(guesstimateProductionDate);

        return {
          // powerOnHours: isValid(dateParsed) ? format(dateParsed, 'dd/MM/yyyy-HH:MM') : '-'
          powerOnHours: isValid(guesstimateProductionDateAsDate) ? elapsedTime : '-',
        };
      }
      default: {
        return currentFieldName satisfies never; // ts error if switch case is not exhaustive
      }
    }
  });

  const mappedValuesAsMap: FieldValueMap = Object.assign({}, ...mappedValuesAsList);

  return mappedValuesAsMap;
}
