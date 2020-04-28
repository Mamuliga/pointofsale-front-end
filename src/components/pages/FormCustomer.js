import React, { useState, useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import FormBuilder from '../uis/FormBuilder';
import { getCustomerFormData } from '../../utilities/helpers/formHelpers/customerForm';
import {
  updateCustomerById,
  getCustomerById,
  createCustomer,
  deleteCustomer,
} from '../../http/customerApi';
import { PAGE_ROUTES } from '../../services/routeService';

const FormCustomer = () => {
  const { id } = useParams();
  const { push } = useHistory();
  const [dataWithValue, setDataWithValue] = useState([]);
  const [customer, setCustomer] = useState({
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
    getCustomerById(id).then((res) => {
      const dataArray = [];
      const data = getCustomerFormData;
      const newCustomer = res.data;
      Object.keys(res.data).forEach((id) => {
        data.forEach((entry) => {
          if (id === entry.id) {
            dataArray.push({ ...entry, value: newCustomer[`${id}`] });
          }
          return null;
        });
      });

      setCustomer(newCustomer);
      setDataWithValue([...dataArray]);
    });
  }, [customer.id, id]);

  const handleCreateNewCustomer = (newCustomer) => {
    const createNewCustomer = () => {
      createCustomer(newCustomer)
        .then(() => {
          alert('New Customer created');
          push(PAGE_ROUTES.customers);
        })
        .catch((err) => {
          console.log(err);
        });
    };
    return createNewCustomer;
  };

  const handleFormSubmit = (updatedCustomer) => {
    const formSubmit = () => {
      updateCustomerById(updatedCustomer.id, updatedCustomer)
        .then((res) => {
          console.log(res.data);
          push(PAGE_ROUTES.customers);
        })
        .catch((err) => {
          console.log(err);
        });
    };
    return formSubmit;
  };

  const handleDelete = () => {
    deleteCustomer(customer.id)
      .then(() => {
        alert('Succuessfully deleted');
        push(PAGE_ROUTES.customers);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  if (customer.id) {
    return (
      <FormBuilder
        title={'Edit Customer'}
        data={dataWithValue}
        onClick={handleFormSubmit}
        actor={customer}
        handleDelete={handleDelete}
      />
    );
  } else {
    return (
      <FormBuilder
        title={'Create new Customer'}
        data={getCustomerFormData}
        onClick={handleCreateNewCustomer}
        actor={customer}
      />
    );
  }
};

export default FormCustomer;
