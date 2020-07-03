const getEmptyColumnForEditOrDelete = id => ({
  id,
  numeric: false,
  disablePadding: false,
  label: '',
});

export const getCustomerTableHeaders = [
  {
    id: 'id',
    numeric: false,
    disablePadding: false,
    label: 'Customer Id',
  },
  {
    id: 'firstName',
    numeric: false,
    disablePadding: false,
    label: 'First Name',
  },
  { id: 'lastName', numeric: false, disablePadding: false, label: 'Last Name' },
  { id: 'email', numeric: false, disablePadding: false, label: 'Email' },
  {
    id: 'gender',
    numeric: false,
    disablePadding: false,
    label: 'Gender',
  },
  {
    id: 'bankAccount',
    numeric: false,
    disablePadding: false,
    label: 'Acc no',
  },
  getEmptyColumnForEditOrDelete('edit'),
];

export const getEmployeeTableHeaders = [
  {
    id: 'id',
    numeric: false,
    disablePadding: false,
    label: 'Employee Id',
  },
  {
    id: 'firstName',
    numeric: false,
    disablePadding: false,
    label: 'First Name',
  },
  { id: 'lastName', numeric: false, disablePadding: false, label: 'Last Name' },
  {
    id: 'phoneNo',
    numeric: false,
    disablePadding: false,
    label: 'Phone Number',
  },
  {
    id: 'gender',
    numeric: false,
    disablePadding: false,
    label: 'Gender',
  },
  {
    id: 'bankAccount',
    numeric: false,
    disablePadding: false,
    label: 'Acc no',
  },
  getEmptyColumnForEditOrDelete('edit'),
];

export const getSupplierTableHeaders = [
  {
    id: 'id',
    numeric: false,
    disablePadding: false,
    label: 'Supplier Id',
  },
  {
    id: 'firstName',
    numeric: false,
    disablePadding: false,
    label: 'First Name',
  },
  { id: 'lastName', numeric: false, disablePadding: false, label: 'Last Name' },
  { id: 'email', numeric: false, disablePadding: false, label: 'Email' },
  {
    id: 'gender',
    numeric: false,
    disablePadding: false,
    label: 'Gender',
  },
  {
    id: 'bankAccount',
    numeric: false,
    disablePadding: false,
    label: 'Acc no',
  },
  getEmptyColumnForEditOrDelete('edit'),
];

export const getSaleTableHeaders = [
  {
    id: 'id',
    numeric: false,
    disablePadding: false,
    label: 'Item Id',
  },
  {
    id: 'itemName',
    numeric: false,
    disablePadding: false,
    label: 'Item Name',
  },
  { id: 'price', numeric: false, disablePadding: false, label: 'Price' },
  { id: 'quantity', numeric: false, disablePadding: false, label: 'Quantity' },
  {
    id: 'discount',
    numeric: false,
    disablePadding: false,
    label: 'Discount per item',
  },
  {
    id: 'total',
    numeric: false,
    disablePadding: false,
    label: 'Total',
  },
  getEmptyColumnForEditOrDelete('delete'),
];

export const getReceiveTableHeaders = [
  {
    id: 'id',
    numeric: false,
    disablePadding: false,
    label: 'Item Id',
  },
  {
    id: 'ItemName',
    numeric: false,
    disablePadding: false,
    label: 'Item Name',
  },
  { id: 'price', numeric: false, disablePadding: false, label: 'Cost' },
  { id: 'quantity', numeric: false, disablePadding: false, label: 'Quantity' },
  {
    id: 'discount',
    numeric: false,
    disablePadding: false,
    label: 'Discount',
  },
  {
    id: 'total',
    numeric: false,
    disablePadding: false,
    label: 'Total',
  },
  getEmptyColumnForEditOrDelete('delete'),
];

export const getItemTableHeaders = [
  {
    id: 'itemid',
    numeric: false,
    disablePadding: false,
    label: 'Item Id',
  },
  { id: 'barcode', numeric: false, disablePadding: false, label: 'Bar Code' },
  { id: 'itemname', numeric: false, disablePadding: false, label: 'Item Name' },
  {
    id: 'category',
    numeric: false,
    disablePadding: false,
    label: 'Category',
  },
  {
    id: 'reOrderLevel',
    numeric: false,
    disablePadding: false,
    label: 'Reorder level',
  },
  getEmptyColumnForEditOrDelete('edit'),
];

export const getCashbookTableHeaders = [
  {
    id: 'cashbookId',
    numeric: false,
    disablePadding: false,
    label: 'Id',
  },
  {
    id: 'date',
    numeric: false,
    disablePadding: false,
    label: 'Date',
  },
  {
    id: 'refNo',
    numeric: false,
    disablePadding: false,
    label: 'Ref. No.',
  },
  {
    id: 'type',
    numeric: false,
    disablePadding: false,
    label: 'type',
  },
  {
    id: 'amount',
    numeric: false,
    disablePadding: false,
    label: 'Amount',
  },
  {
    id: 'description',
    numeric: false,
    disablePadding: false,
    label: 'Description',
  },
  getEmptyColumnForEditOrDelete('edit'),
];
