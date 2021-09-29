// 9fbef606107a605d69c0edbcd8029e5d_SYMPHONY
import { getTestBed, TestBed } from '@angular/core/testing';

import { HttpRequestInterceptor } from './http-request.interceptor';
import { RenderLabelPipe } from 'libs/core/src/pipe/render-label/render-label.pipe';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { MatDialogModule } from '@angular/material/dialog';
import { HttpClient, HTTP_INTERCEPTORS } from '@angular/common/http';
import LocalStorageUtility from '../../utils/localStorage';
import { API_HEADER_KEYS } from '../../constants';

describe('HttpInterceptorInterceptor', () => {
  let injector: TestBed;
  let http: HttpClient;
  let httpMock: HttpTestingController;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, MatDialogModule],
      providers: [
        {
          provide: HTTP_INTERCEPTORS,
          useClass: HttpRequestInterceptor,
          multi: true,
        },
        RenderLabelPipe,
      ],
    });
    injector = getTestBed();
    http = injector.inject(HttpClient);
    httpMock = injector.inject(HttpTestingController);
  });

  it('setHeaders', () => {
    LocalStorageUtility.set(API_HEADER_KEYS.X_XSRF_TOKEN, 'test');
    http
      .get('/abc', {
        headers: {
          'x-custom-test': 'test',
        },
      })
      .subscribe((res) => {
        console.log(res);
      });
    LocalStorageUtility.set(API_HEADER_KEYS.X_XSRF_TOKEN, 'test');
    const httpRequest = httpMock.expectOne('/abc');
    expect(httpRequest.request.headers.has('X-XSRF-TOKEN')).toEqual(true);
  });
});
