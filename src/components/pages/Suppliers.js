import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import TableBuilder from '../uis/TableBuilder.js';
import { useHistory } from 'react-router-dom';
import { getSupplierTableHeaders } from '../../utilities/helpers/tableHelpers.js';
import { getSupplierList } from '../../http/supplierApi';
import { fetchApi, setFetchApiInfo } from '../../store/actions/globalAction.js';

const Suppliers = ({ fetchApi, setFetchApiErr }) => {
  const { location, push } = useHistory();
  const [supplierList, setSupplierList] = useState([]);

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
    const handleGetSupplierResp = (res) => {
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
    const handleGetSupplierErr = (err) => {
      setFetchApiErr('Unable to get supplier');
      fetchApi(false);
    };

    fetchApi(true);
    getSupplierList().then(handleGetSupplierResp).catch(handleGetSupplierErr);
  }, [fetchApi, setFetchApiErr]);

  const handleEdit = (supplier) => {
    const editClick = () => {
      push(`${location.pathname}/edit/${supplier.id}`);
    };
    return editClick;
  };

  return (
    <TableBuilder
      tableData={supplierList}
      tableHeaders={getSupplierTableHeaders}
      handleEdit={handleEdit}
      title={'Suppliers'}
    />
  );
};

const mapStateToProps = ({ global }) => {
  return { ...global };
};

const mapActionToProps = {
  fetchApi,
  setFetchApiErr: setFetchApiInfo,
};

export default connect(mapStateToProps, mapActionToProps)(Suppliers);
