// 9fbef606107a605d69c0edbcd8029e5d_SYMPHONY
import {
  Component,
  EventEmitter,
  Input,
  NgZone,
  OnChanges,
  Output,
  Renderer2,
  SimpleChanges,
} from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

import { RenderLabelPipe } from '../../../pipe/render-label/render-label.pipe';
import { CommonUtility, ViewportUtility } from '../../../utils';
import { VIEWPORT_NAMES } from '../../../constants/viewport.constant';
import { InclusionService } from '../../../service/inclusion-service/inclusion.service';
import {
  IComponentList,
  ISelectorPanelConfiguration,
  IUpdateInclusionRequest,
} from '../../../model/interfaces/IInclusion';

import {
  applyButtonTextConfig,
  dataAutomationAttribute,
} from './user-customize-cards.component.config';

@Component({
  selector: 'lib-user-customize-cards',
  templateUrl: './user-customize-cards.component.html',
  styleUrls: ['./user-customize-cards.component.scss'],
})
export class UserCustomizeCardsComponent implements OnChanges {
  prevFocusElement: Element;
  isMobile: boolean = false;
  isBannerVisible: boolean = false;
  dataAutomationAttribute: any = dataAutomationAttribute;
  disabled: boolean = false;

  // Error notification handling
  showNotification: boolean = false;
  notifcationMessage: string = this._contentPipe.transform(
    'dpf_usrPref_unable_to_apply'
  );
  notificationType: string = 'error';

  preferenceForm: FormGroup = this.fb.group({});
  selectorPanelComponentList: Array<ISelectorPanelConfiguration> = [];
  applyButtonText: string = applyButtonTextConfig.apply;
  isApplyBtnDisabled: boolean = false;

  @Input() showPreferencePanel: boolean = false;
  @Input() page: string = '';
  @Input() module: string = '';
  @Input() selectorPanelConfiguration: Array<ISelectorPanelConfiguration> = [];
  @Input() updateInclusionURI: string;

  @Output() preferencesUpdated: EventEmitter<{
    page: string;
    module: string;
  }> = new EventEmitter();

  constructor(
    private readonly fb: FormBuilder,
    private readonly _renderer: Renderer2,
    private readonly zone: NgZone,
    private readonly _contentPipe: RenderLabelPipe,
    private readonly _inclusionService: InclusionService
  ) {
    this.isMobile = ViewportUtility.checkViewport(VIEWPORT_NAMES.mobile);
  }

  /**
   * Angular lifecycle hook
   */
  ngOnChanges(changes: SimpleChanges): void {
    if (
      changes.selectorPanelConfiguration?.currentValue &&
      !CommonUtility.deepEqual(
        this.selectorPanelComponentList,
        changes.selectorPanelConfiguration?.currentValue
      )
    ) {
      this.selectorPanelComponentList = CommonUtility.deepClone(
        changes.selectorPanelConfiguration.currentValue
      );
    }
    if (
      changes.showPreferencePanel?.previousValue !==
        changes.showPreferencePanel?.currentValue &&
      !this.showPreferencePanel
    ) {
      this.showPreferencePanel = true;
      this.togglePreferenceSlideout(true);
    }
  }

  /**
   * To display or hide the user preference slideout
   */
  togglePreferenceSlideout(isCloseClicked: boolean = false): void {
    // When overlay is closed, focus should return back to previously focused element.
    if (isCloseClicked) {
      // here will focus back to previous step
      if (this.prevFocusElement) {
        CommonUtility.focusComponent(
          this.zone,
          this._renderer,
          this.prevFocusElement
        );
      }
    }
    // When overlay is opened, focus should be on close button.
    if (!this.showPreferencePanel) {
      this.prevFocusElement = document.activeElement;
      CommonUtility.focusComponent(
        this.zone,
        this._renderer,
        'lib-user-customize-cards .closeBtn'
      );
    }

    if (this.isMobile) {
      CommonUtility.addRemoveScrollClassFromPanel(
        this._renderer,
        this.showPreferencePanel
      );
    }
    this.isBannerVisible = CommonUtility.updateStylingForHeaderBanner();
    this.showPreferencePanel = !this.showPreferencePanel;
    this.enableApplyButton();
    this.showNotification = false;
  }

  /**
   * On apply click save the selected preference using API call
   */
  onApplyClick(): void {
    // prepare Request payload, Optimize with Input only so that single format will be there
    // update state of apply button with Applying... and disabled
    // if Error show alert bar on top (check for css updates)
    // if success, update parent to fetch new inclusions and updated the view
    // close flyout

    this.disableApplyButton();
    const queryParams: any = {
      module: this.module,
      page: this.page,
    };
    const componentList: Array<IComponentList> = [];
    this.selectorPanelComponentList.forEach(
      (configuration: ISelectorPanelConfiguration): void => {
        componentList.push({
          id: configuration.id,
          isDisplay: configuration.isDisplay,
        });
      }
    );
    const body: IUpdateInclusionRequest = {
      componentList,
    };
    this._inclusionService
      .updateInclusions(this.updateInclusionURI, queryParams, body)
      .subscribe(
        (response: any): void => {
          this.preferencesUpdated.emit({
            page: this.page,
            module: this.module,
          });
        },
        (error: any): void => {
          this.showNotification = true;
          this.enableApplyButton();
        }
      );
  }

  /**
   * disable apply button and change text to applying
   */
  disableApplyButton(): void {
    this.isApplyBtnDisabled = true;
    this.applyButtonText = applyButtonTextConfig.applying;
    this.disabled = true;
  }

  /**
   * enable apply button and change text to Apply
   */
  enableApplyButton(): void {
    this.isApplyBtnDisabled = false;
    this.applyButtonText = applyButtonTextConfig.apply;
    this.disabled = false;
  }

  /**
   * Hides notification bar, callback for click of close button on notification msg bar
   */
  hideNotificationBar(): void {
    this.showNotification = false;
  }

  /**
   * Reset preference to select all the components
   */
  resetPreferences(): void {
    this.selectorPanelComponentList.forEach(
      (component: ISelectorPanelConfiguration): void => {
        component.isDisplay = true;
      }
    );
  }
}
