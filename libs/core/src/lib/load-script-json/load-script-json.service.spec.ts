// 9fbef606107a605d69c0edbcd8029e5d_SYMPHONY
import { TestBed } from '@angular/core/testing';

import { LoadScriptJsonService } from './load-script-json.service';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';

describe('LoadScriptJsonService', () => {
  let service: LoadScriptJsonService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [LoadScriptJsonService],
    });
    service = TestBed.inject(LoadScriptJsonService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    service.ngOnDestroy();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should load all scripts', () => {
    service.loadAll([
      {
        path: 'gldinbound',
        web_https_port: 7050,
        web_http_port: 7051,
      },
    ]);
    const req = httpMock.expectOne('gldinbound/scripts.json');
    expect(req.request.method).toEqual('GET');
    httpMock.verify();
  });
});
