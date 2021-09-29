// 9fbef606107a605d69c0edbcd8029e5d_SYMPHONY

import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { MULTI_SELECT_ALL } from '../../../constants/global.constant';
import { RenderLabelPipe } from '../../../pipe/render-label/render-label.pipe';

@Component({
  selector: 'lib-status-filter',
  templateUrl: './milestone-filter.component.html',
  styleUrls: ['./milestone-filter.component.scss'],
})
export class MilestoneFilterComponent implements OnInit, OnDestroy {
  @Input() filterConfiguration: any;
  @Input() filterForm: FormGroup;
  @Input() showCount = false;
  viewValue: string = null;
  checkboxList = [];
  masterChecked = false;
  ngUnsubscribe = new Subject();
  subList: FormGroup = new FormGroup({});

  constructor(private readonly contentPipe: RenderLabelPipe) {}

  /**
   * ngOnInit lifecycle hook
   */
  ngOnInit() {
    this.checkboxList = this.filterConfiguration.options.map((elem) => {
      if (elem.subProperties) {
        this.subList.addControl(
          elem.value,
          new FormControl(this.filterForm.get('deliveryStatus').value)
        );
        this.subList
          .get(elem.value)
          .valueChanges.pipe(takeUntil(this.ngUnsubscribe))
          .subscribe((val) => {
            if (val) {
              this.checkboxList.find(
                (x) => x.value === elem.value
              ).checked = true;
              this.listChange();
              this.filterForm
                .get('deliveryStatus')
                .setValue(this.subList.get(elem.value).value, {
                  emitEvent: false,
                });
            }
          });
      }
      return {
        ...elem,
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
          this.subList
            .get(elem.value)
            ?.setValue(this.filterForm.get('deliveryStatus').value);
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
        // If value is not null
        this.viewValue =
          '(' +
          (filterValue.toString().toUpperCase() === MULTI_SELECT_ALL
            ? // if value is 'ALL' display 'ALL'
              this.contentPipe.transform('lbl_multi-select_selectall')
            : // if value is array then length of array
              filterValue.length) +
          ')';
      } else {
        // if value is null then use default value
        this.viewValue =
          '(' +
          (this.filterConfiguration.defaultValue.toString().toUpperCase() ===
          MULTI_SELECT_ALL
            ? // if default value is 'ALL' display 'ALL'
              this.contentPipe.transform('lbl_multi-select_selectall')
            : // if default value is array then length of array
              this.filterConfiguration.defaultValue.length) +
          ')';
      }
    } else {
      this.viewValue = '';
    }
  }

  /**
   * To toggle All checkbox
   */
  masterChange() {
    this.checkboxList.forEach((elem) => {
      elem.checked = this.masterChecked;
      if (!elem.checked && elem.subProperties) {
        this.subList.get(elem.value).setValue(null);
        this.filterForm
          .get('deliveryStatus')
          .setValue(null, { emitEvent: false });
      }
    });
    this.filterForm
      .get('filterValue')
      .setValue(this.masterChecked ? [MULTI_SELECT_ALL] : [], {
        emitEvent: false,
      }); // Emit ['ALL"] when all checkbox selected
    this.updateSelectedValue();
  }

  /**
   * To toggle option checkbox
   */
  listChange() {
    let checkedCount = 0;
    const checkedItems = [];
    // Get total checked items
    this.checkboxList.forEach((elem) => {
      if (elem.checked) {
        checkedCount++;
        checkedItems.push(elem.value);
      }
      if (!elem.checked && elem.subProperties) {
        this.subList.get(elem.value).setValue(null);
        this.filterForm
          .get('deliveryStatus')
          .setValue(null, { emitEvent: false });
      }
    });

    if (checkedCount === this.checkboxList.length) {
      // If checked count is equal to total items; then check the master checkbox
      this.masterChecked = true;
    } else {
      // If none of the checkboxes in the list is checked then uncheck master checkbox
      this.masterChecked = false;
    }
    this.filterForm
      .get('filterValue')
      .setValue(this.masterChecked ? [MULTI_SELECT_ALL] : checkedItems, {
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
   * @param filterValue Filter value
   * @param elem Checkbox element
   * @returns Boolean : If checkbox is checked or not
   */
  private isChecked(filterValue: any, elem: any) {
    if (filterValue) {
      if (filterValue.toString().toUpperCase() === MULTI_SELECT_ALL) {
        return true;
      } else {
        return filterValue.includes(elem.value);
      }
    }
    return false;
  }
}
