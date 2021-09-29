// 9fbef606107a605d69c0edbcd8029e5d_SYMPHONY

import {
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Router } from '@angular/router';

import { AnalyticsService } from '../../../service/analytics-wrapper/analytics.service';
import { RenderLabelPipe } from '../../../pipe/render-label/render-label.pipe';
import { ITEM_SEARCH_MIN_CHARACTERS } from '../../../constants/global.constant';
import NavigationUtility from '../../../utils/navigationUtil';

import { default as SearchUtility } from './../../../utils/searchUtils';
import {
  fieldNameAttribute,
  minCharForSearchOptions,
} from './search-bar.component.config';
import { ROUTER_CONSTANTS } from './../../../constants/router.constant';

@Component({
  selector: 'lib-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.scss'],
})
export class SearchBarComponent implements OnInit, OnDestroy {
  handler: any;
  isOpened = false;
  searchForm: FormGroup;
  searchByFieldName = 'searchBy';
  searchTermFieldName = 'searchTerm';
  searchBtnStyle: any;
  showClearControl = false;
  searchDisabled: boolean;
  helperText = '';
  isMinCharForSearchOption: boolean;
  labelStyle = { display: 'none' };
  fieldNameAttribute = fieldNameAttribute;
  headerSearchOptionList = [];
  headerValueLabelMap = {};
  ngUnsubscribe = new Subject();

  @Input() layout = 'header';
  @Input() searchState: any;
  @Input() showSearchByLabel = false;
  @Input() optionsInclusionConfig;
  @Output() searchFormUpdated = new EventEmitter();

  constructor(
    private readonly router: Router,
    private readonly fb: FormBuilder,
    private readonly _contentPipe: RenderLabelPipe,
    private readonly _analyticsService: AnalyticsService
  ) {
    this.searchForm = this.fb.group({
      searchBy: [''],
      searchTerm: [''],
    });
    this.headerSearchOptionList = SearchUtility.setHeadersSearchOptions(
      this.optionsInclusionConfig
    );
    this.initSearchForm();

    this.searchBtnStyle = {
      ...SearchUtility.getSearchBtnStyle(),
      height: '100%',
    };
  }

  /**
   * Angular life cycle hook
   */
  ngOnInit(): void {
    this.headerValueLabelMap = this.headerSearchOptionList.reduce(
      (map, option) => {
        map[option.value] = option.viewValue;
        return map;
      },
      {}
    );
  }

  /**
   * Angular life cycle
   */
  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  /**
   * to check if searchBy in queryparams is present in the configuration
   */
  isSearchByFieldValid(queryParams) {
    let searchOptionList = [];
    searchOptionList = this.headerSearchOptionList
      .slice()
      .map((el) => el.value);
    if (
      queryParams?.searchBy &&
      searchOptionList.indexOf(queryParams?.searchBy) === -1
    ) {
      return false;
    }
    return true;
  }

  /**
   * To navigate user to search page.
   */
  search() {
    /**
     * only performing the search when searchDisabled is false
     * because on enter press submit of form was fired
     */
    if (!this.searchDisabled) {
      this._analyticsService.createLinkClickTagObject(
        '#',
        'Search Icon',
        'Clicked on Search Icon',
        'Internal',
        { link_section: 'Search Bar' }
      );
      NavigationUtility.navigate(this.router, ROUTER_CONSTANTS.search, true, {
        queryParams: {
          searchBy: this.searchForm.get(this.searchByFieldName).value,
          searchTerm: this.searchForm
            .get(this.searchTermFieldName)
            .value.trim(),
        },
      });
      // this.setValues();
      this.searchFormUpdated.emit(true);
    }
  }

  /**
   * To clear search term and state
   */
  clearSearchTerm() {
    this.searchForm.get(this.searchTermFieldName).setValue('');
  }

  /**
   * To initialize search form with input data and listen to changes in form
   */
  initSearchForm() {
    this.getHelperText();

    this.searchForm
      .get(this.searchByFieldName)
      .setValue(this.headerSearchOptionList[0]?.value);

    this.searchForm
      .get(this.searchTermFieldName)
      .valueChanges.pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(() => {
        this.checkForSearchDisabled();
        this.checkForClearControl();
      });
    this.searchForm
      .get(this.searchByFieldName)
      .valueChanges.pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(() => {
        if (
          minCharForSearchOptions.indexOf(
            this.searchForm.get(this.searchByFieldName).value
          ) !== -1
        ) {
          this.isMinCharForSearchOption = true;
        } else {
          this.isMinCharForSearchOption = false;
        }
        this.checkForSearchDisabled();
        this.getHelperText();
        this.checkForClearControl();
      });
  }
  /**
   * decides the helper text to show
   */
  getHelperText() {
    if (this.isMinCharForSearchOption) {
      this.helperText = this._contentPipe.transform(
        'lbl_search_enter_atleast_4_characters'
      );
    } else {
      this.helperText = this._contentPipe.transform(
        'lbl_search_enter_exact_value'
      );
    }
  }

  /**
   * checks search button status
   */
  checkForSearchDisabled() {
    if (
      this.isMinCharForSearchOption &&
      this.searchForm.get(this.searchTermFieldName).value.trim().length <
        ITEM_SEARCH_MIN_CHARACTERS
    ) {
      this.searchDisabled = true;
    } else {
      this.searchDisabled = false;
    }
  }

  /**
   * Shows clear search term control if required.
   */
  checkForClearControl() {
    this.showClearControl = SearchUtility.checkForClearControl(
      this.searchForm,
      this.searchTermFieldName
    );
  }
}
