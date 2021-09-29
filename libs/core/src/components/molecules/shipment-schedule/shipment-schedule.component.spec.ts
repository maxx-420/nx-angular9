// 9fbef606107a605d69c0edbcd8029e5d_SYMPHONY

import { Pipe } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShipmentScheduleComponent } from './shipment-schedule.component';

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

describe('ShipmentScheduleComponent', () => {
  let component: ShipmentScheduleComponent;
  let fixture: ComponentFixture<ShipmentScheduleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        ShipmentScheduleComponent,
        mockPipe({ name: 'content' }),
        mockPipe({ name: 'dateFormatter' }),
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShipmentScheduleComponent);
    component = fixture.componentInstance;
    component.scheduleData = {
      data: null,
      isLoaded: true,
    };
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
