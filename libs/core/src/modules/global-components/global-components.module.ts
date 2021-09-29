// 9fbef606107a605d69c0edbcd8029e5d_SYMPHONY
/**
 * Global components module
 */

import { MatPaginatorModule } from '@angular/material/paginator';
import { CUSTOM_ELEMENTS_SCHEMA, ErrorHandler, NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatIconModule } from '@angular/material/icon';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { CommonModule } from '@angular/common';
import { MatTooltipModule } from '@angular/material/tooltip';
import {
  MatSelectModule,
  MAT_SELECT_SCROLL_STRATEGY,
} from '@angular/material/select';
import { MatDialogModule } from '@angular/material/dialog';
import { MatMenuModule } from '@angular/material/menu';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
  MAT_MOMENT_DATE_FORMATS,
  MomentDateAdapter,
} from '@angular/material-moment-adapter';
import {
  DateAdapter,
  MatDateFormats,
  MatNativeDateModule,
  MAT_DATE_FORMATS,
} from '@angular/material/core';
import {
  CloseScrollStrategy,
  Overlay,
  OverlayModule,
} from '@angular/cdk/overlay';
import { MatTabsModule } from '@angular/material/tabs';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { CurrencyPipe, DecimalPipe } from '@angular/common';
import { MsalModule, MsalService, MSAL_INSTANCE } from '@azure/msal-angular';

