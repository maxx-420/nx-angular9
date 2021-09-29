// 9fbef606107a605d69c0edbcd8029e5d_SYMPHONY
import { TestBed, ComponentFixture } from '@angular/core/testing';
import { Component, Pipe } from '@angular/core';
import { PaginatorDirective } from './data-table-paginator.directive';
import { MatPaginatorModule } from '@angular/material/paginator';
import { RenderLabelPipe } from '../../../pipe/render-label/render-label.pipe';

@Component({
  selector: 'my-test-component',
  template: '',
})
class TestComponent {}
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

describe('Directive: HoverFocus', () => {
  let component: TestComponent;
  let fixture: ComponentFixture<TestComponent>;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [MatPaginatorModule],
      declarations: [TestComponent, PaginatorDirective],
      providers: [
        {
          provide: RenderLabelPipe,
          useClass: mockPipe({ name: 'content' }),
        },
      ],
    })
      .overrideComponent(TestComponent, {
        set: {
          template: `<mat-paginator
          libPaginator
        [hidePageSize]="true"
        [showTotalPages]="3"
        [pageSize]="10"
        (matPaginatorClicked)="matPaginatorClicked($event)"
        [length]="30"
        ></mat-paginator>`,
        },
      })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
