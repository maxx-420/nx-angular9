// 9fbef606107a605d69c0edbcd8029e5d_SYMPHONY
// function to get end date based on number of days

const getStartDate = (days: number) => {
  const dt = new Date();
  dt.setDate(dt.getDate() - days);
  return dt;
};

export default getStartDate;
