import React, { useEffect, useState, Fragment } from 'react';
import { connect } from 'react-redux';
import TableBuilder from '../uis/TableBuilder.js';
import { useHistory } from 'react-router-dom';
import { getCustomerTableHeaders } from '../../utilities/helpers/tableHelpers.js';
import { getCustomerList, searchCustomer } from '../../http/customerApi';
import { fetchApi, setFetchApiInfo } from '../../store/actions/globalAction.js';
import useStyles from '../../styles/useStyles.js';
import { TextField } from '@material-ui/core';
import Autocomplete from '@material-ui/lab/Autocomplete';

const Customers = ({ fetchApi, setFetchApiInfo }) => {
  const { location, push } = useHistory();
  const [customerList, setCustomerList] = useState([]);
  const [suggestions, setSuggestions] = useState([]);
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
    getCustomerList()
      .then(handleGetCustomerResp)
      .catch(handleGetCustomerErr);
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
      console.log(res.data);
      setSuggestions(res.data);
    };

    const searchErr = () => {};
    searchCustomer(e.target.value)
      .then(searchSuccess)
      .catch(searchErr);
  };

  const searchComponent = (
    <div className={classes.inputsTop}>
      <div className={classes.searchTab}>
        <Autocomplete
          id='customer search-item-search'
          getOptionLabel={option => `${option.item.id}-${option.item.itemName}`}
          options={suggestions}
          onChange={handleSearchSubmit}
          getOptionDisabled={opt => opt.detail}
          disabledItemsFocusable
          // loading={fetchItems}
          // onFocus={handleFocus}
          renderInput={params => (
            <TextField
              autoFocus
              {...params}
              label='Enter an Item Code, Item Name or Item Id'
              noOptionsText={'No items found'}
              variant='outlined'
              onChange={handleSearchChange}
              // InputProps={{
              //   ...params.InputProps,
              //   startAdornment: <SearchIcon />,
              //   endAdornment: (
              //     <React.Fragment>
              //       {fetchItems && (
              //         <CircularProgress color='inherit' size={20} />
              //       )}
              //       {params.InputProps.endAdornment}
              //     </React.Fragment>
              //   ),
              // }}
            />
          )}
        />
      </div>
    </div>
  );

  return (
    <Fragment>
      {searchComponent}
      <TableBuilder
        tableData={customerList}
        tableHeaders={getCustomerTableHeaders}
        handleEdit={handleEdit}
        title={'Customers'}
      />
    </Fragment>
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
