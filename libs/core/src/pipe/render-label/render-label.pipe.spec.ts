// 9fbef606107a605d69c0edbcd8029e5d_SYMPHONY
import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { CMSContentStoreService } from '../../service/cms-content-store/cms-content-store.service';

import { RenderLabelPipe } from './render-label.pipe';

describe('RenderLabelPipe', () => {
  let pipe: RenderLabelPipe;
  let cmsContentStoreService: CMSContentStoreService;

  const contentStore = {
    key: 'testing_content_with_token',
    value: '@@FIRST_TOKEN@@',
  };

  const tokenArray = [
    {
      key: 'FIRST_TOKEN',
      value: 'first token',
    },
    {
      key: 'SECOND_TOKEN',
      value: 'second token',
    },
  ];

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      declarations: [RenderLabelPipe],
      providers: [RenderLabelPipe],
    });
    pipe = TestBed.inject(RenderLabelPipe);
    cmsContentStoreService = TestBed.inject(CMSContentStoreService);
  });
  it('create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('if token value is available', () => {
    spyOn(cmsContentStoreService, 'getValue').and.callFake(() => {
      return 'first token';
    });
    const actual = pipe.transform(contentStore.key, tokenArray);
    expect(actual).toEqual('first token');
  });

  it('if token value is not available', () => {
    spyOn(cmsContentStoreService, 'getValue').and.callFake(() => {
      return '';
    });
    const actual = pipe.transform(contentStore.key, tokenArray);
    expect(actual).toEqual('');
  });
});
