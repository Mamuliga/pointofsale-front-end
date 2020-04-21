import { makeStyles } from "@material-ui/core";
import {
  LEFT_SIDE_BAR_WIDTH,
  TOP_MENU_MAX_HEIGHT,
  RIGHT_SIDE_BAR_WIDTH
} from "../utilities/constants";

export default makeStyles(theme => ({
  root: {
    display: "flex"
  },
  drawer: {
    [theme.breakpoints.up("sm")]: {
      width: LEFT_SIDE_BAR_WIDTH,
      flexShrink: 0,
      zIndex: "1 !important"
    }
  },
  appBar: {
    [theme.breakpoints.up("sm")]: {
      marginLeft: LEFT_SIDE_BAR_WIDTH,
      zIndex: 20000
    }
  },
  sideMenuContainer: {
    marginTop: TOP_MENU_MAX_HEIGHT
  },
  menuButton: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.up("sm")]: {
      display: "none"
    }
  },
  toolbar: theme.mixins.toolbar,
  drawerPaperLeft: {
    width: LEFT_SIDE_BAR_WIDTH
  },
  drawerPaperRight: {
    width: RIGHT_SIDE_BAR_WIDTH
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3)
  },
  mainRouteViewLeftSidebar: {
    maxWidth: `calc(100% - ${LEFT_SIDE_BAR_WIDTH}px)`,
    marginLeft: LEFT_SIDE_BAR_WIDTH,
    marginTop: TOP_MENU_MAX_HEIGHT
  },
  mainRouteViewRightSidebar: {
    maxWidth: `calc(100% - ${RIGHT_SIDE_BAR_WIDTH}px)`,
    marginRight: RIGHT_SIDE_BAR_WIDTH,
    marginTop: TOP_MENU_MAX_HEIGHT
  },
  navButton: {
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2)
  },
  innerButton: {
    padding: theme.spacing(1)
  },
  leftMenubar: {
    display: "flex",
    flex: 1
  },
  copyrightLabel: {
    position: "absolute",
    bottom: 0,
    backgroundColor: theme.palette.primary.dark,
    textAlign: "center",
    width: "100%",
    color: theme.palette.grey[100],
    lineHeight: 0.2
  },
  customAvatarStyles: {
    margin: theme.spacing(1),
    width: theme.spacing(10),
    height: theme.spacing(10)
  },
  inputsTop: {
    position: "relative",
    textAlign: "left",
    display: "flex",
    width: "100%",
    justifyContent: "space-between"
  },
  searchIcon: {
    height: "100%",
    pointerEvents: "none",
    paddingTop: theme.spacing(0.6)
  },
  searchInputRoot: {
    color: "inherit",
    width: "100%"
  },
  searchInput: {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      width: "12ch",
      "&:focus": {
        width: "20ch"
      }
    }
  },
  searchTab: {
    border: 0,
    width: "80%",
    margin: "auto",
    padding: 0,
    position: "relative",
    minWidth: 0,
    verticalAlign: "top"
  },
  searchField: {
    display: "inline-flex",
    width: "100%"
  },
  searchForm: {
    width: "100%"
  },
  total: {
    textAlign: "left",
    display: "flex",
    justifyContent: "flex-end",
    padding: "4px",
    flexDirection: "column",
    paddingTop: theme.spacing(1)
  },
  cash: {
    display: "flex",
    justifyContent: "flex-end",
    padding: "4px",
    flexDirection: "column",
    paddingTop: theme.spacing(1)
  },
  balance: {
    display: "flex",
    justifyContent: "flex-end",
    padding: "4px",
    flexDirection: "column",
    paddingTop: theme.spacing(1)
  },
  customerName: {
    marginBottom: theme.spacing(38),
    paddingTop: theme.spacing(1),
    padding: "4px",
    display: "flex",
    flexDirection: "column"
  },
  Id: {
    paddingTop: theme.spacing(1),
    padding: "4px",
    display: "flex",
    flexDirection: "column"
  },
  button: {
    width: "100%",
    marginBottom: theme.spacing(1)
  },
  barcode: {
    width: "100%",
    margin: "auto",
    textAlign: "center"
  }
}));
