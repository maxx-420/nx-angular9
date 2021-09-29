// 9fbef606107a605d69c0edbcd8029e5d_SYMPHONY
/**
 * Account selector dropdown with Search and toggle capability
 */

import { ConnectionPositionPair } from '@angular/cdk/overlay';
import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import {
  MatSlideToggle,
  MatSlideToggleChange,
} from '@angular/material/slide-toggle';
import { BehaviorSubject } from 'rxjs';

import { ACCOUNT_USER_TYPES } from '../../../constants';

import {
  popoverHamburgerPositions,
  popoverPositionsOnClick,
} from './account-selector.config';

@Component({
  selector: 'lib-account-selector',
  templateUrl: './account-selector.component.html',
  styleUrls: ['./account-selector.component.scss'],
})
export class AccountSelectorComponent implements OnInit, OnChanges {
  @Input()
  set accountsList(list) {
    if (list) {
      this._accountsList = list;
      // show toggle only when atleast one account with parent is there
      this.showSelectMultipleToggle = (this.accountsList ?? []).some(
        (company) => company?.parentDetail
      );
      this.setOptionsList();
      this.checkAccountType();
    }
  }
  get accountsList() {
    return this._accountsList;
  }
  @ViewChild('mySlider') set firstItem(value: MatSlideToggle) {}
  @Input() isProductLineHLD: boolean;
  @Input()
  set companyDetails(companyDetails) {
    this._companyDetails = !companyDetails
      ? companyDetails
      : companyDetails
          .slice()
          .sort((firstUnit, secondUnit) =>
            (firstUnit.name || '').localeCompare(secondUnit.name)
          );
    this.setOptionsList();
    this.setSelectedCompanies();
  }
  get companyDetails() {
    return this._companyDetails;
  }
  @Input() accountSelectorLabel;
  @Input() isAdmin = false;
  @Input() userType;
  @Input() customPopoverPositions;
  @Input() addOverlayHostClass;
  @Input() hideSetAsDefault;
  @Input() buttonClass = '';
  @Output() isMenuOpen = new EventEmitter();
  @Output() accountSelected = new EventEmitter();
  @Input() isMobileView = false;
  @Input() hideToggle = false;
  // for kill switch from Azure config
  // toggles select multiple
  isSelectMultipleActive;
  t;
  // show select multiple
  showSelectMultipleToggle = true;

  @Input() accountToggleButtonStyling = {
    width: '100%',
    'padding-left': '0px',
  };
  isOpen = false;
  multiAccountSelected = false;
  selectedAccount: any;
  singleAccountCustomer = false; // if single account customer is there then hide back button
  actSelectorForm: FormGroup;
  parentsList = [];

  allCompanyList = [];
  companyGroupList = [];
  dataAutomationAttribute = {
    toggleButton: 'toggle-multiple-account-selection-button',
    updateButton: 'multiselect-account-confirm-button',
    toggleButtonLabel: 'toggle-multiple-account-selection-label',
  };

  employeeAccount = true;
  popoverPositions: {
    [key: string]: ConnectionPositionPair;
  } = popoverPositionsOnClick;
  closeMenu = new BehaviorSubject(false);

  private _accountsList = [];
  private _companyDetails;

  constructor(private formBuilder: FormBuilder) {
    this.actSelectorForm = this.formBuilder.group({
      childAccounts: [],
      searchValue: [],
      isDefaultUnit: [],
      selectedAccount: [],
    });
  }

  /**
   * Life cycle hook
   */
  ngOnInit() {
    if (this.isMobileView) {
      this.popoverPositions = popoverHamburgerPositions;
    }
  }

  /**
   * Life cycle hook
   */
  ngOnChanges({ userType, hideToggle }: SimpleChanges) {
    if (userType && userType.previousValue !== userType.currentValue) {
      this.checkAccountType();
    }

    if (hideToggle && hideToggle.previousValue !== hideToggle.currentValue) {
      this.showSelectMultipleToggle = !hideToggle.currentValue;
      this.isSelectMultipleActive = false;
      this.toggleChange(null);
    }
  }

  /**
   * Called when slider is pressed/clicked
   * @param value value is an obj which has checked propery
   */
  toggleChange(value: MatSlideToggleChange) {
    this.selectedAccount = undefined;
    this.multiAccountSelected = false;
    this.actSelectorForm.reset();
  }

