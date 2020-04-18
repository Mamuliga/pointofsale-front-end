import React from 'react';
import { Snackbar } from '@material-ui/core';
import Alert from '@material-ui/lab/Alert';
import useStyles from '../../styles/useStyles';

const ErrorDisplay = ({ errorMessage, handleClose }) => {
  const classes = useStyles();
  return (
    <div className={classes.errorDisplayRoot}>
      <Snackbar open={!!errorMessage} onClose={handleClose}>
        <Alert
          elevation={6}
          variant="filled"
          severity="error"
          onClose={handleClose}
        >
          {errorMessage}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default ErrorDisplay;
