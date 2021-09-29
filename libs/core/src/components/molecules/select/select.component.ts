// 9fbef606107a605d69c0edbcd8029e5d_SYMPHONY
/*
 * Select component
 **/

import {
  AfterViewInit,
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  Output,
  SimpleChanges,
  ViewChild,
  ViewEncapsulation,
} from '@angular/core';
import {
  ControlContainer,
  FormControl,
  FormGroupDirective,
} from '@angular/forms';
import { MatOption } from '@angular/material/core';
import { MatSelect } from '@angular/material/select';
import { BehaviorSubject, Subject } from 'rxjs';
import { debounceTime, takeUntil } from 'rxjs/operators';

import { UserAgentUtility } from '../../../utils/user-agent.util';

import { SELECT_SEARCH_FILTER_DEBOUNCE_TIME } from './select.component.config';

@Component({
  selector: 'lib-select',
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.scss'],
  encapsulation: ViewEncapsulation.None,
  viewProviders: [
    {
      provide: ControlContainer,
      useExisting: FormGroupDirective,
    },
  ],
})
export class SelectComponent
  implements OnInit, OnChanges, AfterViewInit, OnDestroy {
  @Input() optionLists: Array<any> = [];
  @Input() label: string;
  @Input() selectedValue: string;
  @Input() selectedValues: string[];
  @Input() labelStyle = {};
  @Input() customStyle = '';
  @Input() dataAutomationAttribute: string;
  @Input() showAutomationAttrForOptions = false;
  @Input() controlName = 'select_control';
  @Input() ariaLabel = '';
  @Input() fixedLabel = '';
  @Input() selectionCount = '0';
  @Input() getValueFromCMS = true;
  @Input() placeholder = '';
  @Input() noBorder = false;
  @Input() showSelectValueToUser = false;
  @Input() showErrorState = false;
  @Input() showColorsInMultiSelect = true;
  @Input() showPlaceholderAsOption = false;
  @Input() className = '';
  @Input() showSelectAllOption = false;
  @Input() initialSelected: Array<any>;
  @Input() variation = 'default';
  @Input() model: FormControl;
  @Input() selectAllCheckboxText = '';
  @Input() selectAllValue = 'All';
  @Input() toggleSelect;
  @Input() optionsLimit;
  @Input() footerLabel;
  @Output() footerClicked = new EventEmitter();
  @Output() selectionChange = new EventEmitter();
  @Output() selectClick = new EventEmitter();
  @Output() selectToggleChange = new EventEmitter();
  @ViewChild('selectAllOption') selectAllOption: MatOption;
  @ViewChild('matSelect') matSelect: MatSelect;

  multiple = 'multiple';
  searchableSingleSelect = 'searchable-single-select';
  clickFlag = false;

  userAgentUtility = UserAgentUtility;
  selectAllOptionState = false;
  lastSelectedValue;
  automationAttrRegex = new RegExp(/ /g);

  public modelFilterControl: FormControl = new FormControl();
  public filteredOptionLists: BehaviorSubject<any> = new BehaviorSubject<any>(
    []
  );

  private readonly _onDestroy = new Subject<void>();

  /**
   * ngOnInit life cycle hook
   */
  ngOnInit() {
    if (this.variation === this.searchableSingleSelect) {
      this.lastSelectedValue = this.selectedValue;
      this.updateOptions(this.optionLists);
      this.modelFilterControl.valueChanges
        .pipe(
          debounceTime(SELECT_SEARCH_FILTER_DEBOUNCE_TIME),
          takeUntil(this._onDestroy)
        )
        .subscribe(() => {
          this.filterOptions();
        });
    }
  }

  /**
   * ngafterviewinit life cycle hook
   */
  ngAfterViewInit() {
    if (this.showSelectAllOption && this.setSelectAllOption()) {
      this.checkAll();
      this.selectAllOptionState = this.selectAllOption?.selected;
    }
  }

  /**
   * Check all values
   */
  checkAll() {
    this.selectedCount(this.selectAllValue);
    if (this.showSelectAllOption) {
      this.updateMultiSelectValue([...this.optionLists, this.selectAllValue]);
    } else {
      this.updateMultiSelectValue([...this.optionLists]);
    }
  }

  /**
   * Called when select All option is clicked
   */
  toggleAllSelection(state) {
    let selectedValues;
    if (state) {
      selectedValues = this.optionLists;
      this.checkAll();
    } else {
      selectedValues = [];
      this.updateMultiSelectValue(selectedValues);
      this.selectedCount(this.model?.value?.length);
    }
    this.selectionChange.emit(selectedValues);
  }
  /**
   * ngOnChanges - to select specific values initially
   */
  ngOnChanges(changes: SimpleChanges) {
    if (changes.initialSelected) {
      if (
        changes.initialSelected.currentValue === this.optionLists?.length ||
        changes.initialSelected.currentValue.includes(this.selectAllValue)
      ) {
        this.checkAll();
      } else {
        this.selectedCount(this.model?.value?.length);
      }
    }
    if (
      changes.optionLists &&
      changes.optionLists.previousValue !== changes.optionLists.currentValue
    ) {
      this._handleOptionListsChange();
    }

    if (
      changes.toggleSelect &&
      changes.toggleSelect.currentValue !== changes.toggleSelect.previousValue
    ) {
      /**
       * Detect matSelect opening/closing from parent, Eg. On click of button.
       * The parent will toogle the boolean value of toggleSelect, detect if the input changed and show/hide
       * the mat-select options.
       * In header, select is opened/closed on click of the 'View As' button
       */
      this.matSelect.toggle();
    }
  }

  /**
   * change value method whenever selected option is changed.
   */
  changeValue(data) {
    if (!data) {
      return;
    }
    if (data === 'footer-value') {
      // when footer clicked dont't change the select model value instead emit output
      setTimeout(() => {
        // we need to reset the selected value to its previous value immediately after the selectionChange event fires
        this.selectedValue = this.lastSelectedValue;
      });
      this.footerClicked.emit(true);
      return;
    }
    if (
      this.showSelectAllOption &&
      this.selectAllOptionState !== this.selectAllOption?.selected
    ) {
      this.toggleAllSelection(this.selectAllOption.selected);
      this.selectAllOptionState = this.selectAllOption?.selected;
      return;
    }
    const selectedValues: [] = JSON.parse(JSON.stringify(data));
    this.updateMultiSelectValue(selectedValues);
    if (this.variation === this.multiple) {
      this._changeValueMultiple(data, selectedValues);
    }
    this.lastSelectedValue = selectedValues;
    this.selectionChange.emit(selectedValues);
  }

  /**
   * Emits true when mat select is clicked
   */
  matSelectClick() {
    if (!this.clickFlag) {
      this.selectClick.emit(true);
      this.clickFlag = true;
    }
  }

  /**
   * Emits true when all options are selected
   */
  setSelectAllOption(): boolean {
    if (this.model?.value.includes(this.selectAllValue)) {
      return (
        this.model?.value &&
        this.optionLists?.length &&
        this.model?.value.length - 1 === this.optionLists.length
      );
    } else {
      return (
        this.model?.value &&
        this.optionLists.length &&
        this.model?.value.length === this.optionLists.length
      );
    }
  }

  /**
   * set placeholder for multi-select count
   */
  selectedCount(Value) {
    this.selectionCount = Value ? Value.toString() : '0';
  }

  /**
   * Inform parent if MatSelect is opened or closed.
   * This is child to parent communication that mat-select options overlay has been closed/opened.
   * Required to inform parent when mat-select is closed by clicking outside of the select which dismisses the overlay
   * and closes select.
   */
  handleSelectToggle() {
    if (
      this.matSelect.panel &&
      !getComputedStyle(this.matSelect.panel.nativeElement).getPropertyValue(
        'opacity'
      )
    ) {
      /**
       * This is added because when we scroll outside the select, the dropdown closes by making opacity as 0 but matSelect
       * in this case is emiting 'opened state' as true so making it 'closed' in order to make the state consistent.
       */
      this.matSelect.close();
    }
    this.selectToggleChange.emit(this.matSelect.panelOpen);
  }

  /**
   * Emit updated filtered options list to be populated inside select dropdown
   */
  updateOptions(options) {
    if (this.optionsLimit) {
      this.filteredOptionLists.next(options.slice(0, this.optionsLimit));
    } else {
      this.filteredOptionLists.next(options.slice());
    }
  }

  /**
   * Filter the optionsList according to optionsLimit and search keyword
   */
  filterOptions() {
    if (!this.optionLists) {
      return;
    }
    // get the search keyword
    let search = this.modelFilterControl.value;
    if (!search) {
      this.updateOptions(this.optionLists);
      return;
    } else {
      search = search?.toLowerCase();
    }
    const filteredData = this.optionLists.filter(
      (x) => x.viewValue?.toLowerCase().indexOf(search) > -1
    );
    this.updateOptions(filteredData);
  }

  /**
   * ngOnDestroy life cycle hook
   */
  ngOnDestroy(): void {
    this._onDestroy.next();
    this._onDestroy.complete();
  }

  /**
   * Handle optionLists value change in ngOnChanges
   */
  private _handleOptionListsChange() {
    if (this.variation === this.searchableSingleSelect) {
      /**
       * Update filteredOptionLists whenever optionLists input changed (units API response is received).
       * The call to updateOptions() in ngOnInit is run only once after refresh/load.
       */
      this.updateOptions(this.optionLists);
    }
    if (this.initialSelected?.length >= 0) {
      this.updateMultiSelectValue(this.initialSelected);
      if (this.initialSelected.length === this.optionLists?.length) {
        this.checkAll();
      } else {
        this.selectedCount(this.model?.value?.length);
      }
    }
    if (this.selectAllOption) {
      this.selectAllOptionState = this.selectAllOption?.selected;
    }
    this.selectionChange.emit(this.initialSelected);
  }

  /**
   * change value method whenever selected option is changed for multi-select variant.
   */
  private _changeValueMultiple(data: any, selectedValues) {
    if (this.setSelectAllOption()) {
      this.selectedCount(this.selectAllValue);
      if (!data.includes(this.selectAllValue)) {
        if (this.showSelectAllOption) {
          this.updateMultiSelectValue([
            ...this.optionLists,
            this.selectAllValue,
          ]);
        } else {
          this.updateMultiSelectValue([...this.optionLists]);
        }
      }
    } else {
      if (data.includes(this.selectAllValue)) {
        const temp: [] = JSON.parse(JSON.stringify(data));
        temp.splice(0, 1);
        this.updateMultiSelectValue(temp);
      }
      this.selectedCount(this.model?.value?.length);
    }
    if (this.showSelectAllOption && data.includes(this.selectAllValue)) {
      selectedValues.splice(0, 1);
    }
    this.selectAllOptionState = this.selectAllOption?.selected;
  }

  /**
   * Update form control and binding value for multi select
   * @param value Value to be set for multi select dropdown
   */
  private updateMultiSelectValue(value: any[]) {
    this.model?.setValue(value);
    /*
      Angular 10 bug : https://github.com/angular/components/issues/21583
      Earlier the view was updating the selectedValues variables after model.setValue is executed
      ([(value)]="selectedValues") but as per the bug for multiple mat-select this was not happening.
      Fix : Explicitly update view after formControl model value is updated:
    */

    // Removing because we are reverting to Angular 9
    // this.selectedValues = value;
  }
}
