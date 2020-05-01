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
import { fetchApi } from '../../store/actions/globalAction';

const FormEmployee = ({ fetchApi }) => {
  const { id } = useParams();
  const { push } = useHistory();
  const [dataWithValue, setDataWithValue] = useState([]);
  const [employee, setEmployee] = useState({});

  useEffect(() => {
    fetchApi(true);
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
    };
    getEmployeeById(id)
      .then(handleGetSuccuess)
      .catch(handleGetErr);
  }, [employee.id, fetchApi, id]);

  const handleCreateNewEmployee = newEmployee => {
    const handleCreateSuccuess = () => {
      alert('New Employee created');
      push(PAGE_ROUTES.employees);
    };
    const handleCreateErr = err => {
      console.log(err);
    };
    const createNewEmployee = () => {
      createEmployee(newEmployee)
        .then(handleCreateSuccuess)
        .catch(handleCreateErr);
    };
    return createNewEmployee;
  };

  const handleFormSubmit = (updatedEmployee, id) => {
    const handleUpdateSuccuess = res => {
      push(PAGE_ROUTES.employees);
    };
    const handleUpdateErr = err => {};
    const formSubmit = () => {
      updateEmployeeById(id, updatedEmployee)
        .then(handleUpdateSuccuess)
        .catch(handleUpdateErr);
    };
    return formSubmit;
  };

  const handleDelete = () => {
    const handleDeleteSuccuess = () => {
      alert('Succuessfully deleted');
      push(PAGE_ROUTES.employees);
    };
    const handleDeleteError = err => {
      console.log(err);
    };
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
    return (
      <FormBuilder
        title={'Create new Employee'}
        data={getEmployeeFormData}
        onClick={handleCreateNewEmployee}
        actor={employee}
      />
    );
  }
};

const mapStateToProps = ({ global }) => {
  return { ...global };
};

const mapActionToProps = {
  fetchApi
};

export default connect(mapStateToProps, mapActionToProps)(FormEmployee);
