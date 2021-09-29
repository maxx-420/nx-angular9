// 9fbef606107a605d69c0edbcd8029e5d_SYMPHONY

import {
  Component,
  forwardRef,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import {
  FormControl,
  NG_VALUE_ACCESSOR,
  ReactiveFormsModule,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import {
  BrowserAnimationsModule,
  NoopAnimationsModule,
} from '@angular/platform-browser/animations';
import { MatFormFieldModule } from '@angular/material/form-field';
import { take, takeUntil } from 'rxjs/operators';
import { MatSelect, MatSelectModule } from '@angular/material/select';
import { SelectSearchInputComponent } from './select-search-input.component';
import { BehaviorSubject, Subject } from 'rxjs';

interface ListItem {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'select-search-test',
  template: `
    <mat-form-field>
      <mat-select [formControl]="selectCtrl">
        <lib-select-search-input [formControl]="selectFilterCtrl"></lib-select-search-input>
        <mat-option
          *ngFor="let list of filteredListItems | async"
          [value]="list.value"
        >
          {{ list.viewValue }}
        </mat-option>
      </mat-select>
    </mat-form-field>
  `,
})
export class SelectSearchTestComponent implements OnInit, OnDestroy {
  @ViewChild(MatSelect) matSelect: MatSelect;
  @ViewChild(SelectSearchInputComponent) selectSearch: SelectSearchInputComponent;

  // control for the selected ListItem
  public selectCtrl: FormControl = new FormControl();
  // control for the MatSelect filter keyword
  public selectFilterCtrl: FormControl = new FormControl();

  // list of ListItems
  private listItems: ListItem[] = [
    { viewValue: 'ListItem A', value: 'A' },
    { viewValue: 'ListItem B', value: 'B' },
    { viewValue: 'ListItem C', value: 'C' },
    { viewValue: 'ListItem DC', value: 'DC' },
  ];

  public filteredListItems: BehaviorSubject<ListItem[]> = new BehaviorSubject<
    ListItem[]
  >([]);

  // Subject that emits when the component has been destroyed.
  private _onDestroy = new Subject<void>();

  ngOnInit() {
    // load the initial ListItem list
    this.filteredListItems.next(this.listItems.slice());
    // listen for search field value changes
    this.selectFilterCtrl.valueChanges
      .pipe(takeUntil(this._onDestroy))
      .subscribe(() => {
        this.filterListItems();
      });
  }

  ngOnDestroy() {
    this._onDestroy.next();
    this._onDestroy.complete();
  }

  private filterListItems() {
    if (!this.listItems) {
      return;
    }

    // get the search keyword
    let search = this.selectFilterCtrl.value;
    if (!search) {
      this.filteredListItems.next(this.listItems.slice());
      return;
    } else {
      search = search.toLowerCase();
    }

    // filter the ListItems
    this.filteredListItems.next(
      this.listItems.filter(
        (ListItem) => ListItem.viewValue.toLowerCase().indexOf(search) > -1
      )
    );
  }
}

describe('SelectSearchInputComponent', () => {
  let component: SelectSearchTestComponent;
  let fixture: ComponentFixture<SelectSearchTestComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        CommonModule,
        NoopAnimationsModule,
        ReactiveFormsModule,
        MatFormFieldModule,
        MatSelectModule,
      ],
      declarations: [SelectSearchInputComponent, SelectSearchTestComponent],
      providers: [
        {
          provide: NG_VALUE_ACCESSOR,
          useExisting: forwardRef(() => SelectSearchInputComponent),
          multi: true,
        },
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectSearchTestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should populate options when opening the select', (done) => {
    component.filteredListItems.pipe(take(1)).subscribe(() => {
      // when the filtered ListItems are initialized
      fixture.detectChanges();
      component.matSelect.open();
      fixture.detectChanges();
      component.matSelect.openedChange.pipe(take(1)).subscribe((opened) => {
        expect(opened).toBe(true);
        expect(component.matSelect.options.length).toBe(4);
        done();
      });
    });
  });

  it('should filter the options by input "c" and reset the list', (done) => {
    component.filteredListItems.pipe(take(1)).subscribe(() => {
      // when the filtered ListItems are initialized
      fixture.detectChanges();
      component.matSelect.open();
      fixture.detectChanges();
      component.matSelect.openedChange.pipe(take(1)).subscribe((opened) => {
        expect(opened).toBe(true);
        expect(component.matSelect.options.length).toBe(4);
        // search for "c"
        component.selectSearch.onInputChange('c');
        fixture.detectChanges();
        expect(component.selectFilterCtrl.value).toBe('c');
        expect(component.matSelect.panelOpen).toBe(true);
        component.filteredListItems.pipe(take(1)).subscribe(() => {
          fixture.detectChanges();
          setTimeout(() => {
            expect(component.matSelect.options.length).toBe(2);
            expect(component.matSelect.options.first.value).toBe('C');
            component.selectSearch.reset(true);
            fixture.detectChanges();
            expect(component.matSelect.panelOpen).toBe(true);
            component.filteredListItems.pipe(take(1)).subscribe(() => {
              fixture.detectChanges();
              expect(component.matSelect.options.length).toBe(4);
              done();
            });
          });
        });
      });
    });
  });
});
