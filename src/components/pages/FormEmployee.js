import React, { useState, useEffect } from 'react';
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

const FormEmployee = () => {
  const { id } = useParams();
  const { push } = useHistory();
  const [dataWithValue, setDataWithValue] = useState([]);
  const [employee, setEmployee] = useState({
    firstName: null,
    lastName: null,
    companyName: null,
    email: null,
    phoneNo: '0771234567',
    gender: 'male',
    address: null,
    dob: '95-01-02',
    description: null,
    profilePicture: 'hh',
    defaultDiscount: null,
    bankAccount: null,
    regDate: null,
    recruiter: null,
  });

  useEffect(() => {
    getEmployeeById(id).then((res) => {
      const dataArray = [];
      const data = getEmployeeFormData;
      const newEmployee = res.data;
      Object.keys(res.data).forEach((id) => {
        data.forEach((entry) => {
          if (id === entry.id) {
            dataArray.push({ ...entry, value: newEmployee[`${id}`] });
          }
          return null;
        });
      });

      setEmployee(newEmployee);
      setDataWithValue([...dataArray]);
    });
  }, [employee.id, id]);

  const handleCreateNewEmployee = (newEmployee) => {
    const createNewEmployee = () => {
      createEmployee(newEmployee)
        .then(() => {
          alert('New Employee created');
          push(PAGE_ROUTES.employees);
        })
        .catch((err) => {
          console.log(err);
        });
    };
    return createNewEmployee;
  };

  const handleFormSubmit = (updatedEmployee) => {
    const formSubmit = () => {
      updateEmployeeById(updatedEmployee.id, updatedEmployee)
        .then((res) => {
          console.log(res.data);
          push(PAGE_ROUTES.employees);
        })
        .catch((err) => {
          console.log(err);
        });
    };
    return formSubmit;
  };

  const handleDelete = () => {
    deleteEmployee(employee.id)
      .then(() => {
        alert('Succuessfully deleted');
        push(PAGE_ROUTES.employees);
      })
      .catch((err) => {
        console.log(err);
      });
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

export default FormEmployee;
