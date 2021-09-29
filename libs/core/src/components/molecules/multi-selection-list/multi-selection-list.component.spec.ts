// 9fbef606107a605d69c0edbcd8029e5d_SYMPHONY
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { By } from '@angular/platform-browser';
import { Component, CUSTOM_ELEMENTS_SCHEMA, Pipe } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MultiSelectionListComponent } from './multi-selection-list.component';
import { RenderLabelPipe } from '../../../pipe/render-label/render-label.pipe';

@Component({
  selector: `host-component`,
  template: `
    <div [formGroup]="formGroup">
      <lib-multi-selection-list
        *ngIf="selectedAccount"
        formControlName="childAccounts"
        [listHeaderTitle]="selectedAccount?.name"
        [accountsList]="selectedAccount?.children"
        [showBackButton]="employeeAccount"
        (backClicked)="onBackClick()"
      ></lib-multi-selection-list>
    </div>
  `
})
class TestHostComponent {
  selectedAccount;
  employeeAccount;
  formGroup: FormGroup;

  constructor(private fb: FormBuilder) {
    this.formGroup = this.fb.group({
      childAccounts: []
    });
  }

  onBackClick() {

  }

}

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

describe('MultiSelectionListComponent', () => {
  let testHostComponent: TestHostComponent;
  let testHostFixture: ComponentFixture<TestHostComponent>;


  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        MatCheckboxModule,
        FormsModule,
        ReactiveFormsModule,
      ],
      declarations: [
        MultiSelectionListComponent,
        TestHostComponent,
        mockPipe({ name: 'content' }),
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      providers: [FormBuilder, RenderLabelPipe],
    }).compileComponents();
  }));

  beforeEach(() => {
    testHostFixture = TestBed.createComponent(TestHostComponent);
    testHostComponent = testHostFixture.componentInstance;
    testHostComponent.selectedAccount = {
      name: 'CIENA',
      children: [
        {
          "id": "445",
          "name": "CIENA-19458-US-GOOD",
          "productLine": null,
          "isDefaultUnit": false
        },
        {
          "id": "448",
          "name": "CIENA-19459-US-DEFECTIVE",
          "productLine": null,
          "isDefaultUnit": false
        },
        {
          "id": "451",
          "name": "CIENA-20339-US-QUARANTINE",
          "productLine": null,
          "isDefaultUnit": false
        },
      ]
    };

    testHostFixture.detectChanges();
  });

  it('should create', () => {
    expect(testHostComponent).toBeTruthy();
  });

  it('should set formValue', () => {
    let multiSelectionListComp: MultiSelectionListComponent  = testHostFixture.debugElement.query(By.directive(MultiSelectionListComponent))?.componentInstance;
    let spy = spyOn(multiSelectionListComp, 'writeValue');
    testHostComponent.formGroup.get('childAccounts').patchValue(['445', '448']);
    testHostFixture.detectChanges();
    expect(spy).toHaveBeenCalled();
  });

  it('should set disable', () => {
    let multiSelectionListComp: MultiSelectionListComponent  = testHostFixture.debugElement.query(By.directive(MultiSelectionListComponent))?.componentInstance;
    testHostComponent.formGroup.get('childAccounts').disable();
    testHostFixture.detectChanges();
    expect(multiSelectionListComp.disabled).toBeTruthy();
  });

  it('should trigger on scroll', () => {
    let multiSelectionListComp: MultiSelectionListComponent  = testHostFixture.debugElement.query(By.directive(MultiSelectionListComponent)).componentInstance;
    let spy = spyOn(multiSelectionListComp, 'setMaxHeight');
    multiSelectionListComp.myScrollContainer.nativeElement.dispatchEvent(new MouseEvent('scroll'));
    testHostFixture.detectChanges();
    expect(spy).toHaveBeenCalled();
  });

  it('should set next active item', () => {
    let multiSelectionListComp: MultiSelectionListComponent  = testHostFixture.debugElement.query(By.directive(MultiSelectionListComponent)).componentInstance;
    let spy = spyOn(multiSelectionListComp.keyManager, 'setNextItemActive');
    multiSelectionListComp.items.first.focus();
    testHostFixture.detectChanges();
    multiSelectionListComp.items.first._elementRef.nativeElement.dispatchEvent(new KeyboardEvent('keyup',{
      'code': 'Tab',
      'key': 'Tab',
    }))
    testHostFixture.detectChanges();
    expect(spy).toHaveBeenCalled();
  });

});
