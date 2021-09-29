// 9fbef606107a605d69c0edbcd8029e5d_SYMPHONY

import { AbstractControl, FormGroup, FormControl } from '@angular/forms';
import { DateRangeValidator } from './date-range.validator';

describe('DateRangeValidator', () => {
  it('should return error', () => {
    const nowDate = new Date();
    const control = { value: new Date().toISOString() };
    const otherDate = new Date(nowDate.setMonth(nowDate.getMonth() - 12));
    const otherControl = { value: otherDate.toISOString() };
    let result = DateRangeValidator.validateDateRange(
      otherControl as AbstractControl,
      6,
      'months'
    )(control as AbstractControl);
    expect(result.range).toBeTruthy();
  });
  it('should not return error', () => {
    const nowDate = new Date();
    const control = { value: new Date().toISOString() };
    const otherDate = new Date(nowDate.setMonth(nowDate.getMonth() - 5));
    const otherControl = { value: otherDate.toISOString() };
    let result = DateRangeValidator.validateDateRange(
      otherControl as AbstractControl,
      6,
      'months'
    )(control as AbstractControl);
    expect(result).toBe(null);
  });

  it('should return error for timeunit days', () => {
    const nowDate = new Date();
    const control = { value: new Date().toISOString() };
    const otherDate = new Date(nowDate.setDate(nowDate.getDate() - 65));
    const otherControl = { value: otherDate.toISOString() };
    let result = DateRangeValidator.validateDateRange(
      otherControl as AbstractControl,
      59,
      'days'
    )(control as AbstractControl);
    expect(result.range).toBeTruthy();
  });

  it('should not return error for timeunit days', () => {
    const nowDate = new Date();
    const control = { value: new Date().toISOString() };
    const otherDate = new Date(nowDate.setDate(nowDate.getDate() - 50));
    const otherControl = { value: otherDate.toISOString() };
    let result = DateRangeValidator.validateDateRange(
      otherControl as AbstractControl,
      59,
      'days'
    )(control as AbstractControl);
    expect(result).toBe(null);
  });

  it('should return error for special case where moment API fails', () => {
    const nowDate = new Date('2020-12-31');
    const control = { value: nowDate.toISOString() };
    const otherDate = new Date('2020-06-30');
    const otherControl = { value: otherDate.toISOString() };
    let result = DateRangeValidator.validateDateRange(
      otherControl as AbstractControl,
      6,
      'months'
    )(control as AbstractControl);
    expect(result.range).toBeTruthy();
  });

  it('should return null  when custom range is selected but and one date is set', () => {
    const control = new FormGroup({
      filterValue: new FormControl(-1),
      startDate: new FormControl('2021/1/23'),
      endDate: new FormControl(null),
    });
    let result = DateRangeValidator.oneOfDateSelected(null)(control);
    expect(result).toBeNull();
  });

  it('should return null when custom range is selected but default value is set', () => {
    const control = new FormGroup({
      filterValue: new FormControl(-1),
      startDate: new FormControl(null),
      endDate: new FormControl(null),
    });
    let result = DateRangeValidator.oneOfDateSelected(7)(control);
    expect(result).toBeNull();
  });

  it('should return error when custom range is selected but date is not', () => {
    const control = new FormGroup({
      filterValue: new FormControl(-1),
      startDate: new FormControl(null),
      endDate: new FormControl(null),
    });
    let result = DateRangeValidator.oneOfDateSelected(null)(control);
    expect(result.dateNotSet).toBeTrue();
  });
});
