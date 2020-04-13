import { makeStyles } from "@material-ui/core";
import { SIDE_BAR_WIDTH, TOP_MENU_MAX_HEIGHT } from "../utilities/constants";

export default makeStyles(theme => ({
  root: {
    display: "flex"
  },
  drawer: {
    [theme.breakpoints.up("sm")]: {
      width: SIDE_BAR_WIDTH,
      flexShrink: 0,
      zIndex: "1 !important"
    }
  },
  appBar: {
    [theme.breakpoints.up("sm")]: {
      marginLeft: SIDE_BAR_WIDTH,
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
  drawerPaper: {
    width: SIDE_BAR_WIDTH
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3)
  },
  mainRouteViewLeftSidebar: {
    maxWidth: `calc(100% - ${SIDE_BAR_WIDTH}px)`,
    marginLeft: SIDE_BAR_WIDTH,
    marginTop: TOP_MENU_MAX_HEIGHT
  },
  mainRouteViewRightSidebar: {
    maxWidth: `calc(100% - ${SIDE_BAR_WIDTH}px)`,
    marginRight: SIDE_BAR_WIDTH,
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
  customAvatarRoot: {
    display: "flex",
    "& > *": {
      margin: theme.spacing(1)
    }
  },
  inputsTop: {
    position: "relative",
    textAlign: "left",
    display: "flex",
    width: "100%",
    justifyContent: "space-between"
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    // display: "flex",
    textAlign: "left",
    alignItems: "center",
    paddingTop: theme.spacing(0.6)
    // justifyContent: "center"
  },
  inputRoot: {
    color: "inherit",
    width: "100%"
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
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
    margin: 0,
    // width: "700px",
    display: "inline-flex",
    padding: 0,
    marginLeft: "50px",
    position: "relative",
    minWidth: 0,
    flexDirection: "column",
    verticalAlign: "top"
    // minWidth: 0,
    // position: "relative",
    // width: "700px",
    // height: "40px",
    // display: "center",
    // paddingRight: theme.spacing(2),
    // marginLeft: "30px"
  },
  search: {
    marginLeft: "50px",
    width: "1200px"
  },
  total: {
    display: "flex",
    justifyContent: "flex-end",
    padding: "4px",
    paddingTop: theme.spacing(1)
  },
  cash: {
    display: "flex",
    justifyContent: "flex-end",
    padding: "4px",
    paddingTop: theme.spacing(1)
  },
  balance: {
    display: "flex",
    justifyContent: "flex-end",
    padding: "4px",
    paddingTop: theme.spacing(1)
  },
  customerName: {
    textAlign: "right",
    marginBottom: theme.spacing(38)
  },
  saleId: {
    textAlign: "right"
  },
  button: {
    textAlign: "left",
    width: "100%",
    marginBottom: theme.spacing(1)
  }
}));
