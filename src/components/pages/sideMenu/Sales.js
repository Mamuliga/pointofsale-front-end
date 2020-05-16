import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import TextField from '@material-ui/core/TextField';
import useStyles from '../../../styles/useStyles';
import Button from '@material-ui/core/Button';
import Barcode from 'react-barcode';

const Sale = props => {
  const classes = useStyles();
  const { cartItems } = props;
  console.log(props);
  const cartTotal = cartItems.reduce(
    (billTotal, { qty, salesPrice }) => qty * salesPrice + billTotal,
    0
  );
  return (
    <Fragment>
      <form>
        <div className={classes.customerName}>
          <TextField id='sale-customer-name' label='Customer Name' />
        </div>
        <div style={{ position: 'fixed', bottom: 0 }}>
          <div className={classes.total}>
            <TextField
              id='sale-total-inputs'
              label='Total'
              value={parseFloat(cartTotal).toFixed(2)}
              disabled
            />
          </div>
          <div className={classes.cash}>
            <TextField id='sale-cash-inputs' label='Cash' />
          </div>
          <div className={classes.balance}>
            <TextField id='sale-balance-inputs' label='Balance' />
          </div>
          <div>
            <Button
              className={classes.button}
              variant='contained'
              color='primary'
            >
              Submit
            </Button>
          </div>
          <div>
            <Button
              className={classes.button}
              variant='contained'
              color='secondary'
            >
              Discard
            </Button>
            <div className={classes.barcode}>
              <Barcode value='0000000000001' />
            </div>
          </div>
        </div>
      </form>
    </Fragment>
  );
};

const mapStateToProps = ({ global, sale }) => ({ ...global, ...sale });

const mapActionToProps = {};

export default connect(mapStateToProps, mapActionToProps)(Sale);