  /**
   * return filtered list
   * @param list actual list
   * @returns filtered list
   */
  getFilteredList(list) {
    const searchValue = this.actSelectorForm.get('searchValue').value;
    if (!searchValue || !list?.length) {
      return list;
    } else {
      return [...(list as Array<any>)].filter(
        (val) =>
          (val?.name as string)
            ?.toLowerCase()
            .indexOf(searchValue?.toLowerCase()) > -1
      );
    }
  }

  /**
   * check account type
   */
  checkAccountType() {
    this.employeeAccount = !(
      this.userType?.toLowerCase() === ACCOUNT_USER_TYPES.customer &&
      this.companyGroupList.length === 1
    );

    if (!this.employeeAccount) {
      this.isSelectMultipleActive = true;
      this.selectAccount(this.companyGroupList[0].id);
    }
  }

  /**
   * reset on back from multi select view
   */
  onBackClick() {
    this.multiAccountSelected = false;
    this.selectedAccount = this.companyGroupList;
  }

  /**
   * set Options List
   */
  setOptionsList() {
    // list shows all companies
    this.allCompanyList = (this.accountsList as Array<any>).reduce(
      (res, val) => {
        const list = (val?.companyDetail ?? [])
          .map((unit) => {
            return {
              ...unit,
              selected: this.checkSelectedUnit(unit?.id),
              parentDetail: val?.parentDetail,
            };
          })
          .sort((firstUnit, secondUnit) =>
            (firstUnit.name || '').localeCompare(secondUnit.name)
          );
        res = [...res, ...list];
        return res;
      },
      []
    );
    // list shows company group
    this.companyGroupList = (this.accountsList as Array<any>).reduce(
      (res, val) => {
        const obj = {
          ...val?.parentDetail,
          children: [...val.companyDetail].sort((firstUnit, secondUnit) =>
            (firstUnit.name || '').localeCompare(secondUnit.name)
          ),
        };
        res = [...res, ...(val?.parentDetail ? [obj] : [])];
        return res;
      },
      []
    );
  }

  /**
   * check selected unit
   * @param unitName unit name
   */
  checkSelectedUnit(id) {
    return (this.companyDetails || []).some((company) => +id === +company.id);
  }

  /**
   * set selected company in form
   */
  setSelectedCompanies() {
    const userCompanies = (this.companyDetails || []).map((unit) => +unit?.id);
    this.actSelectorForm?.get('childAccounts')?.setValue(userCompanies);
  }

  /**
   * Called when account item is clicked
   * @param account Selected account
   */
  selectAccount(unitid: any) {
    this.selectedAccount = (this.isSelectMultipleActive
      ? this.companyGroupList
      : this.allCompanyList
    ).find((unit) => +unit.id === +unitid);
    if (this.selectedAccount?.children?.length) {
      this.multiAccountSelected = true;
      this.setSelectedCompanies();
      return;
    }
    this.setAccountSelected([unitid]);
  }

  /**
   * dispatch selected account
   * @param unitid unitid
   * @param isDefaultUnit isDefaultUnit
   */
  setAccountSelected(unitid, isDefaultUnit = false) {
    this.accountSelected.emit({
      isDefaultUnit: isDefaultUnit ?? false,
      unitid,
    });
    this.closeMenu.next(true);
  }

  /**
   * Called when the account selector button is clicked
   */
  accountSelectorToggle(evt) {
    if (!evt) {
      this.actSelectorForm.reset();
      this.multiAccountSelected = false;
      this.isSelectMultipleActive = false;
      if (this.employeeAccount) {
        this.selectedAccount = undefined;
      }
    } else {
      if (this.companyDetails?.length > 1) {
        if (!this.hideToggle) {
          this.multiAccountSelected = true;
          this.isSelectMultipleActive = true;
        }
        const selectedCompanyDetail = [...this.allCompanyList].find((unit) => {
          return [...this.companyDetails].some(
            (company) => +company.id === +unit.id
          );
        });
        if (selectedCompanyDetail?.parentDetail?.id) {
          this.selectAccount(selectedCompanyDetail?.parentDetail?.id);
        }
      }
      this.setSelectedCompanies();
    }
  }
}
