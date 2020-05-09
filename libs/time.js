import {
  format,
  formatDistance,
  parseISO,
} from 'date-fns';
import {
  subHours as subHoursFP,
  subDays as subDaysFP,
  subMonths as subMonthsFP,
  subYears as subYearsFP,
} from 'date-fns/fp';

import { flow } from 'lodash';

const getHours = (dateString) => {
  const hoursString = dateString.substring(0, 2);

  return parseInt(hoursString, 10);
};

const getDays = (dateString) => {
  const daysString = dateString.substring(2, 4);

  return parseInt(daysString, 10);
};

const getMonths = (dateString) => {
  const monthString = dateString.substring(4, 6);

  return parseInt(monthString, 10);
};

const getYears = (dateString) => {
  const yearString = dateString.substring(7, 10);

  return parseInt(yearString, 10);
};

const getDate = (dateAsIsoDate) => {
  const newDate = format(parseISO(dateAsIsoDate), 'dd.MM.yyyy-HH:MM');

  return newDate;
};

const getDateAsIsoDate = (dateString, nowDate) => {
  const hours = getHours(dateString);
  const days = getDays(dateString);
  const months = getMonths(dateString);
  const years = getYears(dateString);

  const oldDateISO = parseISO(nowDate, { additionalDigits: 2 });

  const oldDateConverted = flow(
    subHoursFP(hours),
    subDaysFP(days),
    subMonthsFP(months),
    subYearsFP(years),
  )(oldDateISO);

  return format(oldDateConverted, "yyyy-MM-dd'T'HH:mm:ss.SSSxxx");
};

const getTimeBetween = (dateIsoString, nowDate) => {
  const time = formatDistance(parseISO(dateIsoString), parseISO(nowDate));

  return time;
};

const getNowDate = () => {
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
