// 9fbef606107a605d69c0edbcd8029e5d_SYMPHONY
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BuListComponent } from './bu-list.component';

describe('BuListComponent', () => {
  let component: BuListComponent;
  let fixture: ComponentFixture<BuListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [BuListComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BuListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
