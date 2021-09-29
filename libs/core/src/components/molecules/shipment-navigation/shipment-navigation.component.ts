// 9fbef606107a605d69c0edbcd8029e5d_SYMPHONY
// shipment detail navigation buttons component

import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
} from '@angular/core';

@Component({
  selector: 'lib-shipment-navigation',
  templateUrl: './shipment-navigation.component.html',
  styleUrls: ['./shipment-navigation.component.scss'],
})
export class ShipmentNavigationComponent implements OnChanges {
  @Input() shipmentDetail;
  @Input() shipmentList;
  @Input() isMultiView = false;
  @Output() navigateTo = new EventEmitter<string | any>();
  @Output() setShipmentNavigationVisible = new EventEmitter<boolean>();

  index;
  isInShipmentListing;

  /**
   * ngOnChanges lifecycle hook
   * @param changes shipmentDetail & shipmentList
   */
  ngOnChanges({ shipmentDetail, shipmentList }: SimpleChanges): void {
    if (
      shipmentDetail &&
      shipmentDetail.currentValue !== shipmentDetail.previousValue
    ) {
      this.processNextPrevious();
    }

    if (
      shipmentList &&
      shipmentList.currentValue !== shipmentList.previousValue
    ) {
      this.processNextPrevious();
    }
  }

  /**
   * navigate to next or previous shipment detail
   * @param toNext is navigate to next
   */
  navigate(toNext = false) {
    const toIndex = toNext ? this.index + 1 : this.index - 1;
    this.index = toIndex;

    let shipmentNumber;
    if (this.shipmentList[toIndex].upsShipmentNumber) {
      shipmentNumber = this.shipmentList[toIndex].upsShipmentNumber;
    } else if (this.shipmentList[toIndex].upsShipmentNo) {
      shipmentNumber = this.shipmentList[toIndex].upsShipmentNo;
    } else {
      shipmentNumber = this.shipmentList[toIndex].shipmentNo;
    }

    if (this.isMultiView) {
      const queryParams = {
        plBusinessId: this.shipmentList[toIndex].plBusinessId,
      };
      this.navigateTo.emit({
        shipmentNumber,
        queryParams,
      });
    } else {
      this.navigateTo.emit(shipmentNumber);
    }
  }

  private processNextPrevious() {
    if (
      this.shipmentDetail?.data &&
      this.shipmentList &&
      !history.state?.hideNextPrevSection
    ) {
      this.index = this.shipmentList.findIndex((shipment) => {
        if (
          this.checkShipmentExistsInListing(shipment) ||
          this.checkMovementShipmentExistsInListing(shipment) ||
          this.checkShipmentExistsInCancelledShipments(shipment)
        ) {
          return true;
        }
        return false;
      });
      this.isInShipmentListing = this.index > -1;
    } else {
      this.isInShipmentListing = false;
      this.index = -1;
    }
    this.setShipmentNavigationVisible.next(this.isInShipmentListing);
  }

  /**
   * Check if current shipment number exists in list of shipments
   * @param shipment shipment from list of shipments
   * @returns Boolean if match was found or not
   */
  private checkShipmentExistsInListing(shipment: any): boolean {
    return (
      this.shipmentDetail.data.shipmentNo &&
      +this.shipmentDetail.data.shipmentNo.replace(/\D/g, '') ===
        +(shipment.shipmentNo || '').replace(/\D/g, '')
    );
  }

  /**
   * Check if current shipment number exists in list of cancelled shipments
   * @param shipment shipment from list of shipments
   * @returns Boolean if match was found or not
   */
  private checkShipmentExistsInCancelledShipments(shipment: any): boolean {
    return (
      this.shipmentDetail.data.shipmentNo &&
      +this.shipmentDetail.data.shipmentNo.replace(/\D/g, '') ===
        +(shipment.upsShipmentNo || '').replace(/\D/g, '')
    );
  }

  /**
   * Check if current shipment number exists in list of movement shipments
   * @param shipment shipment from list of movement shipments
   * @returns Boolean if match was found or not
   */
  private checkMovementShipmentExistsInListing(shipment: any): boolean {
    // Added for movement shipments as it is having different contract
    return (
      this.shipmentDetail?.data?.primaryDetail?.info?.upsTMSShipmentNumber &&
      +this.shipmentDetail.data.primaryDetail.info.upsTMSShipmentNumber.replace(
        /\D/g,
        ''
      ) ===
        +(shipment?.upsShipmentNumber || shipment?.upsShipmentNo || '').replace(
          /\D/g,
          ''
        )
    );
  }
}
