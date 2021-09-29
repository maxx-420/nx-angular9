// 9fbef606107a605d69c0edbcd8029e5d_SYMPHONY

/**
 * Reference:
 * ngx-mat-select-search
 * https://github.com/bithost-gmbh/ngx-mat-select-search
 */

import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  EventEmitter,
  forwardRef,
  Inject,
  Input,
  OnDestroy,
  OnInit,
  QueryList,
  ViewChild,
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { MatOption } from '@angular/material/core';
import { MatSelect } from '@angular/material/select';
import { Subject } from 'rxjs';
import { take, takeUntil } from 'rxjs/operators';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { DOWN_ARROW, UP_ARROW } from '@angular/cdk/keycodes';

import { UserAgentUtility } from '../../../../utils';

@Component({
  selector: 'lib-select-search-input',
  templateUrl: './select-search-input.component.html',
  styleUrls: ['./select-search-input.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => SelectSearchInputComponent),
      multi: true,
    },
  ],
  /*
    Change detection set to manual since multiple formControls and Input-MatSelect are binded to each other which
    produce ChangedAfterChecked error on automatic change detection cycle.
  */
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SelectSearchInputComponent
  implements OnInit, OnDestroy, ControlValueAccessor {
  /** Current search value */
  get value(): string {
    return this._value;
  }
  set value(value) {
    this._value = value;
  }
  /** Label of the search placeholder */
  @Input() placeholderLabel = '';

  /** Label to be shown when no entries are found. Set to null if no message should be shown. */
  @Input() noEntriesFoundLabel = '';

  /** Reference to the search input field */
  @ViewChild('searchInputField', { read: ElementRef })
  searchInputField: ElementRef;

  userAgentUtility = UserAgentUtility;

  /** Reference to the MatSelect options */
  public _options: QueryList<MatOption>;
  private _value: string;

  /** Event that emits when the current value changes */
  private readonly change = new EventEmitter<string>();

  /** Subject that emits when the component has been destroyed. */
  private readonly _onDestroy = new Subject<void>();

  constructor(
    @Inject(MatSelect) public matSelect: MatSelect,
    private readonly changeDetectorRef: ChangeDetectorRef,
    private readonly liveAnnouncer: LiveAnnouncer
  ) {}

  /**
   * onChange function assigned by ControlValueAccessor registerOnChange implemented method.
   */
  onChange(_?: any) {
    // Initially assigned to empty functions till ControlValueAccessor registers it.
  }

  /**
   * onTouched function assigned by ControlValueAccessor registerOnTouched implemented method.
   */
  onTouched(_?: any) {
    // Initially assigned to empty functions till ControlValueAccessor registers it.
  }

  /**
   * ngOnInit life cycle hook
   */
  ngOnInit() {
    // when the select dropdown panel is opened or closed
    this.matSelect.openedChange
      .pipe(takeUntil(this._onDestroy))
      .subscribe((opened) => {
        if (opened) {
          // focus the search field when opening
          this.focus();
        } else {
          // clear it when closing
          this.reset();
        }
      });

    // matSelect.options is undefined until matSelect is opened for first time
    this.matSelect.openedChange
      .pipe(take(1), takeUntil(this._onDestroy))
      .subscribe(() => {
        this._options = this.matSelect.options;
        this._options.changes.pipe(takeUntil(this._onDestroy)).subscribe(() => {
          /**
           * When any search is made the scroll will go to the top of the list and focus will be on the first element in the list.
           * Selection is not to change, only first value will be highlighted.
           */
          const keyManager = this.matSelect._keyManager;
          if (keyManager && this.matSelect.panelOpen) {
            // avoid "expression has been changed" error
            setTimeout(() => {
              keyManager.setFirstItemActive();
            });
          }
          // detect changes when matSelect optionList changes otherwise check for no results found lags one detection cycle behind
          this.changeDetectorRef.detectChanges();
        });
      });

    // detect changes when the input changes
    this.change.pipe(takeUntil(this._onDestroy)).subscribe(() => {
      this.changeDetectorRef.detectChanges();
    });
  }

  /**
   * ngOnDestroy life cycle hook
   */
  ngOnDestroy() {
    this._onDestroy.next();
    this._onDestroy.complete();
  }

  /**
   * Function implementation for ControlValueAccessor interface
   */
  registerOnChange(fn) {
    this.onChange = fn;
  }

  /**
   * Function implementation for ControlValueAccessor interface
   */
  registerOnTouched(fn) {
    this.onTouched = fn;
  }

  /**
   * Handles the key down event with MatSelect.
   * Allows e.g. selecting with enter key, navigation with arrow keys, etc.
   * @param event keyboard event
   */
  handleKeydown(event: KeyboardEvent) {
    if (event.keyCode === 32) {
      // do not propagate spaces to MatSelect, as this would select the currently active option
      event.stopPropagation();
    }
  }

  /**
   * Handles the key up event with MatSelect.
   * @param event keyboard event
   */
  handleKeyup(event: KeyboardEvent) {
    if (event.keyCode === UP_ARROW || event.keyCode === DOWN_ARROW) {
      /**
       * Added to allow the announcing of the currently activeDescendant (highlighted option) by screen readers.
       */
      const ariaActiveDescendantId = this.matSelect._getAriaActiveDescendant();
      const activeDescendant = this._options
        .toArray()
        .find((item) => item.id === ariaActiveDescendantId);
      this.liveAnnouncer.announce(activeDescendant.viewValue);
    }
  }

  /**
   * Function implementation for ControlValueAccessor interface
   */
  writeValue(value: string) {
    const valueChanged = value !== this._value;
    if (valueChanged) {
      this._value = value;
      this.change.emit(value);
    }
  }

  /**
   * Update ControlValueAccessor value on input change event and notifies changes.
   *
   * From registerOnChange docs:
   *
   * Called when the control's value changes in the UI.
   * This method is called by the forms API on initialization to update the form model when values propagate from the view to the model.
   * When implementing the registerOnChange method in your own value accessor,
   * save the given function so your class calls it at the appropriate time.
   */
  onInputChange(value) {
    const valueChanged = value !== this._value;
    if (valueChanged) {
      this._value = value;
      this.onChange(value);
      this.change.emit(value);
    }
  }

  /**
   * Update ControlValueAccessor value on blur event.
   *
   * From registerOnTouched docs:
   *
   * Called by the forms API on initialization to update the form model on blur.
   * When implementing registerOnTouched in your own value accessor, save the given function so your class calls it when
   * the control should be considered blurred or "touched".
   */
  onBlur(value: string) {
    this.writeValue(value);
    this.onTouched();
  }

  /**
   * Focuses the search input field
   */
  public focus() {
    if (!this.searchInputField) {
      return;
    }
    // save and restore scrollTop of panel, since it will be reset by focus()
    const panel = this.matSelect.panel.nativeElement;
    const scrollTop = panel.scrollTop;

    // focus
    this.searchInputField.nativeElement.focus();

    panel.scrollTop = scrollTop;
  }

  /**
   * Resets the current search value
   * @param focus boolean whether to focus after resetting
   */
  public reset(focus = false) {
    if (!this.searchInputField) {
      return;
    }
    this.searchInputField.nativeElement.value = '';
    this.onInputChange('');
    if (focus) {
      this.focus();
    }
  }
}
