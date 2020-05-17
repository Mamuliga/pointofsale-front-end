import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { useParams, useHistory } from 'react-router-dom';
import FormBuilder from '../uis/FormBuilder';
import { getEmployeeFormData } from '../../utilities/helpers/formHelpers/employeeForm';
import {
  updateEmployeeById,
  getEmployeeById,
  createEmployee,
  deleteEmployee,
} from '../../http/employeeApi';
import { PAGE_ROUTES } from '../../services/routeService';
import { fetchApi, setFetchApiInfo } from '../../store/actions/globalAction';

const FormEmployee = ({ fetchApi, setFetchApiInfo }) => {
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
      setFetchApiInfo({
        type: 'error',
        message: 'Unable to get the employee details',
      });
    };
    if (id) {
      fetchApi(true);
      getEmployeeById(id).then(handleGetSuccuess).catch(handleGetErr);
    }
  }, [fetchApi, id, setFetchApiInfo]);

  const handleCreateNewEmployee = newEmployee => {
    const handleCreateSuccuess = res => {
      fetchApi(false);
      push(PAGE_ROUTES.employees);
      setFetchApiInfo({ type: 'success', message: 'Succuessfully created' });
    };
    const handleCreateErr = err => {
      console.log(err);
      fetchApi(false);
      setFetchApiInfo({ type: 'error', message: 'Unable to create employee' });
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
      setFetchApiInfo({ type: 'success', message: 'Succuessfully Updated' });
    };
    const handleUpdateErr = err => {
      fetchApi(false);
      setFetchApiInfo({
        type: 'error',
        message: 'Unable to update employee details',
      });
    };
    updatedEmployee.id = undefined;
    updatedEmployee.roleInPOS = undefined;
    fetchApi(true);
    updateEmployeeById(id, updatedEmployee)
      .then(handleUpdateSuccuess)
      .catch(handleUpdateErr);
  };

  const handleDelete = () => {
    const handleDeleteSuccuess = () => {
      fetchApi(false);
      push(PAGE_ROUTES.employees);
    };
    const handleDeleteError = err => {
      fetchApi(false);
      setFetchApiInfo({ type: 'error', message: 'Unable to delete employee' });
    };
    fetchApi(true);
    deleteEmployee(employee.id)
      .then(handleDeleteSuccuess)
      .catch(handleDeleteError);
  };
  if (employee.id && dataWithValue.length) {
    const editingEmployee = { ...employee };
    dataWithValue.forEach(field => {
      editingEmployee[`${field.id}`] = field.value;
    });
    console.log(editingEmployee);
    if (editingEmployee) {
      return (
        <FormBuilder
          title={'Edit Employee'}
          data={dataWithValue}
          onClick={handleFormSubmit}
          actor={editingEmployee}
          handleDelete={handleDelete}
        />
      );
    }
    return null;
  } else if (!id) {
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
  return null;
};

const mapStateToProps = ({ global }) => {
  return { ...global };
};

const mapActionToProps = {
  fetchApi,
  setFetchApiInfo,
};

export default connect(mapStateToProps, mapActionToProps)(FormEmployee);
