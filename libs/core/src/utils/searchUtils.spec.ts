// 9fbef606107a605d69c0edbcd8029e5d_SYMPHONY
import SearchUtility from './searchUtils';
import { FormGroup, FormBuilder } from '@angular/forms';
import { AccessControlUtility } from './access-control.util';
import { searchByOptions } from '../global-config/search-inclusion.config';

describe('SearchUtility', () => {
  it('checkForClearControl', () => {
    let searchForm: FormGroup;
    let fb = new FormBuilder();
    searchForm = fb.group({
      searchBy: [''],
      searchTerm: [''],
    });
    expect(SearchUtility.checkForClearControl(searchForm, 'searchBy')).toBe(
      false
    );
    searchForm = fb.group({
      searchBy: ['item'],
      searchTerm: [''],
    });
    expect(SearchUtility.checkForClearControl(searchForm, 'searchBy')).toBe(
      true
    );
  });

  it('getSearchBtnStyle', () => {
    expect(SearchUtility.getSearchBtnStyle()).toEqual({
      width: '52px',
      'padding-top': '11px',
      'padding-bottom': '11px',
      'padding-right': '10px',
      'padding-left': '10px',
      'min-width': '30px',
    });
  });

  it('setHeadersSearchOptions', () => {
   spyOn(AccessControlUtility, 'getCurrentFieldMapping').and.returnValue([
      searchByOptions
    ]);
    SearchUtility.setHeadersSearchOptions()
  });
});
