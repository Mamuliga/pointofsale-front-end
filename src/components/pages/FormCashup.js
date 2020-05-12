import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { useParams, useHistory } from 'react-router-dom';
import FormBuilder from '../uis/FormBuilder';
import { getCashupFormData } from '../../utilities/helpers/formHelpers/cashupForm';
import {
  updateCashupById,
  getCashupById,
  createCashup,
  deleteCashup,
} from '../../http/cashupApi';
import { PAGE_ROUTES } from '../../services/routeService';
import { fetchApi, setFetchApiErr } from '../../store/actions/globalAction';

const FormCashup = ({ fetchApi, setFetchApiErr }) => {
  const { id } = useParams();
  const { push } = useHistory();
  const [dataWithValue, setDataWithValue] = useState([]);
  const [cashup, setCashup] = useState({});

  useEffect(() => {
    const handleGetSuccuess = (res) => {
      fetchApi(false);
      const dataArray = [];
      const data = getCashupFormData;
      const newCashup = res.data;
      Object.keys(res.data).forEach((id) => {
        data.forEach((entry) => {
          if (id === entry.id) {
            dataArray.push({ ...entry, value: newCashup[`${id}`] });
          }
          return null;
        });
      });
      setCashup(newCashup);
      setDataWithValue([...dataArray]);
    };

    const handleGetErr = (err) => {
      fetchApi(false);
      setFetchApiErr('Unable to get the cashup details');
    };
    if (id) {
      fetchApi(true);
      getCashupById(id).then(handleGetSuccuess).catch(handleGetErr);
    }
  }, [fetchApi, id, setFetchApiErr]);

  const handleCreateNewCashup = (newCashup) => {
    const handleCreateSuccuess = (res) => {
      fetchApi(false);
      push(PAGE_ROUTES.cashups);
    };
    const handleCreateErr = (err) => {
      console.log(err);
      fetchApi(false);
      setFetchApiErr('Unable to create cashup');
    };
    fetchApi(true);
    createCashup(newCashup).then(handleCreateSuccuess).catch(handleCreateErr);
  };

  const handleFormSubmit = (updatedCashup, id) => {
    const handleUpdateSuccuess = (res) => {
      fetchApi(false);
      push(PAGE_ROUTES.cashups);
    };
    const handleUpdateErr = (err) => {
      fetchApi(false);
      setFetchApiErr('Unable to update cashup details');
    };
    updatedCashup.id = undefined;
    updatedCashup.roleInPOS = undefined;
    fetchApi(true);
    updateCashupById(id, updatedCashup)
      .then(handleUpdateSuccuess)
      .catch(handleUpdateErr);
  };

  const handleDelete = () => {
    const handleDeleteSuccuess = () => {
      fetchApi(false);
      push(PAGE_ROUTES.cashups);
    };
    const handleDeleteError = (err) => {
      fetchApi(false);
      setFetchApiErr('Unable to delete cashup');
    };
    fetchApi(true);
    deleteCashup(cashup.id).then(handleDeleteSuccuess).catch(handleDeleteError);
  };

  if (cashup.id && dataWithValue.length) {
    const editingCashup = { ...cashup };
    dataWithValue.forEach((field) => {
      editingCashup[`${field.id}`] = field.value;
    });
    console.log(editingCashup);
    if (editingCashup) {
      return (
        <FormBuilder
          title={'Edit cashup'}
          data={dataWithValue}
          onClick={handleFormSubmit}
          actor={cashup}
          handleDelete={handleDelete}
        />
      );
    }
    return null;
  } else if (!id) {
    const actor = { ...cashup };
    return (
      <FormBuilder
        title={'Create new Cashup'}
        data={getCashupFormData}
        onClick={handleCreateNewCashup}
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
  setFetchApiErr,
};

export default connect(mapStateToProps, mapActionToProps)(FormCashup);
