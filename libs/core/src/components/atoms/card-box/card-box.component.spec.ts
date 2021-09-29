// 9fbef606107a605d69c0edbcd8029e5d_SYMPHONY
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CardBoxComponent } from './card-box.component';

describe('CardBoxComponent', () => {
  let component: CardBoxComponent;
  let fixture: ComponentFixture<CardBoxComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CardBoxComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CardBoxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('test header icons', () => {
    component.headericon = 'ship';
    expect(component.headericon).toBe('symphony-icons symphony-icons-ship');
    component.headericon = null;
    expect(component.headericon).toBe(null);
  });

  it('hideTooltip', () => {
    component.hideTooltip({
      relatedTarget: {
        closest: () => {
          return false;
        },
      },
    });
    expect(component.showInfoTooltip).toBe(false);

    component.showInfoTooltip = true;
    component.hideTooltip({
      relatedTarget: {
        closest: () => {
          return true;
        },
      },
    });
    expect(component.showInfoTooltip).toBe(true);
  });
});
