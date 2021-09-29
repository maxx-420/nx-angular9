// 9fbef606107a605d69c0edbcd8029e5d_SYMPHONY
// open modal when api is unautheticated - 403
import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { MsalService } from '@azure/msal-angular';

import { CMSContentStoreService } from '../../../service/cms-content-store/cms-content-store.service';

import { AccessControlUtility } from './../../../utils/access-control.util';
import NavigationUtility from './../../../utils/navigationUtil';

@Component({
  selector: 'lib-unauthenticated-modal',
  templateUrl: './unauthenticated-modal.component.html',
  styleUrls: ['./unauthenticated-modal.component.scss'],
})
export class UnauthenticatedModalComponent {
  modalTitleText: string;
  FALLBACK_CONTENT: { key; value }[] = [
    {
      key: 'lbl_unauthenticated_modal_title',
      value: 'Invalid Session',
    },
    {
      key: 'lbl_unauthenticated_modal_content',
      value: 'You have been logged out due to an error. Please login again.',
    },
    {
      key: 'lbl_unauthenticated_modal_cta',
      value: 'Login',
    },
  ];
  authType = AccessControlUtility.getUserAuthType();

  constructor(
    public dialogRef: MatDialogRef<UnauthenticatedModalComponent>,
    private readonly _cmsContentStoreService: CMSContentStoreService,
    private msalService: MsalService
  ) {
    this._setFallbackContent();
  }

  /**
   * redirect to login landing page
   */
  redirectToLoginLandingPage() {
    this.dialogRef.close();
    NavigationUtility.logout(this.msalService, this.authType);
  }

  /**
   * @use : For initializing required contents in case no content found in Content Store
   * content-stub.json was loaded after the Invalid Session modal popup visible to user
   * and content did not got translated.
   * @reference : UPSGLD-5128
   *
   */
  private _setFallbackContent() {
    this.modalTitleText = this._cmsContentStoreService.getValue(
      'lbl_unauthenticated_modal_title'
    );

    /* istanbul ignore else */
    if (!this.modalTitleText) {
      this._cmsContentStoreService.setLabelsInStore(this.FALLBACK_CONTENT);
    }
  }
}
