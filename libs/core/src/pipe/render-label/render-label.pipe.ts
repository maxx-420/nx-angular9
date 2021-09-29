// 9fbef606107a605d69c0edbcd8029e5d_SYMPHONY
// render label pipe

import { Pipe, PipeTransform } from '@angular/core';

import { Key, Value } from '../../constants';
import { CMSContentStoreService } from '../../service/cms-content-store/cms-content-store.service';

@Pipe({ name: 'content' })
export class RenderLabelPipe implements PipeTransform {
  public constructor(
    private readonly _cmsContentStoreService: CMSContentStoreService
  ) {}

  /**
   * trasform method
   * @param key key
   * @param tokensToReplace tokensToReplace
   */
  public transform(key: string, tokensToReplace?): string {
    /**
     * Replace key with corresponding value.
     */
    let labelReplace = this._cmsContentStoreService.getValue(key);
    /**
     * If we have a token in cms data, and map its value with service data.
     */
    if (
      tokensToReplace &&
      Array.isArray(tokensToReplace) &&
      tokensToReplace.length > 0
    ) {
      tokensToReplace.forEach((tokenSet) => {
        const _token = `@@${tokenSet[Key]}@@`;

        if (labelReplace.indexOf(_token) !== -1) {
          labelReplace = labelReplace.replace(_token, tokenSet[Value]);
        }
      });
    }
    return labelReplace;
  }
}
