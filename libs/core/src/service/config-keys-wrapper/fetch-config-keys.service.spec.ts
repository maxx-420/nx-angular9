// 9fbef606107a605d69c0edbcd8029e5d_SYMPHONY
import { TestBed } from '@angular/core/testing';

import { FetchConfigKeysService } from './fetch-config-keys.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('FetchConfigKeysService', () => {
  let service: FetchConfigKeysService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [FetchConfigKeysService]
    });
    service = TestBed.inject(FetchConfigKeysService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
  it('call fetchConfigKeys', () => {
    const url = '';
    const body = '';
    const data = service.fetchConfigKeys(url, body);
    expect(data).toBeDefined();
  });
});
