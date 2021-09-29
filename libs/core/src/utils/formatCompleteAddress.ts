// 9fbef606107a605d69c0edbcd8029e5d_SYMPHONY
// function to format address
/**
 * Formats complete address object to string
 * @param address Address object
 * @returns Complete address as string
 */
const formatCompleteAddress = (address: any) => {
  if (!address) {
    return '';
  }
  return [
    address.line1,
    address.line2,
    address.street,
    address.city,
    address.state,
    address.zipCode,
    address.country,
  ]
    .filter((i: string) => Boolean(i?.trim()))
    .join(', ');
};

export default formatCompleteAddress;
