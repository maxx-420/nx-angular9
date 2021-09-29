// 9fbef606107a605d69c0edbcd8029e5d_SYMPHONY
// User Access Control constants

import { MODULE_NAMES } from './../constants/global.constant';
import {
  ACCOUNT_SERVICELINES_CONSTANTS,
  ACCOUNT_TYPE_CONSTANTS,
} from './../constants/account-types.constant';

const modules = MODULE_NAMES;
const productLine = {
  brokerage: 'BRK',
  gld: 'GLD',
  hld: 'HLD',
  gff: 'GFF',
};
/**
 * different role
 * SC/SCM:Standard Customer / Supply chain manager
 * CS: Customer Service
 * EXE:  Executives
 *
 */
const roles = {
  standard: 'standarduser',
  customerService: 'customerService',
  executive: 'executive',
};
export const ACCESS_CONTROL_CONFIG = {
  exclusionsKey: 'exclusions',
  accountTypeExclusionKey: 'accountTypeExclusions',
  shipmentTypeExclusionKey: 'shipmentAccountTypeExclusions',
  userGroupTypeExclusionKey: 'userGroupExclusions',

  filterKey: {
    type: 'type',
    accountType: 'accountType',
    templateType: 'templateType',
  },

  modules,
  productLine,

  /**
   * the value ("Billing") comes within the userGroup object of the response. The key ("billing")
   * is the route constant corressponding to the billing service
   */
  userGroupOptions: {
    billingRole: ['ReadOnlyBilling', 'ModifyBilling'],
    adminRole: 'EmployeeAdmin',
  },
  productLineSequence: [productLine.gld, productLine.hld, productLine.gff],
  serviceLineSequence: [
    ACCOUNT_SERVICELINES_CONSTANTS.postSales,
    ACCOUNT_SERVICELINES_CONSTANTS.finishedGoods,
    ACCOUNT_SERVICELINES_CONSTANTS.health,
    ACCOUNT_SERVICELINES_CONSTANTS.hld1,
    ACCOUNT_SERVICELINES_CONSTANTS.hld2,
  ],
  accountTypeSequence: [
    ACCOUNT_TYPE_CONSTANTS.typesShorthand.managedInbound,
    ACCOUNT_TYPE_CONSTANTS.typesShorthand.nonManagedInbound,
    ACCOUNT_TYPE_CONSTANTS.typesShorthand.managedOutbound,
    ACCOUNT_TYPE_CONSTANTS.typesShorthand.nonManagedOutbound,
    ACCOUNT_TYPE_CONSTANTS.typesShorthand.freightShipment,
    ACCOUNT_TYPE_CONSTANTS.typesShorthand.managedMovement,
  ],
  roleTypeSequence: [roles.standard, roles.customerService, roles.executive],
};

export const upsFileNumber = 'upsFileNumber';
export const upsOffice = 'upsOffice';
export const ManagedMovement = 'MM';

export const SHIPMENT_TYPE_CONFIG = {
  productLine: 'productLine',
  accountType: 'accountType',
};
