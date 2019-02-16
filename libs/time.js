import {
  format,
  subHours,
  subDays,
  subMonths,
  subYears,
  distanceInWords,
} from 'date-fns';

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
  const newDate = format(dateAsIsoDate, 'DD.MM.YYYY-HH:MM');

  return newDate;
};

const getDateAsIsoDate = (dateString, nowDate) => {
  const hours = getHours(dateString);
  const days = getDays(dateString);
  const months = getMonths(dateString);
  const years = getYears(dateString);

  let oldDate = nowDate;

  oldDate = subHours(oldDate, hours);
  oldDate = subDays(oldDate, days);
  oldDate = subMonths(oldDate, months);
  oldDate = subYears(oldDate, years);

  return format(oldDate);
};

const getTimeBetween = (dateIsoString, nowDate) => {
  const time = distanceInWords(dateIsoString, nowDate);

  return time;
};

const getNowDate = () => format(new Date());

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
