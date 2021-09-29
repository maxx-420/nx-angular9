/* 9fbef606107a605d69c0edbcd8029e5d_SYMPHONY */
import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {ShipmentDetailsCardComponent} from './shipment-details-card.component';
import {Router} from '@angular/router';
import {RouterTestingModule} from '@angular/router/testing';

describe('ShipmentDetailsCardComponent', () => {
  let component: ShipmentDetailsCardComponent;
  let fixture: ComponentFixture<ShipmentDetailsCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule.withRoutes([{path: '**', redirectTo: ''}])],
      declarations: [ShipmentDetailsCardComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShipmentDetailsCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should navigate on clicking transportOrder Number', () => {
    const router = TestBed.inject(Router);
    const navigateSpy = spyOn(router, 'navigate');
    component.OnClickNavigate('1234');
    expect(navigateSpy).toHaveBeenCalled();
  });

  it('should assign true to showConsigneeField field', () => {
    component.milestoneData = {
      primaryDetail: {
        info: {
          consignee: 'Dave',
        },
      },
    };
    component.ngOnInit();
    expect(component.showConsigneeField).toBeTrue();
  });

  it('should assign false to showConsigneeField field', () => {
    component.milestoneData = {
      primaryDetail: {
        info: {
          upsWMSOrderNumber: 'Dave',
        },
      },
    };
    component.ngOnInit();
    expect(component.showConsigneeField).toBeFalse();
  });
});
