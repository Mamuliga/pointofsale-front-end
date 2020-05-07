import React from 'react';
import { connect } from 'react-redux';
import { Snackbar } from '@material-ui/core';
import Alert from '@material-ui/lab/Alert';
import useStyles from '../../styles/useStyles';
import { setFetchApiErr } from '../../store/actions/globalAction';

const ErrorDisplay = ({ errorMessage, handleClose, setFetchApiErr }) => {
  const classes = useStyles();
  const handleCloseFetchApi = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setFetchApiErr(null);
  };
  return (
    <div className={classes.errorDisplayRoot}>
      <Snackbar
        open={!!errorMessage}
        onClose={handleClose || handleCloseFetchApi}
      >
        <Alert
          elevation={6}
          variant='filled'
          severity='error'
          onClose={handleClose || handleCloseFetchApi}
        >
          {errorMessage}
        </Alert>
      </Snackbar>
    </div>
  );
};

const mapStateToProps = ({ global }) => ({
  ...global
});

const mapActionToProps = {
  setFetchApiErr
};

export default connect(mapStateToProps, mapActionToProps)(ErrorDisplay);
