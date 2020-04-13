import React, { Fragment } from "react";
import TextField from "@material-ui/core/TextField";
import useStyles from "../../../styles/useStyles";
import Button from "@material-ui/core/Button";

const Sale = props => {
  const classes = useStyles();
  return (
    <Fragment>
      <div>
        <div className={classes.saleId}>
          <TextField id="standard-basic" label="Sale Id" />
        </div>
        <div className={classes.customerName}>
          <TextField id="standard-basic" label="Customer Name" />
        </div>
        <div className={classes.total}>
          <TextField
            id="outlined-textarea"
            label="Total"
            multiline
            variant="outlined"
          />
        </div>

        <div className={classes.cash}>
          <TextField
            id="outlined-textarea"
            label="Cash"
            multiline
            variant="outlined"
          />
        </div>
        <div className={classes.balance}>
          <TextField
            id="outlined-textarea"
            label="Balance"
            multiline
            variant="outlined"
          />
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
      {/* <Divider /> */}

      {/* <ListItemIcon>Sales ui</ListItemIcon> */}
    </Fragment>
  );
};

export default Sale;