import { TooltipComponent } from '../../components/atoms/tooltip/tooltip.component';
import { AlertComponent } from '../../components/molecules/alert/alert.component';
import { CardBoxComponent } from '../../components/atoms/card-box/card-box.component';
import { DonutChartLegendsComponent } from '../../components/atoms/donut-chart-legends/donut-chart-legends.component';
import { DateFilterComponent } from '../../components/molecules/date-filter/date-filter.component';
import { MilestoneFilterComponent } from '../../components/molecules/milestone-filter/milestone-filter.component';
import { MultiCheckboxFilterComponent } from '../../components/molecules/multi-select-checkbox-filter/multi-select-checkbox-filter.component';
import { TimeChartFiltersComponent } from '../../components/atoms/time-chart-filters/time-chart-filters.component';
import { WipChartFiltersComponent } from '../../components/atoms/wip-chart-filters/wip-chart-filters.component';
import { WipChartLegendsComponent } from '../../components/atoms/wip-chart-legends/wip-chart-legends.component';
import { BlockComponent } from '../../components/atoms/block/block.component';
import { InputComponent } from '../../components/atoms/input/input.component';
import { ExpansionPanelComponent } from '../../components/molecules/expansion-panel/expansion-panel.component';
import { RadioButtonsComponent } from '../../components/molecules/radio-buttons/radio-buttons.component';
import { DatepickerComponent } from '../../components/molecules/datepicker/datepicker.component';
import { ModalComponent } from '../../components/molecules/modal/modal.component';
import { DataTableComponent } from '../../components/molecules/data-table/data-table.component';
import { PaginatorDirective } from '../../components/molecules/data-table/data-table-paginator.directive';
import { FileDndDirective } from '../../components/atoms/file-upload/file-dnd.directive';
import { FileUploadComponent } from '../../components/atoms/file-upload/file-upload.component';
import { RenderLabelPipe } from '../../pipe/render-label/render-label.pipe';
import { ChartComponent } from '../../components/molecules/chart/chart.component';
import { LandingLayoutComponent } from '../../components/organisms/landing-layout/landing-layout.component';
import { LeftNavComponent } from '../../components/organisms/nav/nav.component';
import { BuListComponent } from '../../components/organisms/bu-list/bu-list.component';
import { SelectComponent } from '../../components/molecules/select/select.component';
import { MenuComponent } from '../../components/atoms/menu/menu.component';
import { LocationMapComponent } from '../../components/molecules/location-map/location-map.component';
import { ShipmentNavigationComponent } from '../../components/molecules/shipment-navigation/shipment-navigation.component';
import { ShipmentMilestonesComponent } from '../../components/organisms/shipment-milestones/shipment-milestones.component';
import { ShipmentMilestoneFiltersComponent } from '../../components/organisms/shipment-milestone-filters/shipment-milestone-filters.component';
import { SpinnerComponent } from '../../components/atoms/spinner/spinner.component';
import { ExpansionToggleComponent } from '../../components/atoms/expansion-toggle/expansion-toggle.component';
import { ComboMapComponent } from '../../components/organisms/combo-map/combo-map.component';
import { BarChartComponent } from '../../components/molecules/bar-chart/bar-chart.component';
import { BaseMapComponent } from '../../components/molecules/base-map/base-map.component';
import { ActivityFeedComponent } from '../../components/organisms/activity-feed/activity-feed.component';
import { CancelledShipmentComponent } from '../../components/organisms/cancelled-shipment/cancelled-shipment.component';
import { ShipmentStatusBarComponent } from '../../components/organisms/shipment-status-bar/shipment-status-bar.component';
import { ButtonComponent } from '../../components/atoms/button/button.component';
import { SymphonyDatePipe } from '../../pipe/symphony-date.pipe';
import { ItemSearchListingComponent } from '../../components/organisms/item-search-listing/item-search-listing.component';
import { ErrorComponent } from '../../components/molecules/error/error.component';
import { GlobalErrorHandler } from '../../service/global-error-handler/global-error-handler.service';
import { LearnMoreComponent } from '../../components/organisms/status-bar-learn-more/status-bar-learn-more.component';
import { TimeChartComponent } from '../../components/molecules/time-chart/time-chart.component';
import { MessageBarComponent } from '../../components/molecules/message-bar/message-bar.component';
import { UnauthenticatedModalComponent } from '../../components/molecules/unauthenticated-modal/unauthenticated-modal.component';
import { ChartModalComponent } from '../../components/molecules/chart-modal/chart-modal.component';
import { ConfirmationModalComponent } from '../../components/molecules/confirmation-modal/confirmation-modal.component';
import { ContextHelpComponent } from '../../components/molecules/context-help/context-help.component';
import { PageFilterComponent } from '../../components/molecules/page-filter/page-filter.component';
import { InvalidFieldFocusDirective } from '../../directives/invalid-field-focus.directive';
import { PopoverDirective } from '../../directives/popover/popover.directive';
import { ModalDirective } from '../../directives/modal/modal.directive';
import { TemplateSelectorDirective } from '../../directives/template-selector.directive';
import { ExceptionsListingComponent } from '../../components/molecules/exceptions-listing/exceptions-listing.component';
import { DonutChartComponent } from '../../components/molecules/donut-chart/donut-chart.component';
import { LateDeliveryChartDrillDownComponent } from '../../components/atoms/late-delivery-chart-drilldown/late-delivery-chart-drilldown.component';
import { ShipmentScheduleComponent } from '../../components/molecules/shipment-schedule/shipment-schedule.component';
import { ShipmentDetailsCardComponent } from '../../components/organisms/shipment-details-card/shipment-details-card.component';
import { ShipmentFinancialDataComponent } from '../../components/organisms/shipment-financial-data/shipment-financial-data.component';
import { WIPDrilldownFiltersComponent } from '../../components/organisms/wip-drilldown-filters/wip-drilldown-filters.component';
import { FilterChipComponent } from '../../components/molecules/filter-chip/filter-chip.component';
import { ChipComponent } from '../../components/atoms/chip/chip.component';
import { ShipmentModeComponent } from '../../components/organisms/shipment-mode/shipment-mode.component';
import { FilterComponent } from '../../components/molecules/filter/filter.component';
import { CellTemplatesComponent } from '../../components/molecules/cell-templates/cell-templates.component';
import { ViewMoreComponent } from '../../components/molecules/view-more/view-more.component';
import { DocumentsComponent } from '../../components/organisms/documents/documents.component';
import { SelectSearchInputComponent } from '../../components/molecules/select/select-search-input/select-search-input.component';
import { ShipmentConnectionsComponent } from '../../components/organisms/shipment-connections/shipment-connections.component';
import { AccountSelectorComponent } from '../../components/organisms/account-selector/account-selector.component';
import { ListItemComponent } from '../../components/atoms/list-item/list-item.component';
import { SingleSelectionListComponent } from '../../components/molecules/single-selection-list/single-selection-list.component';
import { MultiSelectionListComponent } from '../../components/molecules/multi-selection-list/multi-selection-list.component';
import { MSALInstanceFactory } from '../../msal/msal-instance-factory';
import { SearchBarComponent } from '../../components/organisms/search-bar/search-bar.component';
import { MovementShipmentGroupCountComponent } from '../../components/organisms/movement-shipment-group-count/movement-shipment-group-count.component';
import { MovementShipmentCountComponent } from '../../components/organisms/movement-shipment-count/movement-shipment-count.component';
import { DeliveryPerformanceComponent } from '../../components/organisms/delivery-performance/delivery-performance.component';
import { MilestoneBarComponent } from '../../components/organisms/milestone-bar/milestone-bar.component';
import { CostOvertimeComponent } from '../../components/organisms/cost-overtime/cost-overtime.component';
import { BlueRibbonComponent } from '../../components/organisms/blue-ribbon/blue-ribbon.component';
import { ShipmentFinancialModeBreakdownComponent } from '../../components/organisms/shipment-financial-mode-breakdown/shipment-financial-mode-breakdown.component';
import { ShipmentCostCardComponent } from '../../components/organisms/shipment-cost-card/shipment-cost-card.component';
import { ShipmentClaimCardComponent } from '../../components/organisms/shipment-claim-card/shipment-claim-card.component';
import { LearnMoreComponent as LearnMore } from '../../components/molecules/learn-more/learn-more.component';
import { ShipmentFinancialLaneCardComponent } from '../../components/organisms/shipment-financial-lane-card/shipment-financial-lane-card.component';
import { ShipUnitDetailsCardComponent } from '../../components/organisms/ship-unit-details-card/ship-unit-details-card.component';
import { UserCustomizeCardsComponent } from '../../components/molecules/user-customize-cards/user-customize-cards.component';
import { FooterCostLinkComponent } from '../../components/molecules/footer-cost-link/footer-cost-link.component';

