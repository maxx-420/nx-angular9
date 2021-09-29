// 9fbef606107a605d69c0edbcd8029e5d_SYMPHONY
// compare method to sort dailySummary on the basis of 'date' attribute

const compareDates = (a, b) => {
  const dateA = new Date(a.date);
  const dateB = new Date(b.date);
  if (dateA > dateB) {
    return 1;
  } else if (dateA < dateB) {
    return -1;
  } else {
    return 0;
  }
};

export default compareDates;
