const getEditColumn = () => ({
  id: "edit",
  numeric: false,
  disablePadding: false,
  label: ""
});

export const getCustomerTableHeaders = [
  {
    id: "id",
    numeric: false,
    disablePadding: false,
    label: "Customer Id"
  },
  {
    id: "firstName",
    numeric: false,
    disablePadding: false,
    label: "First Name"
  },
  { id: "lastName", numeric: false, disablePadding: false, label: "Last Name" },
  { id: "email", numeric: false, disablePadding: false, label: "Email" },
  {
    id: "gender",
    numeric: false,
    disablePadding: false,
    label: "Gender"
  },
  {
    id: "bankAccount",
    numeric: false,
    disablePadding: false,
    label: "Acc no"
  },
  getEditColumn()
];

export const getEmployeeTableHeaders = [
  {
    id: "id",
    numeric: false,
    disablePadding: false,
    label: "Employee Id"
  },
  {
    id: "firstName",
    numeric: false,
    disablePadding: false,
    label: "First Name"
  },
  { id: "lastName", numeric: false, disablePadding: false, label: "Last Name" },
  { id: "email", numeric: false, disablePadding: false, label: "Email" },
  {
    id: "gender",
    numeric: false,
    disablePadding: false,
    label: "Gender"
  },
  {
    id: "bankAccount",
    numeric: false,
    disablePadding: false,
    label: "Acc no"
  }
];

export const getSupplierTableHeaders = [
  {
    id: "id",
    numeric: false,
    disablePadding: false,
    label: "Supplier Id"
  },
  {
    id: "firstName",
    numeric: false,
    disablePadding: false,
    label: "First Name"
  },
  { id: "lastName", numeric: false, disablePadding: false, label: "Last Name" },
  { id: "email", numeric: false, disablePadding: false, label: "Email" },
  {
    id: "gender",
    numeric: false,
    disablePadding: false,
    label: "Gender"
  },
  {
    id: "bankAccount",
    numeric: false,
    disablePadding: false,
    label: "Acc no"
  }
];

export const getSaleTableHeaders = [
  {
    id: "id",
    numeric: false,
    disablePadding: false,
    label: "Sale Id"
  },
  {
    id: "ItemName",
    numeric: false,
    disablePadding: false,
    label: "Item Name"
  },
  { id: "Price", numeric: false, disablePadding: false, label: "Price" },
  { id: "Quantity", numeric: false, disablePadding: false, label: "Quantity" },
  {
    id: "Disc",
    numeric: false,
    disablePadding: false,
    label: "Disc"
  },
  {
    id: "Total",
    numeric: false,
    disablePadding: false,
    label: "Total"
  }
];

export const getItemTableHeaders = [
  {
    id: "itemid",
    numeric: true,
    disablePadding: false,
    label: "Item Id"
  },
  { id: "barcode", numeric: true, disablePadding: false, label: "Bar Code" },
  { id: "itemname", numeric: true, disablePadding: false, label: "Item Name" },
  {
    id: "category",
    numeric: true,
    disablePadding: false,
    label: "Category"
  },
  {
    id: "costprice",
    numeric: true,
    disablePadding: false,
    label: "Cost Price"
  },
  {
    id: "sellingprice",
    numeric: true,
    disablePadding: false,
    label: "Selling Price"
  },
  {
    id: "quantity",
    numeric: true,
    disablePadding: false,
    label: "Quantity"
  },
  {
    id: "storelocation",
    numeric: true,
    disablePadding: false,
    label: "Store Location"
  },
  {
    id: "avatar",
    numeric: true,
    disablePadding: false,
    label: "Avatar"
  }
];
