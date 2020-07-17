import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
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
import { fetchApi, setFetchApiInfo } from '../../store/actions/globalAction';

const FormCustomer = ({ fetchApi, setFetchApiInfo }) => {
  const { id } = useParams();
  const { push } = useHistory();
  const [dataWithValue, setDataWithValue] = useState([]);
  const [customer, setCustomer] = useState({});

  useEffect(() => {
    const handleGetSuccuess = res => {
      fetchApi(false);
      const dataArray = [];
      const data = getCustomerFormData;
      const newCustomer = res.data;
      Object.keys(res.data).forEach(id => {
        data.forEach(entry => {
          if (id === entry.id) {
            dataArray.push({ ...entry, value: newCustomer[`${id}`] });
          }
          return null;
        });
      });
      setCustomer(newCustomer);
      setDataWithValue([...dataArray]);
    };
    const handleGetErr = err => {
      fetchApi(false);
      setFetchApiInfo({
        type: 'error',
        message: 'Unable to get the customer details',
      });
    };
    if (id) {
      fetchApi(true);
      getCustomerById(id).then(handleGetSuccuess).catch(handleGetErr);
    }
  }, [fetchApi, id, setFetchApiInfo]);

  const handleCreateNewCustomer = newCustomer => {
    const handleCreateSuccuess = res => {
      fetchApi(false);
      push(PAGE_ROUTES.customers);
      setFetchApiInfo({ type: 'success', message: 'Succuessfully created' });
    };
    const handleCreateErr = err => {
      console.log(err);
      fetchApi(false);
      setFetchApiInfo({ type: 'error', message: 'Unable to create Customer' });
    };
    fetchApi(true);
    createCustomer(newCustomer)
      .then(handleCreateSuccuess)
      .catch(handleCreateErr);
  };

  const handleFormSubmit = (updatedCustomer, id) => {
    const handleUpdateSuccuess = res => {
      fetchApi(false);
      push(PAGE_ROUTES.customers);
      setFetchApiInfo({ type: 'success', message: 'Succuessfully Updated' });
    };
    const handleUpdateErr = err => {
      fetchApi(false);
      setFetchApiInfo({
        type: 'error',
        message: 'Unable to update customer details',
      });
    };
    updatedCustomer.id = undefined;
    updatedCustomer.roleInPOS = undefined;
    fetchApi(true);
    updateCustomerById(id, updatedCustomer)
      .then(handleUpdateSuccuess)
      .catch(handleUpdateErr);
  };

  const handleDelete = () => {
    const handleDeleteSuccuess = () => {
      fetchApi(false);
      push(PAGE_ROUTES.customers);
    };
    const handleDeleteError = err => {
      fetchApi(false);
      setFetchApiInfo({ type: 'error', message: 'Unable to delete customer' });
    };
    fetchApi(true);
    deleteCustomer(customer.id)
      .then(handleDeleteSuccuess)
      .catch(handleDeleteError);
  };

  if (customer.id && dataWithValue.length) {
    const editingCustomer = { ...customer };
    dataWithValue.forEach(field => {
      editingCustomer[`${field.id}`] = field.value;
    });
    console.log(editingCustomer);
    if (editingCustomer) {
      return (
        <FormBuilder
          title={'Edit Customer'}
          data={dataWithValue}
          onClick={handleFormSubmit}
          actor={editingCustomer}
          handleDelete={handleDelete}
        />
      );
    }
    return null;
  } else if (!id) {
    const actor = { ...customer, gender: 'male' };
    return (
      <FormBuilder
        title={'Create new Customer'}
        data={getCustomerFormData}
        onClick={handleCreateNewCustomer}
        actor={actor}
        buttonName={'Submit'}
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

export default connect(mapStateToProps, mapActionToProps)(FormCustomer);
