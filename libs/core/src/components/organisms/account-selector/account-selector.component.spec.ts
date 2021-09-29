// 9fbef606107a605d69c0edbcd8029e5d_SYMPHONY
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountSelectorComponent } from './account-selector.component';
import { FormBuilder } from '@angular/forms';
import { RenderLabelPipe } from '../../../pipe/render-label/render-label.pipe';
import { Pipe } from '@angular/core';

function mockPipe(options: Pipe): Pipe {
  const metadata: Pipe = {
    name: options.name,
  };

  return <any>Pipe(metadata)(
    class MockPipe {
      transform() {}
    }
  );
}

describe('AccountSelectorComponent', () => {
  let component: AccountSelectorComponent;
  let fixture: ComponentFixture<AccountSelectorComponent>;
  const units = [
    {
      parentDetail: {
        id: '456',
        name: 'ciena',
      },
      companyDetail: [
        {
          id: '123',
          name: 'ciena us goods',
          productLine: [
            {
              name: 'GLD',
              serviceLine: [],
            },
          ],
          isDefaultUnit: true,
        },
        {
          id: '124',
          name: 'ciena defective',
          productLine: [
            {
              name: 'GLD',
              serviceLine: [],
            },
          ],
          isDefaultUnit: true,
        },
      ],
    },
    {
      parentDetail: null,
      companyDetail: [
        {
          id: '125',
          name: 'Amerock',
          productLine: [
            {
              name: 'GLD',
              serviceLine: ['PS'],
            },
            {
              name: 'GFF',
              serviceLine: [],
            },
          ],
          isDefaultUnit: false,
        },
      ],
    },
  ];

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AccountSelectorComponent, mockPipe({ name: 'content' })],
      providers: [FormBuilder, RenderLabelPipe],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AccountSelectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should test setOptionsList', () => {
    component.accountsList = units;
    component.setOptionsList();
    expect(component.allCompanyList.length).toEqual(3);
  });

  it('should test getFilteredList', () => {
    component.isSelectMultipleActive = false;
    component.actSelectorForm.get('searchValue').setValue('Amerock');
    component.accountsList = units;
    component.setOptionsList();
    const filteredList: [] = component.getFilteredList(
      component.allCompanyList
    );
    expect(filteredList.length).not.toEqual(0);
  });

  it('should test selectAccount', () => {
    component.accountsList = units;
    component.setOptionsList();
    component.selectAccount('125'); //From the static account list "units"
    expect(component.selectedAccount).toBeTruthy(
      'Cannot find the selected account'
    );
    expect(component.selectedAccount.name).toBe(
      'Amerock',
      'Wrong account selected'
    );
  });

  it('should set the account when account selector toggled', () => {
    component.isOpen = false;
    component.accountsList = units;
    const expectedCompanyGroup = units[0];
    const companies: any[] = expectedCompanyGroup.companyDetail;
    component.companyDetails = companies;
    fixture.detectChanges();

    component.setOptionsList();
    const ev = new Event('click');
    component.accountSelectorToggle(ev);
    fixture.detectChanges();
    expect(component.selectedAccount).toBeTruthy('Cannot set the account');
    expect(component.selectedAccount.id).toBe(
      expectedCompanyGroup.parentDetail.id
    );
    expect(component.selectedAccount.children.length).toBe(
      expectedCompanyGroup.companyDetail.length
    );
  });

  it('should reset search when account selector toggled', () => {
    component.isOpen = false;
    component.accountSelectorToggle(null);
    expect(component.actSelectorForm.get('searchValue').value).toBeNull();
  });

  it('should emit account selected event', (done: DoneFn) => {
    const expectedEmmission = {
      isDefaultUnit: true,
      unitid: '125',
    };
    component.accountSelected.subscribe((event) => {
      expect(event).toBeTruthy('No event received');
      expect(event).toEqual(expectedEmmission);
      done(); //Finishing the test case
    });

    component.setAccountSelected('125', true);
  });

  it('should set Selected Companies for multiple accounts', () => {
    const companies: any[] = units[0].companyDetail;
    component.companyDetails = companies;
    component.setSelectedCompanies();
    const childAccounts = component.actSelectorForm?.get('childAccounts');
    expect(childAccounts.value.length).toBe(companies.length);
  });

  it('should test toggleChange', () => {
    const companies: any[] = units[0].companyDetail;
    component.companyDetails = companies;
    component.setSelectedCompanies();
    const childAccounts = component.actSelectorForm?.get('childAccounts');
    expect(childAccounts.value.length).toBeGreaterThan(0);

    component.toggleChange(null);
    fixture.detectChanges();
    const childAccounts1 = component.actSelectorForm?.get('childAccounts');
    expect(childAccounts1.value).toBeFalsy("Couldn't reset the form");
  });
});
