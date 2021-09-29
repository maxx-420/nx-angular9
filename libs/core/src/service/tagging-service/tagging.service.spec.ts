// 9fbef606107a605d69c0edbcd8029e5d_SYMPHONY
import { TestBed } from '@angular/core/testing';

import { TaggingService } from './tagging.service';

describe('TaggingService', () => {
  let service: TaggingService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TaggingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
