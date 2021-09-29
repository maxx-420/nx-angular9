// 9fbef606107a605d69c0edbcd8029e5d_SYMPHONY
import { SimpleChange } from '@angular/core';
import { async, ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { FormControl } from '@angular/forms';
import { SelectComponent } from './select.component';
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

describe('SelectComponent', () => {
  let component: SelectComponent;
  let fixture: ComponentFixture<SelectComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SelectComponent, mockPipe({ name: 'content' })],

    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should check all values', () => {
    const dummyModel = new FormControl();
    component.model = dummyModel;
    dummyModel.setValue(['abc']);
    component.optionLists = ['abc'];
    component.checkAll();
    fixture.detectChanges();
    expect(component.selectionCount).toEqual(component.selectAllValue);
  });

  it('should call changeValue', () => {
    spyOn(component, 'changeValue').and.callThrough();
    const data = {};
    component.model = new FormControl([]);
    component.changeValue(data);
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it('should call changeValue when variation is set to multiple and all options are selected ', () => {
    spyOn(component, 'changeValue').and.callThrough();
    spyOn(component, 'setSelectAllOption').and.returnValue(true);
    let spy = spyOn(component.selectionChange, 'emit');
    component.variation = 'multiple';
    const data = [];
    const dummyModel = new FormControl();
    component.model = dummyModel;
    dummyModel.setValue([]);
    component.changeValue(data);
    fixture.detectChanges();
    expect(spy).toHaveBeenCalled();
    expect(component.selectionCount).toEqual(component.selectAllValue);
  });

  it('should call changeValue when variation is set to multiple and not all options are selected ', () => {
    spyOn(component, 'changeValue').and.callThrough();
    spyOn(component, 'setSelectAllOption').and.returnValue(false);
    let spy = spyOn(component.selectionChange, 'emit');
    component.variation = 'multiple';
    const data = [];
    const dummyModel = new FormControl();
    component.model = dummyModel;
    dummyModel.setValue([]);
    component.changeValue(data);
    fixture.detectChanges();
    expect(spy).toHaveBeenCalled();
    expect(component.selectionCount).toEqual('0');
  });

  it('matSelectClick', () => {
    let spy = spyOn(component.selectClick, 'emit');
    component.clickFlag = true;
    component.matSelectClick();
    expect(spy).toHaveBeenCalledTimes(0);
    expect(component.clickFlag).toBe(true);

    component.clickFlag = false;
    component.matSelectClick();
    expect(spy).toHaveBeenCalled();
    expect(component.clickFlag).toBe(true);
  });

  it('should call toggleAllSelection when checked', () => {
    const dummyModel = new FormControl([]);
    component.model = dummyModel;
    component.toggleAllSelection(true);
    fixture.detectChanges();
    expect(component.selectionCount).toEqual(component.selectAllValue);
  });

  it('should call toggleAllSelection when unchecked', () => {
    const dummyModel = new FormControl();
    component.model = dummyModel;
    dummyModel.setValue([]);
    component.toggleAllSelection(false);
    fixture.detectChanges();
    expect(component.selectionCount).toBe('0');
  });

  it('should detect changes and select specific values initially', () => {
    spyOn(component, 'ngOnChanges').and.callThrough();
    const dummyModel = new FormControl();
    component.model = dummyModel;
    component.initialSelected = [];
    component.optionLists = [];
    component.ngOnChanges({ optionLists: new SimpleChange(null, [], null) });
    fixture.detectChanges();
    expect(component.selectionCount).toBe(component.selectAllValue);
    component.optionLists = [{}];
    component.model.setValue([]);
    component.ngOnChanges({ optionLists: new SimpleChange([], [{}], null) });
    expect(component.selectionCount).toBe('0');
  });

  it('should call setSelectAllOption', () => {
    const dummyModel = new FormControl();
    dummyModel.setValue([]);
    component.model = dummyModel;
    component.optionLists = [];
    let val = component.setSelectAllOption();
    expect(val).toBeFalsy();
  });
});

describe('SelectComponent - Search', () => {
  let component: SelectComponent;
  let fixture: ComponentFixture<SelectComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SelectComponent, mockPipe({ name: 'content' })],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectComponent);
    component = fixture.componentInstance;
    component.variation = component.searchableSingleSelect;
    const dummyModel = new FormControl();
    component.model = dummyModel;
    dummyModel.setValue(['1']);
    component.optionLists = [
      {value: '1', viewValue: '1'},
      {value: '2', viewValue: '2'},
      {value: '3', viewValue: '3'},
      {value: '4', viewValue: '4'},
      {value: '5', viewValue: '5'},
      {value: '6', viewValue: '6'},
      {value: '7', viewValue: '7'},
      {value: '8', viewValue: '8'},
      {value: '9', viewValue: '9'},
      {value: '10', viewValue: '10'},
    ];
  });

  it('should emit filtered optionsList based on optionsLimit size', () => {
    component.optionsLimit = 5;
    fixture.detectChanges();
    component.filteredOptionLists.subscribe((value) =>
      expect(value).toEqual([
        { value: '1', viewValue: '1' },
        { value: '2', viewValue: '2' },
        { value: '3', viewValue: '3' },
        { value: '4', viewValue: '4' },
        { value: '5', viewValue: '5' },
      ])
    );
  });

  it('should emit filtered optionsList based on optionsLimit and search keyword', fakeAsync(() => {
    component.optionsLimit = 5;
    fixture.detectChanges();
    component.modelFilterControl.setValue('2');
    tick(200);
    component.filteredOptionLists.subscribe((value) =>
      expect(value).toEqual([{ value: '2', viewValue: '2' },])
    );
  }));

  it('should emit filtered optionsList based on optionsLimit and empty search keyword', fakeAsync(() => {
    component.optionsLimit = 5;
    fixture.detectChanges();
    component.modelFilterControl.setValue('');
    tick(200);
    component.filteredOptionLists.subscribe((value) =>
      expect(value).toEqual([
        { value: '1', viewValue: '1' },
        { value: '2', viewValue: '2' },
        { value: '3', viewValue: '3' },
        { value: '4', viewValue: '4' },
        { value: '5', viewValue: '5' },
      ])
    );
  }));

  it('should emit filtered optionsList based on empty search keyword', fakeAsync(() => {
    fixture.detectChanges();
    component.modelFilterControl.setValue('');
    tick(200);
    component.filteredOptionLists.subscribe((value) =>
      expect(value).toEqual([
        {value: '1', viewValue: '1'},
        {value: '2', viewValue: '2'},
        {value: '3', viewValue: '3'},
        {value: '4', viewValue: '4'},
        {value: '5', viewValue: '5'},
        {value: '6', viewValue: '6'},
        {value: '7', viewValue: '7'},
        {value: '8', viewValue: '8'},
        {value: '9', viewValue: '9'},
        {value: '10', viewValue: '10'},
      ])
    );
  }));

  it('should emit filtered optionsList based on search keyword', fakeAsync(() => {
    fixture.detectChanges();
    component.modelFilterControl.setValue('6');
    tick(200);
    component.filteredOptionLists.subscribe((value) =>
      expect(value).toEqual([{value: '6', viewValue: '6'},]));
  }));

  it('should call handleSelectToggle', () => {
    fixture.detectChanges();
    component.handleSelectToggle();
    component.selectToggleChange.subscribe((value) => expect(value).toBeTrue());
  });
});
