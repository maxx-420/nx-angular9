// 9fbef606107a605d69c0edbcd8029e5d_SYMPHONY

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchBarComponent } from './search-bar.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { AnalyticsService } from '../../../service/analytics-wrapper/analytics.service';
import { RenderLabelPipe } from '../../../pipe/render-label/render-label.pipe';

import { NavigationService } from './../../../service/navigation/navigation.service';
import { Pipe } from '@angular/core';
import { default as SearchUtility } from './../../../utils/searchUtils';

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

describe('SearchBarComponent', () => {
  let component: SearchBarComponent;
  let fixture: ComponentFixture<SearchBarComponent>;
  let debugElement;
  let element;
  let mockNavigationService: NavigationService;
  let analyticsService: AnalyticsService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule,
        FormsModule,
        RouterTestingModule.withRoutes([{ path: '**', redirectTo: '' }]),
      ],
      declarations: [SearchBarComponent, mockPipe({ name: 'content' })],
      providers: [RenderLabelPipe, NavigationService, AnalyticsService],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchBarComponent);
    mockNavigationService = TestBed.inject(NavigationService);
    analyticsService = TestBed.inject(AnalyticsService);
    component = fixture.componentInstance;
    debugElement = fixture.debugElement;
    element = debugElement.nativeElement;
    fixture.detectChanges();
  });
  afterEach(() => {
    // destroy the component to cancel the timer again
    fixture.destroy();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should make searchFormUpdated emit true when search method is called', () => {
    let returnVal = false;
    component.searchFormUpdated.subscribe(() => (returnVal = true));
    component.search();
    expect(returnVal).toBe(true);
  });

  it('should not make search disabled if min character check is false and characters in value of searchTermFieldName is greater than 4', () => {
    component.isMinCharForSearchOption = true;
    component.searchForm.get(component.searchTermFieldName).setValue('123452');
    // component.setValues();
    expect(component.searchDisabled).toBe(false);
  });
  it('should not make search disabled if characters in value of searchTermFieldName is 0', () => {
    component.searchForm.get(component.searchTermFieldName).setValue('');
    // component.setValues();
    expect(component.searchDisabled).toBe(false);
  });
  it('should  make search disabled if isMinCharForSearchOption is true and if characters in value of searchTermFieldName is 3', () => {
    component.searchForm.get(component.searchTermFieldName).setValue('125');
    component.searchDisabled = true;
    component.isMinCharForSearchOption = true;
    // component.setValues();
    expect(component.searchDisabled).toBe(true);
  });

  it('should make search disabled if min character check is true and characters in value of searchTermFieldName is less than 4', () => {
    component.isMinCharForSearchOption = true;
    component.searchForm.get(component.searchTermFieldName).setValue('32');
    component.checkForSearchDisabled();
    expect(component.searchDisabled).toBe(true);
  });
  it('should call SearchUtility.checkForClearControl when checkForClearControl is called', () => {
    let spy = spyOn(SearchUtility, 'checkForClearControl');
    component.checkForClearControl();
    expect(spy).toHaveBeenCalled();
  });
  it('should clear value of searchtermfieldname when clearSearchTerm is called', () => {
    let spy = spyOn(component, 'search');
    component.clearSearchTerm();
    expect(spy).not.toHaveBeenCalled();
    expect(component.searchForm.get(component.searchTermFieldName).value).toBe(
      ''
    );
  });
});
