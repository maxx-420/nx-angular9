// 9fbef606107a605d69c0edbcd8029e5d_SYMPHONY
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

import { InclusionService } from './inclusion.service';
import { default as SessionStorageUtility } from './../../utils/sessionStorage';
import { InclusionUtility } from '../../utils';
import { of, throwError } from 'rxjs';

describe('InclusionService', () => {
  let service: InclusionService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    service = TestBed.inject(InclusionService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should call the getInclusions', () => {
    service
      .getInclusions('/component', { module: 'hamburger' })
      .subscribe(() => { });

    const mockReq = httpMock.expectOne('/component?module=hamburger');

    expect(mockReq.request.method).toEqual('GET');
    expect(mockReq.request.responseType).toEqual('json');
  });

  it('should call updateInclusions', () => {
    service
      .updateInclusions(
        '/component',
        { module: 'hamburger', page: 'hamburger' },
        { componentList: [] }
      )
      .subscribe(() => { });

    const mockReq = httpMock.expectOne(
      '/component?module=hamburger&page=hamburger'
    );

    expect(mockReq.request.method).toEqual('PUT');
    expect(mockReq.request.responseType).toEqual('json');
  });

  it('should get the Inclusions from factory service', async () => {
    let mockResponse = {};

    spyOn(InclusionUtility, 'transformInclusions').and.returnValue({});
    spyOn(SessionStorageUtility, 'getUserProfile').and.returnValue({});
    spyOn(SessionStorageUtility, 'setUserProfile');
    spyOn(service, 'getInclusions').and.returnValue(
      of({
        companyDetails: {},
        errorDetails: [],
        inclusionDetails: [],
      })
    );

    await service
      .getInclusionFactoryService('', [], [])
      .then((response) => (mockResponse = response));

    expect(mockResponse).toEqual({
      companyDetails: {},
      errorDetails: [],
      inclusionDetails: [],
    });
  });

  it('should getInclusionFactoryService returns the error', async () => {
    let mockError = {};

    spyOn(service, 'getInclusions').and.returnValue(
      throwError('getInclusion-api-error')
    );

    await service.getInclusionFactoryService('').then(
      () => { },
      (error) => (mockError = error)
    );

    expect(mockError).toEqual('getInclusion-api-error');
  });

  it('should unsubscribe all the subscription when ngOnDestroy is called', () => {
    service.ngOnDestroy();

    expect(service.ngUnsubscribe.isStopped).toBe(true);
  });

  it('should getInclusionsAndFormat returns the error', async () => {
    let mockError = {};

    spyOn(service, 'getInclusions').and.returnValue(
      throwError('getInclusion-api-error')
    );

    service.getInclusionsAndFormat('').subscribe(
      () => { },
      (error) => (mockError = error)
    );

    expect(mockError).toEqual('getInclusion-api-error');
  });
});
