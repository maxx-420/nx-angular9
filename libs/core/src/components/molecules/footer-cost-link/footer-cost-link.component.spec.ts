import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Pipe } from '@angular/core';

import { FooterCostLinkComponent } from './footer-cost-link.component';

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

describe('FooterCostLinkComponent', () => {
  let component: FooterCostLinkComponent;
  let fixture: ComponentFixture<FooterCostLinkComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [FooterCostLinkComponent, mockPipe({ name: 'content' })],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FooterCostLinkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
