// 9fbef606107a605d69c0edbcd8029e5d_SYMPHONY

import { TestBed, ComponentFixture } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { UserCustomizeCardsComponent } from './user-customize-cards.component';
import { ReactiveFormsModule, FormBuilder } from '@angular/forms';
import { RenderLabelPipe } from '../../../pipe/render-label/render-label.pipe';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { applyButtonTextConfig } from './user-customize-cards.component.config';
import { Pipe, SimpleChanges, SimpleChange } from '@angular/core';
import { CommonUtility } from '../../../utils';
import { InclusionService } from '../../../service/inclusion-service/inclusion.service';
import { of, throwError } from 'rxjs';

describe('UserCustomizeCards', () => {
  let component: UserCustomizeCardsComponent;
  let fixture: ComponentFixture<UserCustomizeCardsComponent>;
  let inclusionService: InclusionService;

  const selectorPanelComponentList = [
    { id: 'abc', isDisplay: false, viewValue: 'ABC' },
    { id: 'def', isDisplay: false, viewValue: 'DEF' },
  ];

  function mockPipe(options: Pipe): Pipe {
    const metadata: Pipe = {
      name: options.name,
    };

    return <any>Pipe(metadata)(
      class MockPipe {
        transform() {}
      }
    );
  }

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        ReactiveFormsModule,
        HttpClientTestingModule,
      ],
      declarations: [
        UserCustomizeCardsComponent,
        mockPipe({ name: 'content' }),
      ],
      providers: [FormBuilder, InclusionService, RenderLabelPipe],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserCustomizeCardsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    component.selectorPanelComponentList = selectorPanelComponentList;
    inclusionService = TestBed.inject(InclusionService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should test togglePreferenceSlideout when is close clicked is false', () => {
    component.showPreferencePanel = false;
    component.togglePreferenceSlideout(false);
    expect(component.showNotification).toBeFalsy();
  });

  it('togglePreferenceSlideout should toggle showPreferencePanel', () => {
    spyOn(CommonUtility, 'focusComponent');
    spyOn(CommonUtility, 'updateStylingForHeaderBanner');
    component.showPreferencePanel = false;
    component.isMobile = false;
    component.togglePreferenceSlideout();
    expect(component.showPreferencePanel).toBeTrue();

    component.togglePreferenceSlideout();
    expect(component.showPreferencePanel).toBeFalse();
  });

  it('togglePreferenceSlideout should enable apply button', () => {
    spyOn(CommonUtility, 'updateStylingForHeaderBanner');
    component.showPreferencePanel = true;
    component.isMobile = false;
    component.togglePreferenceSlideout();
    expect(component.isApplyBtnDisabled).toBeFalse();
    expect(component.disabled).toBeFalse();
    expect(component.applyButtonText).toEqual(applyButtonTextConfig.apply);
  });

  it('togglePreferenceSlideout should call focusComponet if panel is closed ', () => {
    let spy = spyOn(CommonUtility, 'focusComponent');
    component.showPreferencePanel = false;
    component.isMobile = false;
    component.togglePreferenceSlideout();
    expect(spy).toHaveBeenCalled();
  });

  it('togglePreferenceSlideout should call focusComponet on closeClicked', () => {
    let spy = spyOn(CommonUtility, 'focusComponent');
    component.showPreferencePanel = true;
    component.isMobile = false;
    component.prevFocusElement = document.activeElement;
    component.togglePreferenceSlideout(true);
    expect(spy).toHaveBeenCalled();
  });

  it('togglePreferenceSlideout should call addRemoveScrollClassFromPanel for mobile', () => {
    let spy = spyOn(CommonUtility, 'addRemoveScrollClassFromPanel');
    component.showPreferencePanel = false;
    component.isMobile = true;
    component.togglePreferenceSlideout(true);
    expect(spy).toHaveBeenCalled();
  });

  it('should disableApplyButton', () => {
    component.disableApplyButton();
    expect(component.isApplyBtnDisabled).toBeTruthy();
    expect(component.applyButtonText).toEqual(applyButtonTextConfig.applying);
  });

  it('should enableApplyButton', () => {
    component.enableApplyButton();
    expect(component.isApplyBtnDisabled).toBeFalsy();
    expect(component.applyButtonText).toEqual(applyButtonTextConfig.apply);
  });

  it('should hide the notification', () => {
    component.hideNotificationBar();
    expect(component.showNotification).toBeFalsy();
  });

  it('should reset Preferences', () => {
    component.resetPreferences();
    component.selectorPanelComponentList.forEach((I) => {
      expect(I.isDisplay).toBeTruthy();
    });
  });

  it('onApplyClick should disableApplyButton', () => {
    spyOn(inclusionService, 'updateInclusions').and.returnValue(of({}));
    component.onApplyClick();
    expect(component.isApplyBtnDisabled).toBeTrue();
  });

  it('onApplyClick should emit preferenceUpdate on updateInclusion success', () => {
    spyOn(inclusionService, 'updateInclusions').and.returnValue(of({}));
    let returnVal = false;
    component.preferencesUpdated.subscribe(() => {
      returnVal = true;
    });
    component.onApplyClick();
    expect(returnVal).toBeTrue();
  });

  it('onApplyClick should show notification and enable apply button on updateInclusion fail', () => {
    spyOn(inclusionService, 'updateInclusions').and.returnValue(
      throwError('Failure')
    );
    component.onApplyClick();
    expect(component.showNotification).toBeTrue();
    expect(component.isApplyBtnDisabled).toBeFalse();
  });

  it('ngOnChanges should set selectorPanelComponentList', () => {
    expect(component.selectorPanelComponentList.length).toBe(2);
    let selectorPanelComponentList = CommonUtility.deepClone(
      component.selectorPanelComponentList
    );
    selectorPanelComponentList.push({
      id: 'xyz',
      isDisplay: true,
      viewValue: 'XYZ',
    });
    component.ngOnChanges(<SimpleChanges>{
      selectorPanelConfiguration: new SimpleChange(
        component.selectorPanelComponentList,
        selectorPanelComponentList,
        false
      ),
    });
    expect(component.selectorPanelComponentList.length).toBe(3);
  });

  it('ngOnChanges should set isDisabled to false', () => {
    component.showPreferencePanel = false;
    component.ngOnChanges(<SimpleChanges>{
      showPreferencePanel: new SimpleChange(true, false, false),
    });
    expect(component.disabled).toBeFalse();
  });
});
