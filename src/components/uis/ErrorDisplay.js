import React from "react";
import { Snackbar } from "@material-ui/core";
import Alert from "@material-ui/lab/Alert";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
  root: {
    width: "100%",
    "& > * + *": {
      marginTop: theme.spacing(2)
    }
  }
}));

const ErrorDisplay = ({ errorMessage, handleClose }) => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Snackbar open={!!errorMessage} onClose={handleClose}>
        <Alert
          elevation={6}
          variant='filled'
          severity='error'
          onClose={handleClose}
        >
          {errorMessage}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default ErrorDisplay;
