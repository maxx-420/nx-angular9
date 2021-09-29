// 9fbef606107a605d69c0edbcd8029e5d_SYMPHONY

import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { ViewportUtility } from '../../../utils';
import { VIEWPORT_NAMES } from '../../../constants';
import { PlatformService } from '../../../service/platform-service/platform.service';
import { LearnMoreTypes } from '../../../enum/learnMore.enum';

@Component({
  selector: 'lib-learn-more',
  templateUrl: './learn-more.component.html',
  styleUrls: ['./learn-more.component.scss'],
})
export class LearnMoreComponent implements OnInit, OnDestroy, OnChanges {
  @Input() learnMoreType: LearnMoreTypes = LearnMoreTypes.TwoColumns;
  @Input() customLabelMapping: any;
  @Input() attrToFetchData: Array<string>;
  @Input() toggleTypes: Array<string>;
  @Input() modalTitle: string;
  /**
   * To show/hide table header/title
   */
  @Input() showTableTitle: boolean = true;
  /**
   * table title, if it is not provided then table title will be derived from modal title
   */
  @Input() tableTitle: string;
  @Input() contentHtmlKey: string;
  @Input() modalData: Array<any> = [];

  @Input() hasApiFailed: boolean;
  @Input() errorReason: string;
  @Input() pageSection: string;
  @Input() dataAutomationAttr: string;

  @Input() isTableRowClickable: boolean = false;
  @Input() isTableColumnClickable: boolean = false;
  @Output() modalClosed: EventEmitter<any> = new EventEmitter();
  @Output() tableRowClicked: EventEmitter<any> = new EventEmitter();

  isViewDataClicked: boolean = false;
  showSubValueColumn: boolean = false;
  isMultiColumnOrTableLayout: boolean = false;
  isDesktopDevice: boolean;

  private readonly ngUnsubscribe: Subject<any> = new Subject();
  constructor(public platformService: PlatformService) {}

  /**
   * lifecycle hook
   */
  ngOnInit(): void {
    this.isDesktopDevice = ViewportUtility.checkViewport(
      VIEWPORT_NAMES.desktop
    );
    this.platformService.orientationChange$
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe((viewport: string): void => {
        this.isDesktopDevice = viewport === VIEWPORT_NAMES.desktop;
      });

    this.setChartModalParameters();
  }
  /**
   * lifecycle hook
   */
  ngOnChanges(changes: SimpleChanges): void {
    if (
      changes?.learnMoreType?.previousValue !==
      changes?.learnMoreType?.currentValue
    ) {
      this.setChartModalParameters();
    }
  }
  /**
   * lifecycle hook
   */
  ngOnDestroy(): void {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }
  /**
   * method to open/close learn more modal.
   */
  onViewDataClick(): void {
    this.isViewDataClicked = !this.isViewDataClicked;
  }
  /**
   * after popupclose reset
   */
  onModalClose(e: any): void {
    this.onViewDataClick();
    this.modalClosed.emit(e);
  }
  /**
   * emit when table row is clicked
   */
  onTableRowClick(event: any): void {
    this.tableRowClicked.emit(event);
  }

  /**
   * set chart modal input value on the basis of learn more type
   */
  setChartModalParameters(): void {
    switch (this.learnMoreType) {
      case LearnMoreTypes.MultiColumn:
      case LearnMoreTypes.MultipleTables:
        this.isMultiColumnOrTableLayout = true;
        break;
      case LearnMoreTypes.TwoColumnsWithSubValue:
        this.showSubValueColumn = true;
        break;
    }
  }
}
