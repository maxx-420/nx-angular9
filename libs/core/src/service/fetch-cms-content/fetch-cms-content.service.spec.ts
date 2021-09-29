// 9fbef606107a605d69c0edbcd8029e5d_SYMPHONY
import { TestBed } from '@angular/core/testing';
import { HttpClient } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { Observable } from 'rxjs';
import { CMSContentStoreService } from '../cms-content-store/cms-content-store.service';
import { FetchCMSContentService } from './fetch-cms-content.service';

describe('FetchCMSContentService', () => {
  let service: FetchCMSContentService;

  const labels = {
    labelData: [
      {
        applicationId: 'digital-platform',
        value: [
          {
            key: 'lbl_digital_dashboard',
            value: 'Dashboard',
          },
          {
            key: 'lbl_digital_logistics',
            value: 'Logistics',
          },
        ],
      },
      {
        applicationId: 'gld-platform',
        value: [
          {
            key: 'lbl_gld_platform_inbound',
            value: 'IN',
          },
          {
            key: 'lbl_gld_platform_outbound',
            value: 'OUT',
          },
          {
            key: 'lbl_gld_platform_warehouse',
            value: 'Warehouse',
          },
          {
            key: 'lbl_gld_platform_order',
            value: 'Order',
          },
        ],
      },
    ],
    contentData: [
      {
        applicationId: 'symphony-sample-html-fragment',
        value: {
          headHtml: '',
          headerHtml: '',
          neckHtml: '',
          bodyHtml: '<h2>sample-html-fragment</h2>',
          rightRailHtml: '',
          ankleHtml: '',
          footerHtml: '',
        },
      },
    ],
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [FetchCMSContentService],
    }).compileComponents();
  });
  beforeEach(() => {
    TestBed.configureTestingModule({});

    TestBed.inject(HttpClient);
    service = TestBed.inject(FetchCMSContentService);
    TestBed.inject(CMSContentStoreService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('call fetchCMSData', () => {
    const url = '';
    const data = service.fetchCMSData(url);
    expect(data).toBeDefined();
  });

  it('call getCMSContent', () => {
    const url = '';
    const data = service.getCMSContent(url);
    expect(data).toBeDefined();
  });
  it('should return expected labels', () => {
    spyOn(service, 'fetchCMSData').and.callFake(() => {
      return new Observable((obj) => {
        obj.next(labels);
      });
    });
  });
  it('should return expected labels', () => {
    spyOn(service, 'fetchCMSData').and.callFake(() => {
      return new Observable((obj) => {
        obj.next(labels);
      });
    });
    const url = '';
    const data = service.getCMSContent(url);
    expect(data).toBeDefined();
  });
});
