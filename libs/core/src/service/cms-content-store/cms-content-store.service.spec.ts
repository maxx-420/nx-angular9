// 9fbef606107a605d69c0edbcd8029e5d_SYMPHONY
import { TestBed } from '@angular/core/testing';

import { CMSContentStoreService } from './cms-content-store.service';

describe('CMSContentStoreService', () => {
  let service: CMSContentStoreService;
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CMSContentStoreService],
    }).compileComponents();
  });
  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CMSContentStoreService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
  it('should return expected labels by calling once', () => {
    const data = [
      {
        key: 'lbl_digital_dashboard',
        value: 'Dashboard',
      },
      {
        key: 'lbl_digital_logistics',
        value: 'Logistics',
      },
    ] as any;
    service.setLabelsInStore(data);
    const  translation = service.getValue('lbl_digital_logistics');
    expect(translation).toEqual('Logistics');
  });

  it('should call getValue', () => {
    const key = service.getValue('lbl_digital_logistics');
    expect(key).toEqual('');
  });
  it('should call getValue with no value', () => {
    const key = service.getValue('');
    expect(key).toEqual('');
  });
  it('should call getContent', () => {
    const key = 'lbl_digital_logistics';
    service.getContent('lbl_digital_logistics');
    expect(key).toEqual('lbl_digital_logistics');
  });
  it('should call getContent with no value', () => {
   const key =  service.getContent('');
   service.getContent('');
    expect(key).toEqual('');
  });
});
