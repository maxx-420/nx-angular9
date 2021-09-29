// 9fbef606107a605d69c0edbcd8029e5d_SYMPHONY
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { LeftNavComponent } from './nav.component';
import { RouterTestingModule } from '@angular/router/testing';

describe('LeftNavComponent', () => {
  let component: LeftNavComponent;
  let fixture: ComponentFixture<LeftNavComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [LeftNavComponent],
      imports: [RouterTestingModule],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LeftNavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('isSelected should return true when url and router url starts with /symphony/inbound', () => {
    spyOnProperty(component.router, 'url', 'get').and.returnValue(
      '/symphony/inbound'
    );
    expect(component.isSelected('/symphony/inbound')).toBe(true);
  });

  it('isSelected should return true when url starts with /symphony/dashboard and current router url is /symphony/', () => {
    spyOnProperty(component.router, 'url', 'get').and.returnValue('/symphony/');
    expect(component.isSelected('/symphony/dashboard')).toBe(true);
  });

  it('isSelected should return false when url starts with /symphony/inbound and current router url is /symphony/', () => {
    spyOnProperty(component.router, 'url', 'get').and.returnValue('/symphony/');
    expect(component.isSelected('/symphony/inbound')).toBeFalsy();
  });

  it('should click on navbar item', () => {
    spyOn(component.navClicked, 'emit');
    component.navClick('', '');
    expect(component.navClicked.emit).toHaveBeenCalledWith(true);
  });
});
