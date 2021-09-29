// 9fbef606107a605d69c0edbcd8029e5d_SYMPHONY

export const CLAIMS_COLUMN_LABELS = {
  claimType: {
    displayLabel: 'dpf_l3_claimType',
    transformLabel: true,
  },
  claimAmount: {
    displayLabel: 'dpf_l3_claimAmount',
    transformLabel: true,
  },
  claimFilingDateTime: {
    displayLabel: 'dpf_l3_claimFilingDate',
    transformLabel: true,
  },
  claimPaidAmount: {
    displayLabel: 'dpf_l3_claimAmountPaid',
    transformLabel: true,
  },
  claimStatus: {
    displayLabel: 'dpf_l3_claimStatus',
    transformLabel: true,
  },
  claimClosureDateTime: {
    displayLabel: 'dpf_l3_claimClosureDate',
    transformLabel: true,
  },
};

export const claimsDisplayedColumns = [
  'claimType',
  'claimStatus',
  'claimFilingDateTime',
  'claimAmount',
  'claimPaidAmount',
  'claimClosureDateTime',
];
