import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { useParams, useHistory } from 'react-router-dom';
import FormBuilder from '../uis/FormBuilder';
import { getCashbookFormData } from '../../utilities/helpers/formHelpers/cashbookForm';
import {
  updateCashbookById,
  getCashbookById,
  createCashbook,
  deleteCashbook,
} from '../../http/cashbookApi';
import { PAGE_ROUTES } from '../../services/routeService';
import { fetchApi, setFetchApiInfo } from '../../store/actions/globalAction';

const FormCashbook = ({ fetchApi, setFetchApiErr }) => {
  const { id } = useParams();
  const { push } = useHistory();
  const [dataWithValue, setDataWithValue] = useState([]);
  const [cashbook, setCashbook] = useState({});

  useEffect(() => {
    const handleGetSuccuess = (res) => {
      fetchApi(false);
      const dataArray = [];
      const data = getCashbookFormData;
      const newCashbook = res.data;
      Object.keys(res.data).forEach((id) => {
        data.forEach((entry) => {
          if (id === entry.id) {
            dataArray.push({ ...entry, value: newCashbook[`${id}`] });
          }
          return null;
        });
      });
      setCashbook(newCashbook);
      setDataWithValue([...dataArray]);
    };

    const handleGetErr = (err) => {
      fetchApi(false);
      setFetchApiErr('Unable to get the cashbook details');
    };
    if (id) {
      fetchApi(true);
      getCashbookById(id).then(handleGetSuccuess).catch(handleGetErr);
    }
  }, [fetchApi, id, setFetchApiErr]);

  const handleCreateNewCashbook = (newCashbook) => {
    const handleCreateSuccuess = (res) => {
      fetchApi(false);
      push(PAGE_ROUTES.cashbooks);
      setFetchApiErr({ type: 'success', message: 'Succuessfully created' });
    };
    const handleCreateErr = (err) => {
      console.log(err);
      fetchApi(false);
      setFetchApiErr('Unable to create cashbook');
    };
    fetchApi(true);
    createCashbook(newCashbook)
      .then(handleCreateSuccuess)
      .catch(handleCreateErr);
  };

  const handleFormSubmit = (updatedCashbook, id) => {
    const handleUpdateSuccuess = (res) => {
      fetchApi(false);
      push(PAGE_ROUTES.cashbooks);
    };
    const handleUpdateErr = (err) => {
      fetchApi(false);
      setFetchApiErr('Unable to update cashbook details');
    };
    updatedCashbook.id = undefined;
    updatedCashbook.roleInPOS = undefined;
    fetchApi(true);
    updateCashbookById(id, updatedCashbook)
      .then(handleUpdateSuccuess)
      .catch(handleUpdateErr);
  };

  const handleDelete = () => {
    const handleDeleteSuccuess = () => {
      fetchApi(false);
      push(PAGE_ROUTES.cashbooks);
    };
    const handleDeleteError = (err) => {
      fetchApi(false);
      setFetchApiErr('Unable to delete cashbook');
    };
    fetchApi(true);
    deleteCashbook(cashbook.id)
      .then(handleDeleteSuccuess)
      .catch(handleDeleteError);
  };

  if (cashbook.id && dataWithValue.length) {
    const editingCashbook = { ...cashbook };
    dataWithValue.forEach((field) => {
      editingCashbook[`${field.id}`] = field.value;
    });
    console.log(editingCashbook);
    if (editingCashbook) {
      return (
        <FormBuilder
          title={'Edit cashbook'}
          data={dataWithValue}
          onClick={handleFormSubmit}
          actor={cashbook}
          handleDelete={handleDelete}
        />
      );
    }
    return null;
  } else if (!id) {
    const actor = { ...cashbook };
    return (
      <FormBuilder
        title={'Create new Cashbook'}
        data={getCashbookFormData}
        onClick={handleCreateNewCashbook}
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
  setFetchApiErr: setFetchApiInfo,
};

export default connect(mapStateToProps, mapActionToProps)(FormCashbook);
