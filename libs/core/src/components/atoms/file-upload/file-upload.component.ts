// 9fbef606107a605d69c0edbcd8029e5d_SYMPHONY
// file upload component

import { Component, forwardRef, Input, ViewEncapsulation } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

const CUSTOM_VALUE_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => FileUploadComponent),
  multi: true,
};

@Component({
  selector: 'lib-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.scss'],
  encapsulation: ViewEncapsulation.None,
  providers: [CUSTOM_VALUE_ACCESSOR],
})
export class FileUploadComponent implements ControlValueAccessor {
  @Input() errors;
  @Input() timeStamp;
  @Input() errorFileSizeMessage;
  @Input() errorFileTypeMessage;
  @Input() errorFileDuplicateMessage;

  private onChange: (_: any) => {};
  private onTouched: (_: any) => {};

  private _value = undefined;
  set value(value) {
    this._value = Array.from(value);
    this.onChange(this._value);
    this.onTouched(this._value);
  }
  get value() {
    return this._value;
  }

  /**
   * writeValue
   * @param value value
   */
  writeValue(value: any): void {
    // intentional ommision
  }

  /**
   * upon UI element value changes, this method gets triggered
   * @param fn function
   */
  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  /**
   * upon touching the element, this method gets triggered
   * @param fn function
   */
  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  /**
   * on input file change
   * @param $event event
   */
  onInputChange($event) {
    this.value = Array.from($event.target.files);
  }

  /**
   * on file drop
   * @param files files
   */
  onFileDropped(files) {
    this.value = Array.from(files);
  }

  /**
   * set disables state
   * @param isDisabled is disabled
   */
  setDisabledState(isDisabled: boolean) {
    // intentional omission
  }

  /**
   * remove file name
   * @param fileName file name
   */
  removeFile(fileName) {
    const files = Array.from(this.value).map((file: File) => file.name);
    this._value.splice(files.indexOf(fileName), 1);
    this.onChange(this._value);
    this.onTouched(this._value);
  }
}
