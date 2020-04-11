import React, { Fragment } from "react";
import TextField from "@material-ui/core/TextField";
import useStyles from "../../../styles/useStyles";
// import { ListItemIcon, Divider } from "@material-ui/core";

const Sale = props => {
  const classes = useStyles();
  return (
    <Fragment>
      <div>
        <div className={classes.customerName}>
          <TextField
            id='outlined-textarea'
            label='Customer Name'
            multiline
            variant='outlined'
          />
        </div>
        <div className={classes.total}>
          <TextField
            id='outlined-textarea'
            label='Total'
            multiline
            variant='outlined'
          />
        </div>

        <div className={classes.cash}>
          <TextField
            id='outlined-textarea'
            label='Cash'
            multiline
            variant='outlined'
          />
        </div>
        <div className={classes.balance}>
          <TextField
            id='outlined-textarea'
            label='Balance'
            multiline
            variant='outlined'
          />
        </div>
      </div>
      {/* <Divider /> */}

      {/* <ListItemIcon>Sales ui</ListItemIcon> */}
    </Fragment>
  );
};

export default Sale;
