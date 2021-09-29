// 9fbef606107a605d69c0edbcd8029e5d_SYMPHONY
// function to format address

/**
 * Formats Address for Contact Section
 * @param address address object
 * @returns Complete adress as string
 */
const formatAddressContactSection = (address: any) => {
  if (!address) {
    return '';
  }
  return [
    address.street,
    address.city,
    address.stateProvince,
    address.postalCode,
    address.country,
    address.unloc,
  ]
    .filter((i: string) => Boolean(i?.trim()))
    .join(', ');
};

export default formatAddressContactSection;
