import React, { Fragment, useState } from 'react';
import { connect } from 'react-redux';
import useStyles from '../../../styles/useStyles';
import SearchIcon from '@material-ui/icons/Search';
import RemoveCircleIcon from '@material-ui/icons/RemoveCircle';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { TextField, CircularProgress, Card } from '@material-ui/core';
import { setCartItems } from '../../../store/actions/saleActions';
import { setFetchApiInfo, fetchApi } from '../../../store/actions/globalAction';
import { searchCustomer } from '../../../http/customerApi';

const CustomerSearch = ({ setFetchApiInfo }) => {
  const classes = useStyles();
  const defaultCustomer = {
    id: 1,
    firstName: 'Default',
    lastName: 'Customer',
    email: 'defaultCustomer@gmail.com',
  };
  const [suggestions, setSuggestions] = useState([]);
  const [fetchCustomers, setFetchCustomers] = useState(false);
  const [customer, setCustomer] = useState({
    id: 2,
    firstName: 'Marjan',
    lastName: 'Mukram',
    email: 'marjan.emeraldit@gmail.com',
  });

  const handleSearchChange = e => {
    const searchSuccess = res => {
      setFetchCustomers(false);
      console.log(res.data);
      if (Array.isArray(res.data)) {
        setSuggestions(res.data);
      }
    };

    const searchErr = () => {
      setFetchApiInfo({ type: 'error', message: 'Unable to search customers' });
      setFetchCustomers(false);
    };
    setFetchCustomers(true);
    searchCustomer(e.target.value)
      .then(searchSuccess)
      .catch(searchErr);
  };

  const handleSearchSubmit = (_e, value) => {
    setCustomer(value);
  };

  const handleRemoveSelectedCustomer = () => {
    setCustomer(defaultCustomer);
  };
  if (customer.id > 1) {
    const { firstName, lastName, email } = customer;
    return (
      <Card className={classes.cardSales}>
        <div className={classes.salesCustomerInfo}>
          <div className={classes.displaySalesCustomerInfo}>
            <h2>{`${firstName} ${lastName}`}</h2>
            <h3>{email}</h3>
          </div>
          <div className={classes.removeCustomerIcon}>
            <RemoveCircleIcon
              onClick={handleRemoveSelectedCustomer}
              className={classes.materialIcon}
            />
          </div>
        </div>
      </Card>
    );
  }
  return (
    <Card className={classes.cardSales}>
      <div className={classes.inputsTop}>
        <div className={classes.searchTab}>
          <Autocomplete
            id='customer search-item-search'
            getOptionLabel={option => `${option.firstName} ${option.lastName}`}
            options={suggestions}
            onChange={handleSearchSubmit}
            loading={fetchCustomers}
            renderInput={params => (
              <TextField
                autoFocus
                {...params}
                label='Enter a Customer name or Id'
                noOptionsText={'No customers found'}
                onChange={handleSearchChange}
                InputProps={{
                  ...params.InputProps,
                  startAdornment: <SearchIcon />,
                  endAdornment: (
                    <Fragment>
                      {fetchCustomers && (
                        <CircularProgress color='inherit' size={20} />
                      )}
                      {params.InputProps.endAdornment}
                    </Fragment>
                  ),
                }}
              />
            )}
          />
        </div>
      </div>
    </Card>
  );
};

const mapStateToProps = ({ global, sale }) => ({ ...global, ...sale });

const mapActionToProps = {
  setCartItems,
  setFetchApiInfo,
  fetchApi,
};

export default connect(mapStateToProps, mapActionToProps)(CustomerSearch);
