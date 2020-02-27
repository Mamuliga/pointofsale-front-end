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
  mainRouteView: {
    maxWidth: `calc(100% - ${SIDE_BAR_WIDTH}px)`,
    marginLeft: SIDE_BAR_WIDTH,
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
    display: 'flex',
    '& > *': {
      margin: theme.spacing(1)
    }
  }
}));
