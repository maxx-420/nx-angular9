// 9fbef606107a605d69c0edbcd8029e5d_SYMPHONY
// Account type constants

export const ACCOUNT_TYPE_CONSTANTS = {
  categories: {
    inbound: 'Inbound',
    outbound: 'Outbound',
    movement: 'Movement',
    freight: 'Freight',
    brokerage: 'Brokerage',
  },
  types: {
    managedInbound: 'ManagedInbound',
    nonManagedInbound: 'NonManagedInbound',
    managedOutbound: 'ManagedOutbound',
    nonManagedOutbound: 'NonManagedOutbound',
    managedMovement: 'ManagedMovement',
    freightShipment: 'FreightShipment',
    brokerage: 'Brokerage',
    ucp: 'UCP',
  },
  typesShorthand: {
    managedInbound: 'MI',
    nonManagedInbound: 'NMI',
    managedOutbound: 'MO',
    nonManagedOutbound: 'NMO',
    managedMovement: 'MM',
    freightShipment: 'FS',
    brokerage: 'BRK',
    ucp: 'UCP',
  },
  SHORTHAND_TO_FULL_NAME: {
    MI: 'ManagedInbound',
    NMI: 'NonManagedInbound',
    MO: 'ManagedOutbound',
    NMO: 'NonManagedOutbound',
    MM: 'ManagedMovement',
    FS: 'FreightShipment',
    UCP: 'UCP',
    BRK: 'Brokerage',
  },
  roles: {
    billingAdmin: 'BillingAdmin',
  },
};

export const ACCOUNT_SERVICELINES_CONSTANTS = {
  postSales: 'PS',
  finishedGoods: 'FG',
  health: 'Health',
  hld1: 'HLD1',
  hld2: 'HLD2',
};

export const USER_AUTH_TYPE = {
  lasso: 'LASSO',
  B2CCustomer: 'B2CCustomer',
};

export const ACCOUNT_USER_TYPES = {
  employee: 'employee',
  customer: 'customer',
};
