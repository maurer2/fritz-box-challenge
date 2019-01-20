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

export {
  getHours,
  getDays,
  getMonths,
  getYears,
};
