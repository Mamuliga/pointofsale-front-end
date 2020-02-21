import DashboardIcon from "@material-ui/icons/Dashboard";
import PeopleIcon from "@material-ui/icons/People";
import AttachMoneyIcon from "@material-ui/icons/AttachMoney";
import StorageIcon from "@material-ui/icons/Storage";

export const PAGE_ROUTES = {
  home: "/dashboard",
  login: "/login",
  customers: "/customers",
  employees: "/employees",
  suppliers: "/suppliers",
  sales: "/sales",
  items: "/items"
};

const TOP_MENU_HIDE_ROUTES = {
  [PAGE_ROUTES.login]: true
};

const SIDE_MENU_HIDE_ROUTES = {
  [PAGE_ROUTES.login]: true
};

export const TOP_MENU_ITEMS = [
  {
    key: "home",
    path: PAGE_ROUTES.home,
    title: "Dashboard",
    icon: DashboardIcon
  },
  {
    key: "customers",
    path: PAGE_ROUTES.customers,
    title: "Customers",
    icon: PeopleIcon
  },
  {
    key: "employees",
    path: PAGE_ROUTES.employees,
    title: "Employee",
    icon: PeopleIcon
  },
  {
    key: "suppliers",
    path: PAGE_ROUTES.suppliers,
    title: "Suppliers",
    icon: PeopleIcon
  },
  {
    key: "sales",
    path: PAGE_ROUTES.sales,
    title: "Sales",
    icon: AttachMoneyIcon
  },
  {
    key: "items",
    path: PAGE_ROUTES.items,
    title: "Items",
    icon: StorageIcon
  }
];

export const showTopMenuForRoute = route => {
  return !TOP_MENU_HIDE_ROUTES[route];
};

export const showSideMenuForRoute = route => {
  return !SIDE_MENU_HIDE_ROUTES[route];
};
