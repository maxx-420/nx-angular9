// 9fbef606107a605d69c0edbcd8029e5d_SYMPHONY
// Access control Utility

import {
  ACCESS_CONTROL_CONFIG,
  SHIPMENT_TYPE_CONFIG,
} from '../global-config/access-control.config';
import {
  ACCOUNT_SERVICELINES_CONSTANTS,
  ACCOUNT_TYPE_CONSTANTS,
  INCLUSION_PAGE_KEYS,
  SHIPMENT_TYPE,
} from '../constants';
import {
  ACCOUNT_SHIPMENT_TYPE,
  DEFAULT_SERVICE_LINE_GFF,
  KEY_TEMPLATE,
  PRODUCT_LINE,
  ROLE_TYPE,
  SERVICE_LINE,
} from '../constants/exclusions-mapping-key.constants';
import { ICompanyDetails } from '../model/interfaces/ICompanyDetails';

import { SessionStorageUtility } from './sessionStorage';
import { default as InclusionUtility } from './inclusion/inclusion-util';
import { default as CommonUtility } from './.././utils/commonUtil';
import { SHIPMENT_TYPES_SHORTHAND } from './../constants/shipment-types.constant';

export const AccessControlUtility = {
  /**
   * Fetches the restrictions list for an exclusion key
   * @param exclusionType: Its value can be 'accountTypeExclusions', 'shipmentAccountTypeExclusions' or 'usergroupExclusions'
   * @param variationType: It is used for only shipment type exclusions.  For other exclusions, pass null.
   * Possible values are - 'ManagedInbound', 'ManagedOutbound', 'NonManagedInbound', 'NonManagedOutbound'.
   * @param module: Name of the module name (Inbound, Outbound, Warehouse, Billing etc.) to fetch restrictions.
   * It is used only for account type and user type exclusions as of now. Pass null for shipment type exclusions
   * @param exclusionTypeKey: For ShipmentTypeExclusion : we are using accountType for GLD/HLD and templateType for GFF
   *  For accountTypeExclusionType list we are using ACCESS_CONTROL_CONFIG.filterKey.type
   */
  getExclusionsList(
    exclusionType,
    variationType,
    module,
    exclusionTypeKey = ACCESS_CONTROL_CONFIG.filterKey.accountType
  ) {
    const allExclusions = this._fetchExclusionsFromSession(exclusionType);
    const filterKey =
      exclusionType === ACCESS_CONTROL_CONFIG.shipmentTypeExclusionKey
        ? exclusionTypeKey
        : ACCESS_CONTROL_CONFIG.filterKey.type;
    let filterValue = module;
    if (
      exclusionType === ACCESS_CONTROL_CONFIG.shipmentTypeExclusionKey ||
      exclusionType === ACCESS_CONTROL_CONFIG.userGroupTypeExclusionKey
    ) {
      filterValue = variationType;
    }
    if (allExclusions && allExclusions.length > 0) {
      const moduleExclusions = allExclusions.find((obj) => {
        return obj[filterKey]?.toLowerCase() === filterValue?.toLowerCase();
      });

      return moduleExclusions?.exclusions?.components
        ? moduleExclusions.exclusions.components
        : null;
    }

    return null;
  },

  /**
   * To get a flag that shows component is accessible by the user or not.
   * It uses the SessionStorage to conclude the flag.
   *
   * @param module : Name of the module name (Inbound, Outbound, Warehouse, Billing etc.) to fetch restrictions.
   * It is used only for account/serviceLine type and user type exclusions as of now. Pass null for shipment type exclusions
   * @param componentId : ID of the component from constants, to fetch restrictions.
   * @param exclusionType: Its value can be 'accountTypeExclusions', 'shipmentAccountTypeExclusions' or 'usergroupExclusions'
   * @param variationType: It is used for only shipment type exclusions.  For other exclusions, pass null.
   * Possible values are - 'ManagedInbound', 'ManagedOutbound', 'NonManagedInbound', 'NonManagedOutbound'.
   * @param exclusionTypeKey: For ShipmentTypeExclusion : we are using accountType for GLD/HLD and templateType for GFF
   */
  hasComponentAccess(
    module,
    componentId,
    exclusionType,
    variationType,
    exclusionTypeKey = ACCESS_CONTROL_CONFIG.filterKey.accountType
  ) {
    // Fetch Exclusions of a module from Session Storage
    const exclusionList = this.getExclusionsList(
      exclusionType,
      variationType,
      module,
      exclusionTypeKey
    );
    if (exclusionList?.length > 0) {
      return exclusionList.indexOf(componentId) === -1;
    }
    return true;
  },

  /**
   * To get a flag that shows component is accessible by the user or not.
   * Conclusion will be based on the list you have provided.
   *
   * @param exclusionList : List of exclusions of a particular module.
   * @param componentId : ID of the component from constants, to fetch restrictions
   */
  getComponentAccessFromList(exclusionList, componentId) {
    if (exclusionList?.length > 0) {
      return exclusionList.indexOf(componentId) === -1;
    }
    return true;
  },

  /**
   * Fetches the user profile from session and extracts the data of exclusions
   * @param exclusionType Exclusion type
   */
  _fetchExclusionsFromSession(exclusionType) {
    return CommonUtility.getPropValueFromObj(
      SessionStorageUtility.getUserProfile(),
      exclusionType
    );
  },

  /**
   * Fetches account type from session stoarge based on the account category
   * @param category Account Type Category: Inbound | Outbound | Movement | Freight
   * @returns First matched Account type(shorthand) : MI | MM | FS etc.
   */
  _fetchAccountTypeData(category: string): any {
    if (!category) {
      return null;
    }
    const accountTypes = SessionStorageUtility.getAccountTypeDetails();
    let accountTypesData = [];

    if (accountTypes?.length > 0) {
      accountTypesData = accountTypes.filter(
        (accountType) =>
          accountType.accountTypeCategory?.toLowerCase() ===
          category?.toLowerCase()
      );
    }

    return accountTypesData.length > 0
      ? accountTypesData[0].accountTypes
      : null;
  },

  /**
   * Reads from session storage user profile and returns userRole
   * @returns user role form user profile.
   */
  _fetchUserRole(): string | undefined {
    const userProfile = SessionStorageUtility.getUserProfile();
    return userProfile?.userDetails?.userRole;
  },

  /**
   * Get billing role from userGroups data.
   * Eg. ModifyBilling, ReadOnlyBilling
   * @returns String: Billing role of user
   */
  getBillingRole() {
    let role = null;
    const userGroups = this._fetchExclusionsFromSession('userGroups');
    ACCESS_CONTROL_CONFIG.userGroupOptions.billingRole.forEach((elem) => {
      if (userGroups?.indexOf(elem) !== -1) {
        role = elem;
      }
    });
    return role;
  },

  /**
   * Get companyDetails from User API data.
   * @returns Array: companyDetails containing all selected companies details
   */
  getAllSelectedCompanyDetails(): ICompanyDetails[] {
    return CommonUtility.getPropValueFromObj(
      SessionStorageUtility.getUserProfile(),
      'companyDetails'
    );
  },

  /**
   * Get companyDetails from User API data for first child/selected company.
   * @returns Object: companyDetails containing first selected company details
   */
  getFirstSelectedCompanyDetails(): ICompanyDetails | null {
    const companyDetails: ICompanyDetails[] = this.getAllSelectedCompanyDetails();
    return companyDetails?.length ? companyDetails[0] : null;
  },

  /**
   * Checks if access to specific product line is there at Company level
   * @param productLine Product line name: GLD | HLD | GFF | Brokerage
   */
  checkProductLineAccess(productLine) {
    const productLineKey = `is${productLine}Access`;
    let hasProductLineAccess = SessionStorageUtility.get(productLineKey);

    if (typeof hasProductLineAccess === 'boolean') {
      return hasProductLineAccess;
    } else {
      const productLines = this.getCompanyProductLineAccess();
      hasProductLineAccess = false;
      if (productLines.indexOf(productLine) !== -1) {
        hasProductLineAccess = true;
      }
      SessionStorageUtility.set(productLineKey, hasProductLineAccess);
      return hasProductLineAccess;
    }
  },

  /**
   * Get Company level product lines GLD | HLD | GFF | Brokerage
   * @returns An array of all product line types inside company details
   */
  getCompanyProductLineAccess(): string[] {
    const companyDetails = this.getFirstSelectedCompanyDetails();
    const productLineData = companyDetails?.productLines;
    if (productLineData && productLineData.length) {
      return productLineData.map((p) => p.productType);
    }
    return [];
  },

  /**
   * Get Company level product lines GLD | HLD | GFF | Brokerage
   * OF ALL THE COMPANIES
   * @returns An array of all product line types inside company details
   */
  getAllCompanyProductLineAccess(): string[] {
    const companyDetailsArray: any[] = this.getAllSelectedCompanyDetails();
    const productLines = new Set<string>();
    companyDetailsArray?.forEach((companyDetails) => {
      const productLineData: any[] = companyDetails?.productLines;
      if (productLineData && productLineData.length) {
        productLineData.forEach((p) => {
          productLines.add(p.productType);
        });
      }
    });
    return [...productLines];
  },

  /**
   * Get Company level Service lines Finished Goods | Post Sales | Health
   * @returns An array of all Service line types inside company details
   */
  getCompanyServiceLineAccess(): string[] {
    const companyDetails = this.getFirstSelectedCompanyDetails();
    const serviceLines = [];
    const productLineData = companyDetails?.productLines;
    productLineData?.map((productLine) => {
      productLine?.serviceLines?.map((serviceLine) => {
        serviceLines.push(serviceLine.serviceLineName);
      });
    });
    return serviceLines;
  },

  /**
   * Get Company level Service lines Finished Goods | Post Sales | Health
   * OF ALL THE COMPANIES
   * @returns An array of all Service line types inside company details
   */
  getAllCompanyServiceLineAccess(): string[] {
    const companyDetailsArray: any[] = this.getAllSelectedCompanyDetails();
    const serviceLines = new Set<string>();
    companyDetailsArray?.forEach((companyDetails) => {
      const productLineData: any[] = companyDetails?.productLines;
      productLineData?.map((productLine) => {
        productLine?.serviceLines?.map((serviceLine) => {
          serviceLines.add(serviceLine.serviceLineName);
        });
      });
    });
    return [...serviceLines];
  },

  /**
   * Checks if access to GLD product line is there
   */
  isProductLineGLD() {
    return this.checkProductLineAccess(ACCESS_CONTROL_CONFIG.productLine.gld);
  },

  /**
   * Checks if access to HLD product line is there
   */
  isProductLineHLD() {
    return this.checkProductLineAccess(ACCESS_CONTROL_CONFIG.productLine.hld);
  },

  /**
   * Checks if access to GFF product line is there
   */
  isProductLineGFF() {
    return this.checkProductLineAccess(ACCESS_CONTROL_CONFIG.productLine.gff);
  },

  /**
   * Checks if current user is a GFF only user
   */
  isGFFOnlyUser() {
    const productLines = this.getCompanyProductLineAccess();
    // A user is considered gff only as long as he does not have gld or hld in product lines.
    // So a user with brokerage and gff should be considered gff only.
    return (
      (productLines.length === 1 &&
        productLines.indexOf(ACCESS_CONTROL_CONFIG.productLine.gff) !== -1) ||
      (productLines.length === 2 &&
        productLines.indexOf(ACCESS_CONTROL_CONFIG.productLine.gff) !== -1 &&
        productLines.indexOf(ACCESS_CONTROL_CONFIG.productLine.brokerage) !==
          -1)
    );
  },

  /**
   * Get a consolidated list of all account types across all categories
   */
  getAccountTypesList() {
    const accountTypes = SessionStorageUtility.getAccountTypeDetails();
    const accountTypesList = [];
    if (accountTypes?.length) {
      accountTypes.forEach((accountType) =>
        accountTypesList.push(
          ...(accountType?.accountTypes ? accountType?.accountTypes : [])
        )
      );
    }
    return accountTypesList;
  },

  /**
   * Check if user is of a particular account type
   * @param category Account type category : Inbound | Outbound | Movement | Freight
   * @param accountType Account type for which access needs to be checked : Eg. MI | MM | NMO | FS etc.
   * @returns Boolean True or False based on access to accountType is there or not
   */
  checkAccountTypeAccess(category: string, accountType: string): boolean {
    const sessionKeyName: string = `is${accountType}`;
    // If already calculated, just return it
    let hasAccess: any = SessionStorageUtility.get(sessionKeyName);
    if (typeof hasAccess === 'boolean') {
      return hasAccess;
    } else {
      const accountTypes: string[] = this._fetchAccountTypeData(category);
      hasAccess = false;
      if (
        accountTypes?.length > 0 &&
        accountTypes.indexOf(accountType) !== -1
      ) {
        hasAccess = true;
      }
      SessionStorageUtility.set(sessionKeyName, hasAccess);
      return hasAccess;
    }
  },

  /**
   * Check if user has access to particular account type category
   * @param category Account type category : Inbound | Outbound | Movement | Freight
   * @returns Boolean True or False based on access to account type category is there or not
   */
  checkAccountCategoryAccess(category: string): boolean {
    let accountTypes = SessionStorageUtility.getAccountTypeDetails();
    if (accountTypes?.length) {
      accountTypes = accountTypes.map(
        (accountType) => accountType.accountTypeCategory
      );
    }
    return (
      accountTypes?.length > 0 &&
      (accountTypes.indexOf(category) !== -1 ||
        accountTypes.indexOf(category?.toLowerCase()) !== -1)
    );
  },

  /**
   * Check if account type is ManagedMovement
   * @returns Boolean True or False : if account type is ManagedMovement
   */
  isManagedMovement(): boolean {
    return this.checkAccountTypeAccess(
      ACCOUNT_TYPE_CONSTANTS.categories.movement,
      ACCOUNT_TYPE_CONSTANTS.typesShorthand.managedMovement
    );
  },

  /**
   * Check if account type is FreightShipment
   * @returns Boolean True or False : if account type is FreightShipment
   */
  isFreightShipment(): boolean {
    return this.checkAccountTypeAccess(
      ACCOUNT_TYPE_CONSTANTS.categories.freight,
      ACCOUNT_TYPE_CONSTANTS.typesShorthand.freightShipment
    );
  },

  /**
   * To check if account type is MangedInbound
   * @returns Boolean True or False : if account type is ManagedInbound
   */
  isManagedInbound() {
    return this.checkAccountTypeAccess(
      ACCOUNT_TYPE_CONSTANTS.categories.inbound,
      ACCOUNT_TYPE_CONSTANTS.typesShorthand.managedInbound
    );
  },

  /**
   * To check if account type is ManagedOutbound
   * @returns Boolean True or False : if account type is ManagedOutbound
   */
  isManagedOutbound() {
    return this.checkAccountTypeAccess(
      ACCOUNT_TYPE_CONSTANTS.categories.outbound,
      ACCOUNT_TYPE_CONSTANTS.typesShorthand.managedOutbound
    );
  },

  /**
   * Check if account type category is Inbound
   * @returns Boolean True or False if account type categories include Inbound
   */
  hasInboundCategory() {
    const accounTypes = this._fetchAccountTypeData(
      ACCOUNT_TYPE_CONSTANTS.categories.inbound
    );
    return (
      this.checkAccountCategoryAccess(
        ACCOUNT_TYPE_CONSTANTS.categories.inbound
      ) && accounTypes.length > 0
    );
  },

  /**
   * Check if account type category is Outbound
   * @returns Boolean True or False if account type categories include Outbound
   */
  hasOutboundCategory() {
    const accounTypes = this._fetchAccountTypeData(
      ACCOUNT_TYPE_CONSTANTS.categories.outbound
    );
    return (
      this.checkAccountCategoryAccess(
        ACCOUNT_TYPE_CONSTANTS.categories.outbound
      ) && accounTypes.length > 0
    );
  },

  /**
   * Check if account type category is Movement
   * @returns Boolean True or False if account type categories include Movement
   */
  hasMovementCategory() {
    return this.checkAccountCategoryAccess(
      ACCOUNT_TYPE_CONSTANTS.categories.movement
    );
  },

  /**
   * Check if the user has UCP access only
   */
  isUCPAccessOnly() {
    const productLines = this.getCompanyProductLineAccess();
    return (
      productLines.length === 1 &&
      productLines.indexOf(ACCESS_CONTROL_CONFIG.productLine.brokerage) !==
        -1 &&
      this.checkAccountTypeAccess(
        ACCOUNT_TYPE_CONSTANTS.categories.brokerage,
        ACCOUNT_TYPE_CONSTANTS.typesShorthand.ucp
      )
    );
  },

  /**
   * Check if the user has UCP access
   */
  isUCPAccess() {
    const productLines = this.getCompanyProductLineAccess();
    return (
      productLines.indexOf(ACCESS_CONTROL_CONFIG.productLine.brokerage) !==
        -1 &&
      this.checkAccountTypeAccess(
        ACCOUNT_TYPE_CONSTANTS.categories.brokerage,
        ACCOUNT_TYPE_CONSTANTS.typesShorthand.ucp
      )
    );
  },

  /**
   * check if company has a service line
   * @param serviceLineName serviceLineName
   * @param productLine product line name, default value is 'GLD'
   */
  userHasServiceLine(
    serviceLineName,
    productLine = ACCESS_CONTROL_CONFIG.productLine.gld
  ) {
    const companyDetails = this.getFirstSelectedCompanyDetails();
    const productLineData = companyDetails?.productLines?.find(
      (p) => p.productType === productLine
    );
    if (productLineData) {
      const serviceLines = productLineData.serviceLines || [];
      return serviceLines.some(
        (serviceLine) => serviceLine.serviceLineName === serviceLineName
      );
    }
    return false;
  },

  /**
   * check if isPostSalesCustomer
   */
  isPostSalesCustomer() {
    return this.userHasServiceLine(ACCOUNT_SERVICELINES_CONSTANTS.postSales);
  },

  /**
   * check if isFinishedGoodsCustomer
   */
  isFinishedGoodsCustomer() {
    return this.userHasServiceLine(
      ACCOUNT_SERVICELINES_CONSTANTS.finishedGoods
    );
  },

  /**
   * check if user has ftz access
   */
  hasFtzAccess() {
    const companyDetails = this.getFirstSelectedCompanyDetails();
    return companyDetails?.hasFtzAccess ? true : false;
  },

  /**
   * To Get html Content fragment for Learn more
   */
  getHtmlContentKeyByActType(moduleName, componentName) {
    // Check inbound/outbound shipment
    if (moduleName === SHIPMENT_TYPE.inbound) {
      // Check for inbound managed and nonmanaged
      return this.isManagedInbound()
        ? `lbl_${moduleName}_managed_${componentName}`
        : `lbl_${moduleName}_nonmanaged_${componentName}`;
    } else if (moduleName === SHIPMENT_TYPE.outbound) {
      // Check for outbound managed and nonmanaged
      return this.isManagedOutbound()
        ? `lbl_${moduleName}_managed_${componentName}`
        : `lbl_${moduleName}_nonmanaged_${componentName}`;
    }
    return '';
  },

  /**
   * This method checks whether the user has admin access
   */
  isAdminUser() {
    const userGroups = this._fetchExclusionsFromSession('userGroups');
    if (
      userGroups &&
      userGroups.indexOf(ACCESS_CONTROL_CONFIG.userGroupOptions.adminRole) !==
        -1
    ) {
      return true;
    }

    return false;
  },

  /**
   * To Get html Content fragment for Learn more based on shipment type
   */
  getHtmlContentKeyByShipmentType(shipmentType: string, componentName: string) {
    return `lbl_${shipmentType?.toLowerCase()}_${componentName}`;
  },

  /**
   * To get all accessible modules for current user based on inclusions
   */
  getAccessibleModules() {
    const hamburgerInclusions = InclusionUtility.getInclusions(
      INCLUSION_PAGE_KEYS.hamburger,
      INCLUSION_PAGE_KEYS.hamburger
    );
    return Object.keys(hamburgerInclusions || {}).map((module) =>
      module?.toLowerCase()
    );
  },

  /**
   * To check if movement
   */
  checkIfHLDOrGFF() {
    let arr = [];
    arr = this.getCompanyProductLineAccess();
    return (
      arr.indexOf(ACCESS_CONTROL_CONFIG.productLine.hld) > -1 ||
      arr.indexOf(ACCESS_CONTROL_CONFIG.productLine.gff) > -1
    );
  },

  /**
   * To check user should have HLD experience when primary account type is ManagedMovement
   * and product line is other than HLD or GFF
   */
  showHLDExperience() {
    return !this.checkIfHLDOrGFF() && this.isManagedMovement();
  },

  // this object contains PL, SL, AT and ROLE sequence
  companyMappingKeyDetails: {
    productLineSequence: '',
    serviceLineSequence: '',
    accountTypeSequence: '',
    roleTypeSequence: '',
  },

  /**
   * Sets the value of the correct PL, SL, AT and ROLE sequence in companyMappingKeyDetails object
   */
  setCompanyMappingKeyDetails() {
    this.setProductLineCompanyMappingKey();
    this.setServiceLineCompanyMappingKey();
    this.setAccountTypeCompanyMappingKey();
    this.setRoleTypeCompanyMappingKey();
  },

  /**
   * Sets the value of the correct ROLE sequence in companyMappingKeyDetails object
   */
  setRoleTypeCompanyMappingKey() {
    const roleType = this._fetchUserRole() || '';
    let key = '';
    if (ACCESS_CONTROL_CONFIG.roleTypeSequence.includes(roleType)) {
      key = roleType;
    }
    this.companyMappingKeyDetails.roleTypeSequence = key;
  },

  /**
   * Sets the value of the correct AT sequence in companyMappingKeyDetails object
   */
  setAccountTypeCompanyMappingKey() {
    const accountTypes = this.getAccountTypesList();
    let key = '';
    let flag = false;
    // Adding account types to key in order of sequence
    ACCESS_CONTROL_CONFIG.accountTypeSequence.forEach((at) => {
      if (accountTypes?.indexOf(at) !== -1) {
        key += flag ? '_' : '';
        key += at;
        flag = true;
      }
    });
    this.companyMappingKeyDetails.accountTypeSequence = key;
  },

  /**
   * Sets the value of the correct SL sequence in companyMappingKeyDetails object
   */
  setServiceLineCompanyMappingKey() {
    const serviceLines = this.getCompanyServiceLineAccess();
    let key = '';
    let flag = false;
    // Adding service lines to key in order of sequence
    ACCESS_CONTROL_CONFIG.serviceLineSequence.forEach((sl) => {
      if (serviceLines?.indexOf(sl) !== -1) {
        key += flag ? '_' : '';
        key += sl.toUpperCase();
        flag = true;
      }
    });
    // Setting Default service line GFF for product line GFF as we are getting no service lines for that case
    if (!flag) {
      key += `${DEFAULT_SERVICE_LINE_GFF}`;
    }
    this.companyMappingKeyDetails.serviceLineSequence = key;
  },

  /**
   * Sets the value of the correct PL sequence in companyMappingKeyDetails object
   */
  setProductLineCompanyMappingKey() {
    const productLines = this.getCompanyProductLineAccess();
    let key = '';
    let flag = false;
    // Adding product lines to key in order of sequence
    ACCESS_CONTROL_CONFIG.productLineSequence.forEach((pl) => {
      if (productLines?.indexOf(pl) !== -1) {
        key += flag ? '_' : '';
        key += pl;
        flag = true;
      }
    });
    this.companyMappingKeyDetails.productLineSequence = key;
  },

  /**
   * _createCompanyMappingKeyList creates a key based on productLines, serviceLines, accountTypes and shipmentTypes
   */
  _createCompanyMappingKeyList(shipmentType) {
    /**
     * Inserting the original values of PL, SL and AT/ST in the keyTemplates
     */
    let keyTemplates;
    // this case runs when there are more than one accounts,
    // and one of them is managed movement
    if (
      !shipmentType &&
      this.companyMappingKeyDetails.accountTypeSequence.indexOf(
        SHIPMENT_TYPES_SHORTHAND.ManagedMovement
      ) !== -1 &&
      this.companyMappingKeyDetails.accountTypeSequence.match(
        new RegExp('_', 'g')
      )?.length >= 1
    ) {
      keyTemplates = KEY_TEMPLATE.multipleAccWithMM;
    } else if (shipmentType) {
      // this case executes for shipments Details Page,
      // where we send shipment type to get current field mapping function
      keyTemplates = KEY_TEMPLATE.shptDets;
    } else {
      /**
       * this is used for all other default cases
       */
      keyTemplates = KEY_TEMPLATE.default;
    }
    return keyTemplates.map((template) => {
      // replacing 'PL', 'SL', 'AT/ST' and  ROLE with their actual values
      template = template.replace(
        PRODUCT_LINE,
        this.companyMappingKeyDetails.productLineSequence
      );
      template = template.replace(
        SERVICE_LINE,
        this.companyMappingKeyDetails.serviceLineSequence
      );
      template = template.replace(
        ROLE_TYPE,
        this.companyMappingKeyDetails.roleTypeSequence
      );
      if (shipmentType) {
        template = template.replace(
          ACCOUNT_SHIPMENT_TYPE,
          SHIPMENT_TYPES_SHORTHAND[shipmentType]
        );
      } else {
        template = template.replace(
          ACCOUNT_SHIPMENT_TYPE,
          this.companyMappingKeyDetails.accountTypeSequence
        );
      }
      return template;
    });
  },

  /**
   * getCurrentMapping returns the list of components which are excluded based on key and config
   */
  getCurrentFieldMapping(config, shipmentType = null) {
    const keyList = this._createCompanyMappingKeyList(shipmentType);

    // first check for PL@SL@(AT/ST)
    // if not found then check for PL@*@(AT/ST)
    // if not found then check for PL@SL@*
    // if not found then check for PL@*@*
    let i = 0;
    let mappedConfig = [];
    while (i < keyList?.length) {
      if (config[keyList[i]]) {
        mappedConfig = config[keyList[i]];
        break;
      }
      i++;
    }
    return mappedConfig;
  },

  /**
   * Added check for GFF shipment type with productLine
   * we are getting productLine from queryParams
   */
  isGFFShipment(queryParams) {
    return queryParams[SHIPMENT_TYPE_CONFIG.productLine] ===
      ACCESS_CONTROL_CONFIG.productLine.gff
      ? true
      : false;
  },

  /**
   * check if multiview
   * @returns is user companies are more thn 2
   */
  isMultiAccountCombination() {
    return (
      this.getAllSelectedCompanyDetails()?.length > 1
    );
  },

  /**
   * Get value of authentication source of user.
   * Eg. Lasso, B2CCustomer
   * @returns Name of the auth source.
   */
  getUserAuthType() {
    const userDetails = CommonUtility.getPropValueFromObj(
      SessionStorageUtility.getUserProfile(),
      'userDetails'
    );
    return userDetails?.authType;
  },
};
