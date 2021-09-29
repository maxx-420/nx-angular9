// 9fbef606107a605d69c0edbcd8029e5d_SYMPHONY
// compare method to sort milestones on the basis of 'order' attribute

const compareMilestonesBasedOnOrder = (a, b) => {
  if (a.order < b.order) {
    return -1;
  } else if (a.order > b.order) {
    return 1;
  } else {
    return 0;
  }
};

export default compareMilestonesBasedOnOrder;
