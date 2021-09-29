// 9fbef606107a605d69c0edbcd8029e5d_SYMPHONY
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { SimpleChange } from '@angular/core';
import { Pipe } from '@angular/core';
import { RenderLabelPipe } from '../../../pipe/render-label/render-label.pipe';
import { MilestoneBarComponent } from './milestone-bar.component';

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

describe('MilestoneBarComponent', () => {
  let component: MilestoneBarComponent;
  let fixture: ComponentFixture<MilestoneBarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [MilestoneBarComponent, mockPipe({ name: 'content' })],
      providers: [RenderLabelPipe],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MilestoneBarComponent);
    component = fixture.componentInstance;
    component.milestones = [
      {
        id: 'All',
        name: 'SHIPMENT',
        shipmentCount: 567,
        order: 1,
      },
      {
        id: 'Warehouse',
        name: 'WAREHOUSE',
        shipmentCount: 122,
        order: 2,
      },
    ];
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should update selectedIndex on step selection', () => {
    component.onTileClick(0);
    fixture.detectChanges();
    expect(component.tileClicked).toBe('All');
  });

  it('should call ngOnChanges', () => {
    let milestones = [
      {
        id: 'All',
        name: 'SHIPMENT',
        shipmentCount: 52,
        order: 1,
      },
      {
        id: 'Warehouse',
        name: 'WAREHOUSE',
        shipmentCount: 0,
        order: 2,
      },
    ];
    component.ngOnChanges({
      milestones: new SimpleChange(null, milestones, true),
    });
    fixture.detectChanges();
    expect(component.milestones).toEqual(milestones);
  });

  it('should toggle isViewData', () => {
    component.isLearnMoreClicked = true;
    component.onLearnMoreClick();
    expect(component.isLearnMoreClicked).toBe(false);
  });
});
