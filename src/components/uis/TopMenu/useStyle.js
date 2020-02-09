import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(theme => ({
  navButton: {
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2)
  },
  innerButton: {
    padding: theme.spacing(1)
  },
  leftMenubar: {
    display: 'flex',
    flex: 1
  }
}));