const APP_DATE_FORMAT: MatDateFormats = {
  ...MAT_MOMENT_DATE_FORMATS,
  parse: {
    dateInput: 'YYYY-MM-DD',
  },
  display: {
    ...MAT_MOMENT_DATE_FORMATS.display,
    dateInput: 'YYYY-MM-DD',
    monthYearLabel: 'MMMM YYYY',
    dateA11yLabel: 'YYYY MMMM DD',
    monthYearA11yLabel: 'YYYY MMMM',
  },
};

/**
 * scroll factory
 * @param overlay overlay
 */
export function scrollFactory(overlay: Overlay): () => CloseScrollStrategy {
  return () => overlay.scrollStrategies.close({ threshold: 100 });
}

@NgModule({
  declarations: [
    ButtonComponent,
    BlockComponent,
    CardBoxComponent,
    DonutChartLegendsComponent,
    DateFilterComponent,
    MilestoneFilterComponent,
    MultiCheckboxFilterComponent,
    TimeChartFiltersComponent,
    WipChartFiltersComponent,
    WipChartLegendsComponent,
    InputComponent,
    ExpansionPanelComponent,
    ExpansionToggleComponent,
    RadioButtonsComponent,
    DatepickerComponent,
    ModalComponent,
    PaginatorDirective,
    DataTableComponent,
    FileDndDirective,
    FileUploadComponent,
    RenderLabelPipe,
    ChartComponent,
    LandingLayoutComponent,
    BuListComponent,
    BlueRibbonComponent,
    SelectComponent,
    MenuComponent,
    LeftNavComponent,
    LocationMapComponent,
    ShipmentNavigationComponent,
    ShipmentMilestonesComponent,
    ShipmentMilestoneFiltersComponent,
    BaseMapComponent,
    ShipmentScheduleComponent,
    ComboMapComponent,
    BarChartComponent,
    ActivityFeedComponent,
    AlertComponent,
    CancelledShipmentComponent,
    ShipmentStatusBarComponent,
    TooltipComponent,
    SymphonyDatePipe,
    ItemSearchListingComponent,
    SpinnerComponent,
    ErrorComponent,
    LearnMoreComponent,
    WIPDrilldownFiltersComponent,
    TimeChartComponent,
    MessageBarComponent,
    UnauthenticatedModalComponent,
    ChartModalComponent,
    ConfirmationModalComponent,
    ContextHelpComponent,
    PageFilterComponent,
    InvalidFieldFocusDirective,
    PopoverDirective,
    ModalDirective,
    TemplateSelectorDirective,
    ExceptionsListingComponent,
    DonutChartComponent,
    LateDeliveryChartDrillDownComponent,
    ShipmentDetailsCardComponent,
    ShipmentFinancialDataComponent,
    FilterChipComponent,
    ChipComponent,
    ShipmentModeComponent,
    FilterComponent,
    CellTemplatesComponent,
    ViewMoreComponent,
    DocumentsComponent,
    SelectSearchInputComponent,
    ShipmentConnectionsComponent,
    AccountSelectorComponent,
    SearchBarComponent,
    ListItemComponent,
    SingleSelectionListComponent,
    MultiSelectionListComponent,
    MovementShipmentGroupCountComponent,
    MovementShipmentCountComponent,
    DeliveryPerformanceComponent,
    MilestoneBarComponent,
    CostOvertimeComponent,
    ShipmentFinancialModeBreakdownComponent,
    ShipmentCostCardComponent,
    ShipmentClaimCardComponent,
    LearnMore,
    ShipmentFinancialLaneCardComponent,
    ShipUnitDetailsCardComponent,
    UserCustomizeCardsComponent,
    FooterCostLinkComponent,
  ],
  entryComponents: [ModalComponent, TooltipComponent],
  imports: [
    CommonModule,
    OverlayModule,
    MatCardModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatFormFieldModule,
    MatInputModule,
    MatRadioModule,
    MatDatepickerModule,
    MatIconModule,
    MatExpansionModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    MatTooltipModule,
    RouterModule,
    MatSelectModule,
    MatMenuModule,
    MatDialogModule,
    FormsModule,
    ReactiveFormsModule,
    MatSlideToggleModule,
    MatAutocompleteModule,
    MatNativeDateModule,
    MatTabsModule,
    MatCheckboxModule,
    MsalModule,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  exports: [
    ButtonComponent,
    BlockComponent,
    CardBoxComponent,
    DonutChartLegendsComponent,
    DateFilterComponent,
    MilestoneFilterComponent,
    MultiCheckboxFilterComponent,
    TimeChartFiltersComponent,
    WipChartFiltersComponent,
    WipChartLegendsComponent,
    InputComponent,
    ExpansionPanelComponent,
    ExpansionToggleComponent,
    RadioButtonsComponent,
    DatepickerComponent,
    ModalComponent,
    TemplateSelectorDirective,
    DataTableComponent,
    PaginatorDirective,
    FileUploadComponent,
    RenderLabelPipe,
    ChartComponent,
    LandingLayoutComponent,
    BuListComponent,
    BlueRibbonComponent,
    SelectComponent,
    ShipmentScheduleComponent,
    LeftNavComponent,
    LocationMapComponent,
    ShipmentNavigationComponent,
    ShipmentMilestonesComponent,
    ShipmentMilestoneFiltersComponent,
    WIPDrilldownFiltersComponent,
    BaseMapComponent,
    ComboMapComponent,
    BarChartComponent,
    ActivityFeedComponent,
    AlertComponent,
    CancelledShipmentComponent,
    ShipmentStatusBarComponent,
    SymphonyDatePipe,
    ItemSearchListingComponent,
    ErrorComponent,
    SpinnerComponent,
    TimeChartComponent,
    MessageBarComponent,
    ChartModalComponent,
    ConfirmationModalComponent,
    ContextHelpComponent,
    MatSlideToggleModule,
    MatAutocompleteModule,
    MatFormFieldModule,
    MatInputModule,
    PageFilterComponent,
    InvalidFieldFocusDirective,
    PopoverDirective,

    ModalDirective,
    ExceptionsListingComponent,
    DonutChartComponent,
    LateDeliveryChartDrillDownComponent,
    MatTabsModule,
    ShipmentDetailsCardComponent,
    ShipmentFinancialDataComponent,
    FilterChipComponent,
    ChipComponent,
    ShipmentModeComponent,
    FilterComponent,
    CellTemplatesComponent,
    ViewMoreComponent,
    DocumentsComponent,
    ShipmentConnectionsComponent,
    AccountSelectorComponent,
    SingleSelectionListComponent,
    MultiSelectionListComponent,
    SearchBarComponent,
    MovementShipmentGroupCountComponent,
    MovementShipmentCountComponent,
    DeliveryPerformanceComponent,
    MilestoneBarComponent,
    CostOvertimeComponent,
    ShipmentFinancialModeBreakdownComponent,
    ShipmentCostCardComponent,
    ShipmentClaimCardComponent,
    LearnMore,
    ShipmentFinancialLaneCardComponent,
    ShipUnitDetailsCardComponent,
    UserCustomizeCardsComponent,
    FooterCostLinkComponent,
  ],
  providers: [
    SymphonyDatePipe,
    CurrencyPipe,
    DecimalPipe,
    {
      provide: ErrorHandler,
      useClass: GlobalErrorHandler,
    },
    { provide: DateAdapter, useClass: MomentDateAdapter },
    { provide: MAT_DATE_FORMATS, useValue: APP_DATE_FORMAT },
    {
      provide: MAT_SELECT_SCROLL_STRATEGY,
      useFactory: scrollFactory,
      deps: [Overlay],
    },
    {
      provide: MSAL_INSTANCE,
      useFactory: MSALInstanceFactory,
    },
    MsalService,
  ],
})
export class GlobalComponentsModule {}
