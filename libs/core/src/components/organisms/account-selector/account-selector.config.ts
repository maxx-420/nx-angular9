// 9fbef606107a605d69c0edbcd8029e5d_SYMPHONY

import { ConnectionPositionPair } from '@angular/cdk/overlay';

import { PLACEMENTS } from '../../../constants/global.constant';

export const popoverPositionsOnClick = {
  [PLACEMENTS.bottom]: new ConnectionPositionPair(
    { originX: 'end', originY: 'bottom' },
    { overlayX: 'end', overlayY: 'top' },
    0,
    -28,
    'popover-bottom'
  ),
};

export const popoverHamburgerPositions = {
  [PLACEMENTS.bottom]: new ConnectionPositionPair(
    { originX: 'center', originY: 'bottom' },
    { overlayX: 'center', overlayY: 'top' },
    0,
    -10,
    'popover-bottom'
  ),
};
