// 9fbef606107a605d69c0edbcd8029e5d_SYMPHONY

export const KEY_TEMPLATE = {
  /**
   *    this template is used when have more than one account type,
   * and one of them is managed movement
   *     `PL@SL@AT/ST@ROLE`, 'PL@*@AT/ST@ROLE'  two roles added for demonstration purpose only,
   * when ROLE combination can be updated as per story requirement.
   * (low index have hiegher priority) e.g PL@SL@AT/ST@ ROLE have heigher priority than PL@*@AT/ST@ ROLE
   */
  multipleAccWithMM: [
    `PL@SL@AT/ST@ROLE`,
    'PL@SL@AT/ST',
    'PL@*@AT/ST',
    'PL@SL@*_MM',
    'PL@*@*_MM',
    'PL@SL@*',
    'PL@*@*',
  ],
  // this template is used for shipments Details Page,
  // where we send shipment type to get current field mapping function
  shptDets: ['PL@SL@AT/ST', 'PL@*@AT/ST', 'PL@SL@*', 'PL@*@*', '*@*@AT/ST'],
  /**
   * this is used for all other default cases
   *   `PL@SL@AT/ST@ROLE`, 'PL@*@AT/ST@ROLE'  two roles added for demonstration purpose only,
   * when ROLE combination can be updated as per story requirement.
   * (low index have hiegher priority) e.g PL@SL@AT/ST@ ROLE have heigher priority than PL@*@AT/ST@ ROLE
   */
  default: [
    'PL@SL@AT/ST@ROLE',
    'PL@SL@AT/ST',
    'PL@*@AT/ST',
    'PL@SL@*',
    'PL@*@*',
  ],
};
export const DEFAULT_SERVICE_LINE_GFF = 'GFF';
export const PRODUCT_LINE = 'PL';
export const SERVICE_LINE = 'SL';
export const ACCOUNT_SHIPMENT_TYPE = 'AT/ST';
export const ROLE_TYPE = 'ROLE';
