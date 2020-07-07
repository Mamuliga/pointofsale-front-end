import { makeStyles } from '@material-ui/core';
import {
  LEFT_SIDE_BAR_WIDTH,
  TOP_MENU_MAX_HEIGHT,
  RIGHT_SIDE_BAR_WIDTH,
} from '../utilities/constants';

export default makeStyles(theme => ({
  root: {
    display: 'flex',
  },
  drawer: {
    [theme.breakpoints.up('sm')]: {
      width: LEFT_SIDE_BAR_WIDTH,
      flexShrink: 0,
      zIndex: '1 !important',
    },
  },
  appBar: {
    [theme.breakpoints.up('sm')]: {
      marginLeft: LEFT_SIDE_BAR_WIDTH,
      zIndex: '20000 !important',
    },
  },
  topMenu: {
    display: 'inline-flex',
    justifyContent: 'space-between',
  },
  sideMenuContainer: {
    marginTop: TOP_MENU_MAX_HEIGHT,
  },
  menuButton: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.up('sm')]: {
      display: 'none',
    },
  },
  toolbar: theme.mixins.toolbar,
  drawerPaperRight: {
    width: LEFT_SIDE_BAR_WIDTH,
  },
  drawerPaperLeft: {
    width: RIGHT_SIDE_BAR_WIDTH,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
  customerContainer: {
    marginTop: '13%',
  },
  mainRouteViewLeftSidebar: {
    maxWidth: `calc(100% - ${LEFT_SIDE_BAR_WIDTH}px)`,
    marginLeft: LEFT_SIDE_BAR_WIDTH,
    marginTop: TOP_MENU_MAX_HEIGHT,
  },
  mainRouteViewRightSidebar: {
    maxWidth: `calc(100% - ${RIGHT_SIDE_BAR_WIDTH}px)`,
    marginRight: RIGHT_SIDE_BAR_WIDTH,
    marginTop: TOP_MENU_MAX_HEIGHT,
  },
  navButton: {
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2),
  },
  innerButton: {
    padding: theme.spacing(1),
  },
  logoutButton: {
    padding: theme.spacing(1),
    color: 'inherit',
    opacity: 0.7,
  },
  leftMenubar: {
    display: 'flex',
    flex: 1,
  },
  copyrightLabel: {
    position: 'absolute',
    bottom: 0,
    backgroundColor: theme.palette.primary.dark,
    textAlign: 'center',
    width: '100%',
    color: theme.palette.grey[100],
    lineHeight: 0.2,
  },
  customAvatarStyles: {
    margin: theme.spacing(1),
    width: theme.spacing(10),
    height: theme.spacing(10),
  },
  inputsTop: {
    position: 'relative',
    textAlign: 'left',
    display: 'flex',
    width: '100%',
    justifyContent: 'space-between',
    marginTop: '10px',
  },
  searchIcon: {
    height: '100%',
    pointerEvents: 'none',
    paddingTop: theme.spacing(0.6),
  },
  searchInputRoot: {
    color: 'inherit',
    width: '100%',
  },
  searchInput: {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: '12ch',
      '&:focus': {
        width: '20ch',
      },
    },
  },
  searchTab: {
    border: 0,
    width: '80%',
    margin: 'auto',
    padding: 0,
    position: 'relative',
    minWidth: 0,
    verticalAlign: 'top',
  },
  searchField: {
    display: 'inline-flex',
    width: '100%',
  },
  searchForm: {
    width: '100%',
  },
  searchItemSuggestionBox: {
    background: theme.palette.grey[400],
    padding: '10px',
    width: '100%',
    position: 'absolute',
    top: '400px',
  },
  sideMenuPageBottomInputs: {
    position: 'fixed',
    bottom: 0,
  },
  total: {
    textAlign: 'left',
    display: 'flex',
    justifyContent: 'flex-end',
    padding: '4px',
    flexDirection: 'column',
    paddingTop: theme.spacing(1),
  },
  cash: {
    display: 'flex',
    justifyContent: 'flex-end',
    padding: '4px',
    flexDirection: 'column',
    paddingTop: theme.spacing(1),
  },
  balance: {
    display: 'flex',
    justifyContent: 'flex-end',
    padding: '4px',
    flexDirection: 'column',
    paddingTop: theme.spacing(1),
  },
  customerName: {
    marginBottom: theme.spacing(20),
    paddingTop: theme.spacing(1),
    padding: '4px',
    display: 'flex',
    flexDirection: 'column',
  },
  Id: {
    paddingTop: theme.spacing(1),
    padding: '4px',
    display: 'flex',
    flexDirection: 'column',
  },

  button: {
    width: '100%',
    marginBottom: theme.spacing(1),
  },
  payment: {
    width: '56%',
    marginLeft: '124px',
    marginBottom: theme.spacing(1),
    backgroundColor: '#f44336',
  },
  barcode: {
    width: '100%',
    margin: 'auto',
    textAlign: 'center',
  },
  /*Login styles */
  loginHeading: {
    textAlign: 'center',
  },
  loginFormFieldIcon: {
    width: '10%',
  },
  loginFormField: {
    width: '80%',
  },
  loginRoot: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  loginPaper: {
    width: theme.spacing(50),
    height: theme.spacing(20),
  },
  loginPaperForConfirmPwd: {
    width: theme.spacing(50),
    height: theme.spacing(30),
  },
  loginSubmit: {
    width: theme.spacing(40),
    display: 'flex',
    marginRight: theme.spacing(9),
    marginTop: theme.spacing(4),
  },
  loginGridField: {
    padding: theme.spacing(2),
  },
  loginputField: {
    width: theme.spacing(36),
  },
  loginForgetPassword: {
    width: theme.spacing(80),
    marginTop: theme.spacing(3),
  },
  '& > *': {
    margin: theme.spacing(10),
    width: theme.spacing(80),
    height: theme.spacing(70),
  },
  loginFormControl: {
    margin: theme.spacing(1),
    width: '100%',
  },
  loginProgress: {
    display: 'flex',
    '& > * + *': {
      marginLeft: theme.spacing(2),
    },
  },
  /*Login styles end*/
  /* Form builder styles*/
  formbuilderForm: {
    marginTop: theme.spacing(3),
  },
  formbuilderSubmit: {
    margin: theme.spacing(2, 1),
  },
  formbuilderMargin: {
    marginRight: theme.spacing(1),
  },
  cashbookDateAlign: {
    display: 'inline',
    margin: theme.spacing(2),
  },
  cashbookUi: {
    padding: theme.spacing(2),
  },
  toolTipRows: {
    display: 'flex',
    fontWeight: 'bold',
  },
  toolTipFirstRow: {
    justifyContent: 'space-between',
  },
  toolTipSecondRow: {
    justifyContent: 'space-around',
  },
  paymentdropDown: {
    width: '100%',
    margin: '10px 0',
  },
  paymentTypeTable: {
    width: '100%',
    marginTop: theme.spacing.unit * 3,
    overflowX: 'auto',
  },
}));
