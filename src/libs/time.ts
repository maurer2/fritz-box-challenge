import { format, formatDistance, parseISO } from 'date-fns';
import {
  subHours as subHoursFP,
  subDays as subDaysFP,
  subMonths as subMonthsFP,
  subYears as subYearsFP,
} from 'date-fns/fp';
import { flow } from 'lodash';

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
  const yearString = dateString.substring(7, 10);

  return parseInt(yearString, 10);
};

const getDate = (dateAsIsoDate: string): string => {
  const newDate = format(parseISO(dateAsIsoDate), 'dd.MM.yyyy-HH:MM');

  return newDate;
};

const getDateAsIsoDate = (dateString: string, nowDate: string): string => {
  const hours: number = getHours(dateString);
  const days: number = getDays(dateString);
  const months: number = getMonths(dateString);
  const years: number = getYears(dateString);

  const oldDateISO = parseISO(nowDate, { additionalDigits: 2 });

  const oldDateConverted = flow(
    subHoursFP(hours),
    subDaysFP(days),
    subMonthsFP(months),
    subYearsFP(years),
  )(oldDateISO);

  return format(oldDateConverted, "yyyy-MM-dd'T'HH:mm:ss.SSSxxx");
};

const getTimeBetween = (dateIsoString: string, nowDate: string): string => {
  const time = formatDistance(parseISO(dateIsoString), parseISO(nowDate));

  return time;
};

const getNowDate = (): string => {
  const formattedDate = format(new Date(), "yyyy-MM-dd'T'HH:mm:ss.SSSxxx");

  return formattedDate;
};

export {
  getHours,
  getDays,
  getMonths,
  getYears,
  getDate,
  getDateAsIsoDate,
  getTimeBetween,
  getNowDate,
};
