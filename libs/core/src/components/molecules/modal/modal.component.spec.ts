// 9fbef606107a605d69c0edbcd8029e5d_SYMPHONY
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalComponent } from './modal.component';
import { MatDialogModule } from '@angular/material/dialog';
import { RenderLabelPipe } from '../../../pipe/render-label/render-label.pipe';
import { Pipe, SimpleChange } from '@angular/core';

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
describe('ModalComponent', () => {
  let component: ModalComponent;
  let fixture: ComponentFixture<ModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [MatDialogModule],
      providers: [
        {
          provide: RenderLabelPipe,
          useClass: mockPipe({ name: 'content' }),
        },
      ],
      declarations: [ModalComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('ngOnChanges should call toggleModal only when opened an component value is different from previous value', () => {
    let spy = spyOn(component, 'toggleModal');

    component.ngOnChanges({
      opened: new SimpleChange(null, null, false),
    });

    expect(spy).toHaveBeenCalledTimes(0);

    component.ngOnChanges({
      component: new SimpleChange(null, 'abc', false),
      opened: new SimpleChange(false, true, false),
    });
    expect(spy).toHaveBeenCalledTimes(2);
  });
});
