import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import TableBuilder from '../uis/TableBuilder.js';
import { useHistory } from 'react-router-dom';
import { getEmployeeTableHeaders } from '../../utilities/helpers/tableHelpers.js';
import { getEmployeeList } from '../../http/employeeApi';
import { fetchApi, setFetchApiInfo } from '../../store/actions/globalAction.js';
import CreateNew from '../uis/CreateNew.js';
import useStyles from '../../styles/useStyles.js';

const Employees = ({ fetchApi, setFetchApiInfo }) => {
  const { location, push } = useHistory();
  const [employeeList, setEmployeeList] = useState([]);

  const classes = useStyles();

  useEffect(() => {
    const handleGetEmployeeResp = res => {
      fetchApi(false);
      if (Array.isArray(res.data)) {
        const displayEmployeeList = res.data.map(
          ({ id, firstName, lastName, phoneNo, gender, bankAccount }) => {
            return { id, firstName, lastName, phoneNo, gender, bankAccount };
          }
        );
        setEmployeeList(displayEmployeeList);
      }
    };
    const handleGetEmployeeErr = err => {
      setFetchApiInfo({ type: 'error', message: 'Unable to get employees' });
      fetchApi(false);
    };

    fetchApi(true);
    getEmployeeList()
      .then(handleGetEmployeeResp)
      .catch(handleGetEmployeeErr);
  }, [fetchApi, setFetchApiInfo]);

  const handleEdit = employee => {
    const editClick = () => {
      push(`${location.pathname}/edit/${employee.id}`);
    };
    return editClick;
  };

  return (
    <div className={classes.pageContainer}>
      <CreateNew type='employees' />
      <TableBuilder
        tableData={employeeList}
        tableHeaders={getEmployeeTableHeaders}
        handleEdit={handleEdit}
        title={'Employees'}
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

export default connect(mapStateToProps, mapActionToProps)(Employees);
