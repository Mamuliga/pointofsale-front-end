import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import TableBuilder from '../uis/TableBuilder.js';
import { useHistory } from 'react-router-dom';
import { getCustomerTableHeaders } from '../../utilities/helpers/tableHelpers.js';
import { getCustomerList } from '../../http/customerApi';
import { fetchApi, setFetchApiErr } from '../../store/actions/globalAction.js';

const Customers = ({ fetchApi, setFetchApiErr }) => {
  const { location, push } = useHistory();
  const [customerList, setCustomerList] = useState([]);

  useEffect(() => {
    const handleGetCustomerResp = (res) => {
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
    const handleGetCustomerErr = (err) => {
      setFetchApiErr('Unable to get customers');
      fetchApi(false);
    };

    fetchApi(true);
    getCustomerList().then(handleGetCustomerResp).catch(handleGetCustomerErr);
  }, [fetchApi, setFetchApiErr]);

  const handleEdit = (customer) => {
    const editClick = () => {
      push(`${location.pathname}/edit/${customer.id}`);
    };
    return editClick;
  };

  return (
    <TableBuilder
      tableData={customerList}
      tableHeaders={getCustomerTableHeaders}
      handleEdit={handleEdit}
      title={'Customers'}
    />
  );
};

const mapStateToProps = ({ global }) => {
  return { ...global };
};

const mapActionToProps = {
  fetchApi,
  setFetchApiErr,
};

export default connect(mapStateToProps, mapActionToProps)(Customers);
