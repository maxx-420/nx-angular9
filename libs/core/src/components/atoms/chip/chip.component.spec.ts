import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChipComponent } from './chip.component';
import { RenderLabelPipe } from 'libs/core/src/pipe/render-label/render-label.pipe';

describe('ChipComponent', () => {
  let component: ChipComponent;
  let fixture: ComponentFixture<ChipComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ChipComponent, RenderLabelPipe],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChipComponent);
    component = fixture.componentInstance;
    component.filterItem = {
      filterKey: 'shipmentCreation',
      filterLabel: 'lbl_shipment_createdOnDate',
      filterValue: 'Last 14 Days',
      isDefault: false,
    };
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('removeSelectedItem should emit event', () => {
    spyOn(component, 'removeSelectedItem').and.callThrough();
    fixture.detectChanges();
    component.removeSelectedItem({});
    expect(component).toBeTruthy();
  });
});
