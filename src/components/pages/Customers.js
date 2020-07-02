import React, { useEffect, useState, Fragment } from 'react';
import { connect } from 'react-redux';
import TableBuilder from '../uis/TableBuilder.js';
import { useHistory } from 'react-router-dom';
import { getCustomerTableHeaders } from '../../utilities/helpers/tableHelpers.js';
import { getCustomerList, searchCustomer } from '../../http/customerApi';
import { fetchApi, setFetchApiInfo } from '../../store/actions/globalAction.js';
import useStyles from '../../styles/useStyles.js';
import { TextField, CircularProgress } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import Autocomplete from '@material-ui/lab/Autocomplete';

const Customers = ({ fetchApi, setFetchApiInfo }) => {
  const { location, push } = useHistory();
  const [customerList, setCustomerList] = useState([]);
  const [suggestions, setSuggestions] = useState([]);
  const [fetchCustomers, setFetchCustomers] = useState(false);
  const classes = useStyles();

  useEffect(() => {
    const handleGetCustomerResp = res => {
      fetchApi(false);
      if (Array.isArray(res.data)) {
        const displayCustomerList = res.data.map(
          ({ id, firstName, lastName, phoneNo, gender, bankAccount }) => {
            return { id, firstName, lastName, phoneNo, gender, bankAccount };
          }
        );
        setCustomerList(displayCustomerList);
      }
    };
    const handleGetCustomerErr = err => {
      setFetchApiInfo({ type: 'error', message: 'Unable to get customers' });
      fetchApi(false);
    };
    fetchApi(true);
    getCustomerList().then(handleGetCustomerResp).catch(handleGetCustomerErr);
  }, [fetchApi, setFetchApiInfo]);

  const handleEdit = customer => {
    const editClick = () => {
      push(`${location.pathname}/edit/${customer.id}`);
    };
    return editClick;
  };

  const handleSearchSubmit = () => {};

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
    searchCustomer(e.target.value).then(searchSuccess).catch(searchErr);
  };

  const searchComponent = (
    <div className={classes.inputsTop}>
      <div className={classes.searchTab}>
        <Autocomplete
          id='customer search-item-search'
          getOptionLabel={option => `${option.firstName}-${option.lastName}`}
          options={suggestions}
          onChange={handleSearchSubmit}
          loading={fetchCustomers}
          renderInput={params => (
            <TextField
              autoFocus
              {...params}
              label='Enter a Customer name or Id'
              noOptionsText={'No customers found'}
              variant='outlined'
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
  );

  return (
    <div className={classes.customerContainer}>
      {searchComponent}
      <TableBuilder
        tableData={customerList}
        tableHeaders={getCustomerTableHeaders}
        handleEdit={handleEdit}
        title={'Customers'}
      />
    </div>
  );
};

const mapStateToProps = ({ global }) => {
  return { ...global };
};

const mapActionToProps = {
  fetchApi,
  setFetchApiInfo,
};

export default connect(mapStateToProps, mapActionToProps)(Customers);
