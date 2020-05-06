const getEditColumn = () => ({
  id: 'edit',
  numeric: false,
  disablePadding: false,
  label: ''
});

export const getCustomerTableHeaders = [
  {
    id: 'id',
    numeric: false,
    disablePadding: false,
    label: 'Customer Id'
  },
  {
    id: 'firstName',
    numeric: false,
    disablePadding: false,
    label: 'First Name'
  },
  { id: 'lastName', numeric: false, disablePadding: false, label: 'Last Name' },
  { id: 'email', numeric: false, disablePadding: false, label: 'Email' },
  {
    id: 'gender',
    numeric: false,
    disablePadding: false,
    label: 'Gender'
  },
  {
    id: 'bankAccount',
    numeric: false,
    disablePadding: false,
    label: 'Acc no'
  },
  getEditColumn()
];

export const getEmployeeTableHeaders = [
  {
    id: 'id',
    numeric: false,
    disablePadding: false,
    label: 'Employee Id'
  },
  {
    id: 'firstName',
    numeric: false,
    disablePadding: false,
    label: 'First Name'
  },
  { id: 'lastName', numeric: false, disablePadding: false, label: 'Last Name' },
  {
    id: 'phoneNo',
    numeric: false,
    disablePadding: false,
    label: 'Phone Number'
  },
  {
    id: 'gender',
    numeric: false,
    disablePadding: false,
    label: 'Gender'
  },
  {
    id: 'bankAccount',
    numeric: false,
    disablePadding: false,
    label: 'Acc no'
  }
];

export const getSupplierTableHeaders = [
  {
    id: 'id',
    numeric: false,
    disablePadding: false,
    label: 'Supplier Id'
  },
  {
    id: 'firstName',
    numeric: false,
    disablePadding: false,
    label: 'First Name'
  },
  { id: 'lastName', numeric: false, disablePadding: false, label: 'Last Name' },
  { id: 'email', numeric: false, disablePadding: false, label: 'Email' },
  {
    id: 'gender',
    numeric: false,
    disablePadding: false,
    label: 'Gender'
  },
  {
    id: 'bankAccount',
    numeric: false,
    disablePadding: false,
    label: 'Acc no'
  }
];

export const getSaleTableHeaders = [
  {
    id: 'id',
    numeric: false,
    disablePadding: false,
    label: 'Sale Id'
  },
  {
    id: 'ItemName',
    numeric: false,
    disablePadding: false,
    label: 'Item Name'
  },
  { id: 'Price', numeric: false, disablePadding: false, label: 'Price' },
  {
    id: 'Disc',
    numeric: false,
    disablePadding: false,
    label: 'Disc'
  },
  { id: 'Quantity', numeric: false, disablePadding: false, label: 'Quantity' },
  {
    id: 'Total',
    numeric: false,
    disablePadding: false,
    label: 'Total'
  }
];

export const getReceiveTableHeaders = [
  {
    id: 'id',
    numeric: false,
    disablePadding: false,
    label: 'Receive Id'
  },
  {
    id: 'ItemName',
    numeric: false,
    disablePadding: false,
    label: 'Item Name'
  },
  { id: 'Price', numeric: false, disablePadding: false, label: 'Price' },
  {
    id: 'Disc',
    numeric: false,
    disablePadding: false,
    label: 'Disc'
  },
  { id: 'Quantity', numeric: false, disablePadding: false, label: 'Quantity' },
  {
    id: 'Total',
    numeric: false,
    disablePadding: false,
    label: 'Total'
  }
];

export const getItemTableHeaders = [
  {
    id: 'itemid',
    numeric: false,
    disablePadding: false,
    label: 'Item Id'
  },
  { id: 'barcode', numeric: false, disablePadding: false, label: 'Bar Code' },
  { id: 'itemname', numeric: false, disablePadding: false, label: 'Item Name' },
  {
    id: 'category',
    numeric: false,
    disablePadding: false,
    label: 'Category'
  },
  {
    id: 'reorderLevel',
    numeric: false,
    disablePadding: false,
    label: 'Reorder level'
  }
];

export const getCashupTableHeaders = [
  {
    id: 'refNo',
    numeric: false,
    disablePadding: false,
    label: 'Ref. No.'
  },
  {
    id: 'date',
    numeric: false,
    disablePadding: false,
    label: 'Date'
  },
  {
    id: 'description',
    numeric: false,
    disablePadding: false,
    label: 'Description'
  },
  { id: 'credit', numeric: true, disablePadding: false, label: 'Credit' },
  {
    id: 'debit',
    numeric: true,
    disablePadding: false,
    label: 'Debit'
  },
  getEditColumn()
];
