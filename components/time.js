const getHours = dateString => dateString.substring(0, 2);

const getDays = dateString => dateString.substring(2, 4);

const getMonths = dateString => dateString.substring(4, 6);

const getYears = dateString => dateString.substring(7, 10);

export {
  getHours,
  getDays,
  getMonths,
  getYears,
};
