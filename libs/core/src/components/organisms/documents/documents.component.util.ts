// 9fbef606107a605d69c0edbcd8029e5d_SYMPHONY

import { documentColumnLabelsMapping } from './documents.component.config';
import { IDocumentsColumns } from './interfaces/IDocumentsColumns.interface';

/**
 * Creates columns to be passed in data-table component
 */
export function createColumnLabels(additionalTableColumns, downloadColumnTemplate): IDocumentsColumns {
  return {
    id: {
      displayLabel: documentColumnLabelsMapping?.id,
      isSortable: false,
      transformLabel: true,
      customTemplate: downloadColumnTemplate
    },
    type: {
      displayLabel: documentColumnLabelsMapping?.type,
      styleClass: 'nowrap',
      transformLabel: true,
    },
    createdDate: {
      displayLabel: documentColumnLabelsMapping?.createdDate,
      type: 'date',
      transformLabel: true,
    },
    noOfPages: {
      displayLabel: documentColumnLabelsMapping?.noOfPages,
      transformLabel: true,
    },
    ...additionalTableColumns,
  };
}
