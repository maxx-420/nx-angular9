// 9fbef606107a605d69c0edbcd8029e5d_SYMPHONY

import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { RenderLabelPipe } from '../../../pipe/render-label/render-label.pipe';

@Component({
  selector: 'lib-multi-checkbox-filter',
  templateUrl: './multi-select-checkbox-filter.component.html',
})
export class MultiCheckboxFilterComponent implements OnInit, OnDestroy {
  @Input() filterConfiguration: any;
  @Input() filterForm: FormGroup;
  viewValue: string = null;
  checkboxList = [];
  ngUnsubscribe = new Subject();

  constructor(private readonly contentPipe: RenderLabelPipe) {}

  /**
   * ngOnInit lifecycle hook
   */
  ngOnInit() {
    this.checkboxList = this.filterConfiguration.options.map((elem) => {
      return {
        value: elem,
        checked: this.isChecked(this.filterForm.get('filterValue').value, elem),
      };
    });
    this.listChange();
    this.filterForm.valueChanges
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe((val) => {
        this.checkboxList.forEach((elem) => {
          elem.checked = this.isChecked(
            this.filterForm.get('filterValue').value,
            elem
          );
        });
        this.listChange();
      });
  }

  /**
   * To display selected value
   */
  updateSelectedValue() {
    if (!this.filterConfiguration.showSelection) {
      const filterValue = this.filterForm.get('filterValue').value;
      if (filterValue) {
        this.viewValue =
          '(' +
          (filterValue?.length === this.filterConfiguration.options.length
            ? // If all boxes ticked show ALL
              this.contentPipe.transform('lbl_multi-select_selectall')
            : // else show the no. of boxes ticked
              filterValue.length) +
          ')';
      } else {
        // if value is null then use default value
        this.viewValue = this.filterConfiguration.defaultValue
          ? `(${this.filterConfiguration.defaultValue.length})`
          : '(0)';
      }
    } else {
      this.viewValue = '';
    }
  }

  /**
   * To toggle option checkbox
   */
  listChange() {
    const checkedItems = [];
    // Get total checked items
    this.checkboxList.forEach((elem) => {
      if (elem.checked) {
        checkedItems.push(elem.value);
      }
    });
    this.filterForm
      .get('filterValue')
      .setValue(checkedItems.length === 0 ? null : checkedItems, {
        emitEvent: false,
      });
    this.updateSelectedValue();
  }

  /**
   * ngOnDestroy lifecycle hook
   */
  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  /**
   * Checks if checkbox should be checked or not
   * @param filterValue Filter value (Array of string)
   * @param elem Checkbox element (Either string or object with value field)
   * @returns Boolean : If checkbox is checked or not
   */
  private isChecked(filterValue: string[], elem: any) {
    if (filterValue) {
      return filterValue.includes(elem.value) || filterValue.includes(elem);
    }
    return false;
  }
}
