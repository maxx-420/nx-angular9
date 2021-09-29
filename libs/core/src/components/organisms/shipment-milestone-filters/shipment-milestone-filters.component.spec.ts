// 9fbef606107a605d69c0edbcd8029e5d_SYMPHONY
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Pipe, SimpleChange } from '@angular/core';

import { ShipmentMilestoneFiltersComponent } from './shipment-milestone-filters.component';
import { ViewportUtility } from 'libs/core/src/utils';

function mockPipe(options: Pipe): Pipe {
  const metadata: Pipe = {
    name: options.name,
  };

  return <any>Pipe(metadata)(
    class MockPipe {
      transform() { }
    }
  );
}

describe('ShipmentMilestoneFiltersComponent', () => {
  let component: ShipmentMilestoneFiltersComponent;
  let fixture: ComponentFixture<ShipmentMilestoneFiltersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        ShipmentMilestoneFiltersComponent,
        mockPipe({ name: 'content' }),
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShipmentMilestoneFiltersComponent);
    component = fixture.componentInstance;
    component.milestones = [
      {
        id: 'All',
        name: 'SHIPMENT',
        shipmentCount: 567,
        order: 1,
      },
      {
        id: 'Warehouse',
        name: 'WAREHOUSE',
        shipmentCount: 122,
        order: 2,
      },
    ];
    component.selectedStep = 'All';
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should update selectedIndex on step selection', () => {
    component.onStepSelection(1);
    fixture.detectChanges();
    expect(component.selectedIndex).toBe(1);
  });

  it('should call ngOnChanges', () => {
    let step = 'booking';
    component.ngOnChanges({
      selectedStep: new SimpleChange(null, step, true),
    });
    fixture.detectChanges();
    expect(component.selectedStep).toEqual(step);
    step = '';
    component.ngOnChanges({
      selectedStep: new SimpleChange(null, step, true),
    });
    fixture.detectChanges();
    expect(component.selectedStep).toEqual(step);
  });

  it('test toSentenceCase', () => {
    let result = component.toSentenceCase(null);
    expect(result).toBeNaN();
    result = component.toSentenceCase('TEST');
    expect(result).toBe('Test');
  });

  it('test onWindowResize for tablet', () => {
    spyOn(component, 'onStepSelection').and.callThrough();
    component.onWindowResize();
    expect(component.onStepSelection).toHaveBeenCalledTimes(0);
    spyOn(ViewportUtility, 'getCurrentViewport').and.returnValue('tablet');
    component.isMobileDevice = true;
    component.selectedIndex = -1;
    component.onWindowResize();
    expect(component.onStepSelection).toHaveBeenCalledTimes(1);
  });

  it('test onWindowResize for mobile', () => {
    spyOn(ViewportUtility, 'getCurrentViewport').and.returnValue('mobile');
    component.isMobileDevice = false;
    component.selectedIndex = 0;
    component.onWindowResize();
    expect(component.selectedIndex).toEqual(-1);
  });
});
