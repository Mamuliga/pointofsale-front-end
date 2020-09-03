import React, { useEffect, useState, Fragment } from 'react';
import { connect } from 'react-redux';
import TableBuilder from '../uis/TableBuilder.js';
import { useHistory } from 'react-router-dom';
import { getSupplierTableHeaders } from '../../utilities/helpers/tableHelpers.js';
import { getSupplierList } from '../../http/supplierApi';
import { fetchApi, setFetchApiInfo } from '../../store/actions/globalAction.js';
import useStyles from '../../styles/useStyles.js';
import { searchSupplier } from '../../http/supplierApi';
import { TextField, CircularProgress } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import Autocomplete from '@material-ui/lab/Autocomplete';

const Suppliers = ({ fetchApi, setFetchApiInfo }) => {
  const { location, push } = useHistory();
  const [supplierList, setSupplierList] = useState([]);
  const [suggestions, setSuggestions] = useState([]);
  const [fetchSuppliers, setFetchSuppliers] = useState(false);
  const classes = useStyles();
  useEffect(() => {
    //   getSupplierList()
    //     .then(res => {
    //       fetchApi(false);
    //       console.log(res);
    //       const displaySupplierList = res.data.map(
    //         ({ id, firstName, lastName, phoneNo, gender, bankAccount }) => {
    //           return { id, firstName, lastName, phoneNo, gender, bankAccount };
    //         }
    //       );
    //       setSupplierList(displaySupplierList);
    //     })
    //     .catch(err => {
    //       setFetchApiErr('Unable to get employees');
    //       fetchApi(false);
    //       console.log(err);
    //     });
    // }, []);
    const handleGetSupplierResp = res => {
      fetchApi(false);
      if (Array.isArray(res.data)) {
        const displaySupplierList = res.data.map(
          ({ id, firstName, lastName, phoneNo, gender, bankAccount }) => {
            return { id, firstName, lastName, phoneNo, gender, bankAccount };
          }
        );
        setSupplierList(displaySupplierList);
      }
    };
    const handleGetSupplierErr = err => {
      setFetchApiInfo({ type: 'error', message: 'Unable to get Suppliers' });
      fetchApi(false);
    };

    fetchApi(true);
    getSupplierList()
      .then(handleGetSupplierResp)
      .catch(handleGetSupplierErr);
  }, [fetchApi, setFetchApiInfo]);

  const handleEdit = supplier => {
    const editClick = () => {
      push(`${location.pathname}/edit/${supplier.id}`);
    };
    return editClick;
  };

  const handleSearchSubmit = () => {};

  const handleSearchChange = e => {
    const searchSuccess = res => {
      setFetchSuppliers(false);
      console.log(res.data);
      if (Array.isArray(res.data)) {
        setSuggestions(res.data);
      }
    };

    const searchErr = () => {
      setFetchApiInfo({ type: 'error', message: 'Unable to search suppliers' });
      setFetchSuppliers(false);
    };
    setFetchSuppliers(true);
    searchSupplier(e.target.value)
      .then(searchSuccess)
      .catch(searchErr);
  };

  const searchComponent = (
    <div className={classes.inputsTop}>
      <div className={classes.searchTab}>
        <Autocomplete
          id='customer search-item-search'
          getOptionLabel={option => `${option.firstName}-${option.lastName}`}
          options={suggestions}
          onChange={handleSearchSubmit}
          loading={fetchSuppliers}
          renderInput={params => (
            <TextField
              autoFocus
              {...params}
              label='Enter a Supplier Name or Id'
              noOptionsText={'No suppliers found'}
              variant='outlined'
              onChange={handleSearchChange}
              InputProps={{
                ...params.InputProps,
                startAdornment: <SearchIcon />,
                endAdornment: (
                  <Fragment>
                    {fetchSuppliers && (
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
    <div className={classes.customerSupplierContainer}>
      {searchComponent}
      <TableBuilder
        tableData={supplierList}
        tableHeaders={getSupplierTableHeaders}
        handleEdit={handleEdit}
        title={'Suppliers'}
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

export default connect(mapStateToProps, mapActionToProps)(Suppliers);
