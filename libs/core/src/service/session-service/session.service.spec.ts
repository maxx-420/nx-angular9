// 9fbef606107a605d69c0edbcd8029e5d_SYMPHONY
import { TestBed } from '@angular/core/testing';

import { SessionService } from './session.service';
import { MatDialogModule } from '@angular/material/dialog';

describe('SessionService', () => {
  let service: SessionService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [MatDialogModule],
    });
    service = TestBed.inject(SessionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('openInvalidSessionModal when dialogRef is not null', () => {
    service.dialogRef = {
      afterClosed: () => {
        return true;
      },
    };
    let spy = spyOn(service.dialogRef, 'afterClosed');
    service.openInvalidSessionModal();
    expect(spy).toHaveBeenCalledTimes(0);
  });
});
