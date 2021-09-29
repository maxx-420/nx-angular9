// 9fbef606107a605d69c0edbcd8029e5d_SYMPHONY
import getRowClickedData from './getRowClickedData';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { TestBed } from '@angular/core/testing';

describe('getRowClickedData', () => {
  let router: Router;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule.withRoutes([{ path: '**', redirectTo: '' }]),
      ],
      providers: [Location],
    }).compileComponents();

    router = TestBed.inject(Router);
    router.initialNavigation();
  });

  it('getRowClickedData', () => {
    let spy = spyOn(router, 'navigate');
    getRowClickedData(
      { Shipment: '1234', Status: 'Booking' },
      'Shipment',
      router,
      null
    );
    let shipmentNumber = '1234';
    expect(spy).toHaveBeenCalledWith([`${shipmentNumber}`], null);
  });

  it('getRowClickedData with prefixUrl for crossapp navigation', () => {
    let spy = spyOn(window, 'dispatchEvent');
    let shipmentNumber = '5678';
    const queryParams = '?upsFileNumber=859099902400270&upsOffice=4847';
    let analyticsCallback = () => {};
    getRowClickedData(
      { Shipment: '1234#5678', Status: 'Booking' },
      'Shipment',
      null,
      null,
      '/outbound/',
      analyticsCallback,
      queryParams
    );
    const dummyEvent = new CustomEvent(`crossapp:routechanged`, {
      detail: {
        url: `/outbound/${shipmentNumber}`,
        extras: {
          state: null,
        },
      },
    });
    expect(spy).toHaveBeenCalledWith(dummyEvent);
  });
  it('getRowClickedData with prefixUrl for crossapp navigation with no queryParams', () => {
    let spy = spyOn(window, 'dispatchEvent');
    let shipmentNumber = '5678';
    const queryParams = null;
    const analyticsCallback = null;
    getRowClickedData(
      { Shipment: '1234#5678', Status: 'Booking' },
      'Shipment',
      null,
      null,
      '/outbound/',
      analyticsCallback,
      queryParams
    );
    const dummyEvent = new CustomEvent(`crossapp:routechanged`, {
      detail: {
        url: `/outbound/${shipmentNumber}`,
        extras: {
          state: null,
        },
      },
    });
    expect(spy).toHaveBeenCalledWith(dummyEvent);
  });
});
