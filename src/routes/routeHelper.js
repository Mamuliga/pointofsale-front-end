import { PAGE_ROUTES } from "../services/routeService";
import {
  Customers,
  FormCustomer,
  Employees,
  FormEmployee,
  Suppliers,
  FormSupplier
} from "../components/pages";

export const customerRoutes = [
  {
    path: PAGE_ROUTES.customers,
    component: Customers
  },
  {
    path: PAGE_ROUTES.newCustomer,
    component: FormCustomer
  },
  {
    path: PAGE_ROUTES.editCustomer,
    component: FormCustomer
  }
];
export const employeeRoutes = [
  {
    path: PAGE_ROUTES.employees,
    component: Employees
  },
  {
    path: PAGE_ROUTES.newEmployee,
    component: FormEmployee
  },
  {
    path: PAGE_ROUTES.editEmployee,
    component: FormEmployee
  }
];
export const supplierRoutes = [
  {
    path: PAGE_ROUTES.suppliers,
    component: Suppliers
  },
  {
    path: PAGE_ROUTES.newSupplier,
    component: FormSupplier
  },
  {
    path: PAGE_ROUTES.editSupplier,
    component: FormSupplier
  }
];
