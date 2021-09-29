import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { SimpleChanges, SimpleChange, Pipe } from '@angular/core';

import { LearnMoreComponent } from './learn-more.component';
import { ViewportUtility } from '../../../utils';
import { LearnMoreTypes } from '../../../enum/learnMore.enum';

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

describe('LearnMoreComponent', () => {
  let component: LearnMoreComponent;
  let fixture: ComponentFixture<LearnMoreComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [LearnMoreComponent, mockPipe({ name: 'content' })],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LearnMoreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('onViewDataClick should toggle', () => {
    expect(component.isViewDataClicked).toBeFalse();

    component.onViewDataClick();
    expect(component.isViewDataClicked).toBeTrue();
  });
  it('onModalClose should emit event', () => {
    component.modalClosed.subscribe(() => {
      returnVal = true;
    });
    let returnVal = false;
    component.onModalClose({});
    expect(component.isViewDataClicked).toBeTrue();
    expect(returnVal).toBeTrue();
  });
  it('onTableRowClick should emit event', () => {
    component.tableRowClicked.subscribe(() => {
      returnVal = true;
    });
    let returnVal = false;
    component.onTableRowClick({});
    expect(returnVal).toBeTrue();
  });
  it('setChartModalParameters should set isMultiColumnOrTableLayout to true', () => {
    component.learnMoreType = LearnMoreTypes.MultiColumn;
    component.setChartModalParameters();
    expect(component.isMultiColumnOrTableLayout).toBeTrue();

    component.learnMoreType = LearnMoreTypes.MultipleTables;
    component.setChartModalParameters();
    expect(component.isMultiColumnOrTableLayout).toBeTrue();
  });

  it('setChartModalParameters should set showSubValueColumn to true', () => {
    component.learnMoreType = LearnMoreTypes.TwoColumnsWithSubValue;
    component.setChartModalParameters();
    expect(component.showSubValueColumn).toBeTrue();
  });
  it('setChartModalParameters should not set', () => {
    component.setChartModalParameters();
    expect(component.showSubValueColumn).toBeFalse();
    expect(component.isMultiColumnOrTableLayout).toBeFalse();
  });
  it('should set isDesktopDevice to true', () => {
    expect(component.isDesktopDevice).toBeFalse();
    spyOn(ViewportUtility, 'checkViewport').and.returnValue(true);
    component.ngOnInit();
    expect(component.isDesktopDevice).toBeTrue();
  });
  it('ngOnChanges should call setChartModalParameters', () => {
    const spy = spyOn(component, 'setChartModalParameters').and.callThrough();
    component.ngOnChanges(<SimpleChanges>{
      learnMoreType: new SimpleChange(
        undefined,
        LearnMoreTypes.MultiColumn,
        false
      ),
    });
    expect(spy).toHaveBeenCalled();
  });
  it('ngOnChanges should not call setChartModalParameters', () => {
    const spy = spyOn(component, 'setChartModalParameters').and.callThrough();
    component.ngOnChanges(<SimpleChanges>{ learnMoreType: null });
    expect(spy).not.toHaveBeenCalled();

    component.ngOnChanges(null);
    expect(spy).not.toHaveBeenCalled();
  });
});
