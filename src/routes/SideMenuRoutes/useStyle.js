import { makeStyles } from '@material-ui/core';
import { SIDE_BAR_WIDTH } from '../../utilities/constants';

export default makeStyles(theme => ({
  root: {
    display: 'flex'
  },
  drawer: {
    [theme.breakpoints.up('sm')]: {
      width: SIDE_BAR_WIDTH,
      flexShrink: 0
    }
  },
  appBar: {
    [theme.breakpoints.up('sm')]: {
      width: `calc(100% - ${SIDE_BAR_WIDTH}px)`,
      marginLeft: SIDE_BAR_WIDTH
    }
  },
  menuButton: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.up('sm')]: {
      display: 'none'
    }
  },
  toolbar: theme.mixins.toolbar,
  drawerPaper: {
    width: SIDE_BAR_WIDTH
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3)
  }
}));
