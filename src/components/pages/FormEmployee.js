import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { useParams, useHistory } from 'react-router-dom';
import FormBuilder from '../uis/FormBuilder';
import { getEmployeeFormData } from '../../utilities/helpers/formHelpers/employeeForm';
import {
  updateEmployeeById,
  getEmployeeById,
  createEmployee,
  deleteEmployee
} from '../../http/employeeApi';
import { PAGE_ROUTES } from '../../services/routeService';
import { fetchApi, setFetchApiErr } from '../../store/actions/globalAction';

const FormEmployee = ({ fetchApi, setFetchApiErr }) => {
  const { id } = useParams();
  const { push } = useHistory();
  const [dataWithValue, setDataWithValue] = useState([]);
  const [employee, setEmployee] = useState({});
  useEffect(() => {
    const handleGetSuccuess = res => {
      fetchApi(false);
      const dataArray = [];
      const data = getEmployeeFormData;
      const newEmployee = res.data;
      Object.keys(res.data).forEach(id => {
        data.forEach(entry => {
          if (id === entry.id) {
            dataArray.push({ ...entry, value: newEmployee[`${id}`] });
          }
          return null;
        });
      });
      setEmployee(newEmployee);
      setDataWithValue([...dataArray]);
    };
    const handleGetErr = err => {
      fetchApi(false);
      setFetchApiErr('Unable to get the employee details');
    };
    if (id) {
      fetchApi(true);
      getEmployeeById(id)
        .then(handleGetSuccuess)
        .catch(handleGetErr);
    }
  }, [employee.id, fetchApi, id, setFetchApiErr]);

  const handleCreateNewEmployee = newEmployee => {
    const handleCreateSuccuess = res => {
      fetchApi(false);
      push(PAGE_ROUTES.employees);
    };
    const handleCreateErr = err => {
      console.log(err);
      fetchApi(false);
      setFetchApiErr('Unable to create employee');
    };
    fetchApi(true);
    createEmployee(newEmployee)
      .then(handleCreateSuccuess)
      .catch(handleCreateErr);
  };

  const handleFormSubmit = (updatedEmployee, id) => {
    const handleUpdateSuccuess = res => {
      fetchApi(false);
      push(PAGE_ROUTES.employees);
    };
    const handleUpdateErr = err => {
      fetchApi(false);
      setFetchApiErr('Unable to update employee details');
    };
    const formSubmit = e => {
      e.preventDefault();
      fetchApi(true);
      updateEmployeeById(id, updatedEmployee)
        .then(handleUpdateSuccuess)
        .catch(handleUpdateErr);
    };
    return formSubmit;
  };

  const handleDelete = () => {
    const handleDeleteSuccuess = () => {
      fetchApi(false);
      push(PAGE_ROUTES.employees);
    };
    const handleDeleteError = err => {
      fetchApi(false);
      setFetchApiErr('Unable to delete employee');
    };
    fetchApi(true);
    deleteEmployee(employee.id)
      .then(handleDeleteSuccuess)
      .catch(handleDeleteError);
  };
  if (employee.id) {
    return (
      <FormBuilder
        title={'Edit Employee'}
        data={dataWithValue}
        onClick={handleFormSubmit}
        actor={employee}
        handleDelete={handleDelete}
      />
    );
  } else {
    const actor = { ...employee, gender: 'male' };
    return (
      <FormBuilder
        title={'Create new Employee'}
        data={getEmployeeFormData}
        onClick={handleCreateNewEmployee}
        actor={actor}
      />
    );
  }
};

const mapStateToProps = ({ global }) => {
  return { ...global };
};

const mapActionToProps = {
  fetchApi,
  setFetchApiErr
};

export default connect(mapStateToProps, mapActionToProps)(FormEmployee);
