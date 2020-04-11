import DashboardIcon from '@material-ui/icons/Dashboard';
import PeopleIcon from '@material-ui/icons/People';
import AttachMoneyIcon from '@material-ui/icons/AttachMoney';
import StorageIcon from '@material-ui/icons/Storage';

export const PAGE_ROUTES = {
  home: '/dashboard',
  login: '/login',
  customers: '/customers',
  cashups: '/cashups',
  newCustomer: '/customers/new',
  newCashup: '/cashups/new',
  // printCashup: '/cashups/print',
  editCustomer: '/customers/edit/:id',
  editCashup: '/cashups/edit/:id',
  employees: '/employees',
  newEmployee: '/employees/new',
  editEmployee: '/employees/edit/:id',
  suppliers: '/suppliers',
  newSupplier: '/suppliers/new',
  editSupplier: '/suppliers/edit/:id',
  sales: '/sales',
  items: '/items',
  newItem: '/items/new',
  editItem: '/items/edit/:id',
};

const TOP_MENU_HIDE_ROUTES = {
  [PAGE_ROUTES.login]: true,
};

const SIDE_MENU_HIDE_ROUTES = {
  [PAGE_ROUTES.login]: true,
};

export const TOP_MENU_ITEMS = [
  {
    key: 'home',
    path: PAGE_ROUTES.home,
    title: 'Dashboard',
    icon: DashboardIcon,
  },
  {
    key: 'customers',
    path: PAGE_ROUTES.customers,
    title: 'Customers',
    icon: PeopleIcon,
  },
  {
    key: 'employees',
    path: PAGE_ROUTES.employees,
    title: 'Employees',
    icon: PeopleIcon,
  },
  {
    key: 'suppliers',
    path: PAGE_ROUTES.suppliers,
    title: 'Suppliers',
    icon: PeopleIcon,
  },
  {
    key: 'sales',
    path: PAGE_ROUTES.sales,
    title: 'Sales',
    icon: AttachMoneyIcon,
  },
  {
    key: 'items',
    path: PAGE_ROUTES.items,
    title: 'Items',
    icon: StorageIcon,
  },
  {
    key: 'cashups',
    path: PAGE_ROUTES.cashups,
    title: 'Cashups',
    icon: AttachMoneyIcon,
  },
];

export const showTopMenuForRoute = (route) => {
  return !TOP_MENU_HIDE_ROUTES[route];
};

export const showSideMenuForRoute = (route) => {
  return !SIDE_MENU_HIDE_ROUTES[route];
};
