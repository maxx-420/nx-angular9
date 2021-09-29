// 9fbef606107a605d69c0edbcd8029e5d_SYMPHONY
// function to format address

const formatAddress = (address: any) => {
  return `${address?.city}, ${address?.state}, ${address?.country}`;
};

export default formatAddress;
