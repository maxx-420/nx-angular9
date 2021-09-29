// 9fbef606107a605d69c0edbcd8029e5d_SYMPHONY
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LearnMoreComponent } from './status-bar-learn-more.component';
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
});
