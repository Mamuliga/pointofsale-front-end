import DashboardIcon from '@material-ui/icons/Dashboard';
import PeopleIcon from '@material-ui/icons/People';
import AttachMoneyIcon from '@material-ui/icons/AttachMoney';
import StorageIcon from '@material-ui/icons/Storage';

export const PAGE_ROUTES = {
  home: '/dashboard',
  login: '/login',
  customers: '/customers',
  cashbooks: '/cashbooks',
  newCustomer: '/customers/new',
  newCashbook: '/cashbooks/new',
  editCustomer: '/customers/edit/:id',
  editCashbook: '/cashbooks/edit/:id',
  employees: '/employees',
  newEmployee: '/employees/new',
  editEmployee: '/employees/edit/:id',
  suppliers: '/suppliers',
  newSupplier: '/suppliers/new',
  editSupplier: '/suppliers/edit/:id',
  sales: '/sales',
  receives: '/receives',
  items: '/items',
  newItem: '/items/new',
  editItem: '/items/edit/:id',
  dailySales: '/dashboard/dailySales',
  bestSellingCustomer: '/dashboard/bestSellingCustomer',
  mostSelledItems: '/dashboard/mostSelledItems',
  paymentTypeAnalytics: '/dashboard/paymentTypeAnalytics',
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
    key: 'receives',
    path: PAGE_ROUTES.receives,
    title: 'Receives',
    icon: AttachMoneyIcon,
  },
  {
    key: 'items',
    path: PAGE_ROUTES.items,
    title: 'Items',
    icon: StorageIcon,
  },
  {
    key: 'cashbooks',
    path: PAGE_ROUTES.cashbooks,
    title: 'Cashbooks',
    icon: AttachMoneyIcon,
  },
];

export const showTopMenuForRoute = route => {
  return !TOP_MENU_HIDE_ROUTES[route];
};

export const showSideMenuForRoute = route => {
  return !SIDE_MENU_HIDE_ROUTES[route];
};
