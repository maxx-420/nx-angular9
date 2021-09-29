// 9fbef606107a605d69c0edbcd8029e5d_SYMPHONY
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MsalService, MSAL_INSTANCE } from '@azure/msal-angular';

import { UnauthenticatedModalComponent } from './unauthenticated-modal.component';
import { Pipe } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { RouterTestingModule } from '@angular/router/testing';

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

describe('UnauthenticatedModalComponent', () => {
  let component: UnauthenticatedModalComponent;
  let fixture: ComponentFixture<UnauthenticatedModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      declarations: [
        UnauthenticatedModalComponent,
        mockPipe({ name: 'content' }),
      ],
      providers: [
        { provide: MatDialogRef, useValue: {} },
        { provide: MSAL_INSTANCE, useValue: undefined },
        { provide: MsalService, useValue: {} },
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UnauthenticatedModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
