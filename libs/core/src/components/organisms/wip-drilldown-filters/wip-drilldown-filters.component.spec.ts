
// 9fbef606107a605d69c0edbcd8029e5d_SYMPHONY

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WIPDrilldownFiltersComponent } from './wip-drilldown-filters.component';
import { Pipe } from '@angular/core';
import { FormBuilder } from '@angular/forms';

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

describe('WIPDrilldownFiltersComponent', () => {
  let component: WIPDrilldownFiltersComponent;
  let fixture: ComponentFixture<WIPDrilldownFiltersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      providers: [
        FormBuilder
      ],
      declarations: [ WIPDrilldownFiltersComponent, mockPipe({ name: 'content' }) ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WIPDrilldownFiltersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
