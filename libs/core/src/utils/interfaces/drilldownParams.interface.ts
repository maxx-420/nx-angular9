// 9fbef606107a605d69c0edbcd8029e5d_SYMPHONY

import { Router } from '@angular/router';

export interface DrilldownParams {
  drilldownUrl: string;
  router?: Router;
  routerStateKey: string;
  filterKey: string;
  isCrossApp: boolean;
  dateFilter: any;
}
