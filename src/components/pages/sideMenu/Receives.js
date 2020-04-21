import React, { Fragment } from "react";
import TextField from "@material-ui/core/TextField";
import useStyles from "../../../styles/useStyles";
import Button from "@material-ui/core/Button";

const Receive = props => {
  const classes = useStyles();

  return (
    <Fragment>
      <div>
        <div className={classes.receiveId}>
          <TextField id="standard-basic" label="Receive Id" />
        </div>
        <div className={classes.customerName}>
          <TextField id="standard-basic" label="Customer Name" />
        </div>
        <div className={classes.total}>
          <TextField id="outlined-textarea" label="Total" />
        </div>

        <div className={classes.cash}>
          <TextField id="outlined-textarea" label="Cash" />
        </div>
        <div className={classes.balance}>
          <TextField id="outlined-textarea" label="Balance" />
        </div>
        <div>
          <Button
            className={classes.button}
            variant="contained"
            color="primary"
          >
            Submit
          </Button>
        </div>
        <div>
          <Button
            className={classes.button}
            variant="contained"
            color="secondary"
          >
            Discard
          </Button>
        </div>
      </div>
    </Fragment>
  );
};

export default Receive;
