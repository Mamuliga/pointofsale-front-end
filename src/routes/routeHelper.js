import { PAGE_ROUTES } from '../services/routeService';
import {
  Customers,
  FormCustomer,
  Employees,
  FormEmployee,
  Suppliers,
  FormSupplier,
  Items,
  FormItem,
  Cashups,
  FormCashup,
  Sales,
  // PrintCashup,
} from '../components/pages';

export const customerRoutes = [
  {
    path: PAGE_ROUTES.customers,
    component: Customers,
  },
  {
    path: PAGE_ROUTES.newCustomer,
    component: FormCustomer,
  },
  {
    path: PAGE_ROUTES.editCustomer,
    component: FormCustomer,
  },
];
export const employeeRoutes = [
  {
    path: PAGE_ROUTES.employees,
    component: Employees,
  },
  {
    path: PAGE_ROUTES.newEmployee,
    component: FormEmployee,
  },
  {
    path: PAGE_ROUTES.editEmployee,
    component: FormEmployee,
  },
];
export const supplierRoutes = [
  {
    path: PAGE_ROUTES.suppliers,
    component: Suppliers,
  },
  {
    path: PAGE_ROUTES.newSupplier,
    component: FormSupplier,
  },
  {
    path: PAGE_ROUTES.editSupplier,
    component: FormSupplier,
  },
];
export const itemRoutes = [
  {
    path: PAGE_ROUTES.items,
    component: Items,
  },
  {
    path: PAGE_ROUTES.newItem,
    component: FormItem,
  },
  {
    path: PAGE_ROUTES.editItem,
    component: FormItem,
  },
];
export const cashupRoutes = [
  {
    path: PAGE_ROUTES.cashups,
    component: Cashups,
  },
  {
    path: PAGE_ROUTES.newCashup,
    component: FormCashup,
  },
  {
    path: PAGE_ROUTES.editCashup,
    component: FormCashup,
  },
  // {
  //   path: PAGE_ROUTES.printCashup,
  //   component: PrintCashup,
  // },
];

export const saleRoutes = [
  {
    path: PAGE_ROUTES.sales,
    component: Sales,
  },
];
