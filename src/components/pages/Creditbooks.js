import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import TableBuilder from '../uis/TableBuilder.js';
import { useHistory } from 'react-router-dom';
import { getCreditbookTableHeaders } from '../../utilities/helpers/tableHelpers.js';
import { getCreditbookList } from '../../http/creditbookApi';
import { fetchApi, setFetchApiInfo } from '../../store/actions/globalAction.js';

const Creditbooks = ({ fetchApi, setFetchApiInfo }) => {
  const { location, push } = useHistory();
  const [creditList, setCreditList] = useState([]);

  useEffect(() => {
    const handleGetCreditResp = res => {
      fetchApi(false);
      if (Array.isArray(res.data)) {
        const displayCreditList = res.data.map(
          ({ id, firstName, lastName, phoneNo, gender, bankAccount }) => {
            return { id, firstName, lastName, phoneNo, gender, bankAccount };
          }
        );
        setCreditList(displayCreditList);
      }
    };
    const handleGetCreditErr = err => {
      setFetchApiInfo({
        type: 'error',
        message: 'Unable to get credit customers',
      });
      fetchApi(false);
    };
    fetchApi(true);
    getCreditbookList().then(handleGetCreditResp).catch(handleGetCreditErr);
  }, [fetchApi, setFetchApiInfo]);

  const handleEdit = credit => {
    const editClick = () => {
      push(`${location.pathname}/edit/${credit.id}`);
    };
    return editClick;
  };

  return (
    <TableBuilder
      tableData={creditList}
      tableHeaders={getCreditbookTableHeaders}
      handleEdit={handleEdit}
      title={'Credit Book'}
    />
  );
};

const mapStateToProps = ({ global }) => {
  return { ...global };
};

const mapActionToProps = {
  fetchApi,
  setFetchApiInfo,
};

export default connect(mapStateToProps, mapActionToProps)(Creditbooks);
