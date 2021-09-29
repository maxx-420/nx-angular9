// 9fbef606107a605d69c0edbcd8029e5d_SYMPHONY
/**
 * datatable story
 */

import { moduleMetadata } from '@storybook/angular';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { DataTableComponent } from './data-table.component';

export default {
  title: 'Data Table Component',
  decorators: [
    moduleMetadata({
      declarations: [DataTableComponent],
      imports: [
        MatTableModule,
        MatSortModule,
        CommonModule,
        BrowserAnimationsModule,
      ],
    }),
  ],
};

export const basicDataTableWithSorting = () => ({
  component: DataTableComponent,
  props: {
    displayedColumnsForTable: ['position', 'name', 'weight', 'symbol'],
    tableData: [
      { position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H' },
      { position: 2, name: 'Helium', weight: 4.0026, symbol: 'He' },
      { position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li' },
      { position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be' },
      { position: 5, name: 'Boron', weight: 10.811, symbol: 'B' },
      { position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C' },
      { position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N' },
      { position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O' },
      { position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F' },
      { position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne' },
    ],
  },
  template: `
  <div class="ups-gld-global_ui-elements">
    <h3 class="ups-gld-global_ui-elements-heading">
      Data Table With Sorting
    </h3>
    <lib-data-table
      [displayedColumns]="displayedColumnsForTable"
      [tableData]="tableData"
    ></lib-data-table>
  </div>
  `,
});
