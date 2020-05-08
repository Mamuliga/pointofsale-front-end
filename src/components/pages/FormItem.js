import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { useParams, useHistory } from 'react-router-dom';
import FormBuilder from '../uis/FormBuilder';
import { getItemFormData } from '../../utilities/helpers/formHelpers/itemForm';
import {
  updateItemById,
  getItemById,
  createItem,
  deleteItem
} from '../../http/itemApi';
import { PAGE_ROUTES } from '../../services/routeService';
import { fetchApi, setFetchApiErr } from '../../store/actions/globalAction';

const FormItem = ({ fetchApi, setFetchApiErr }) => {
  const { id } = useParams();
  const { push } = useHistory();
  const [dataWithValue, setDataWithValue] = useState([]);
  const [item, setItem] = useState({});

  useEffect(() => {
    const handleGetSuccuess = res => {
      fetchApi(false);
      const dataArray = [];
      const data = getItemFormData;
      const newItem = res.data;
      Object.keys(res.data).forEach(id => {
        data.forEach(entry => {
          if (id === entry.id) {
            dataArray.push({ ...entry, value: newItem[`${id}`] });
          }
          return null;
        });
      });

      setItem(newItem);
      setDataWithValue([...dataArray]);
    };
    const handleGetErr = err => {
      fetchApi(false);
      setFetchApiErr('unable to get the item details');
    };
    if (id) {
      fetchApi(true);
      getItemById(id)
        .then(handleGetSuccuess)
        .catch(handleGetErr);
    }
  }, [fetchApi, id, setFetchApiErr]);

  const handleCreateNewItem = newItem => {
    const handleCreateSuccuess = res => {
      fetchApi(false);
      push(PAGE_ROUTES.items);
    };
    const handleCreateErr = err => {
      console.log(err);
      fetchApi(false);
      setFetchApiErr('unable to create item');
    };
    fetchApi(true);
    createItem(newItem)
      .then(handleCreateSuccuess)
      .catch(handleCreateErr);
  };

  const handleFormSubmit = (updatedItem, id) => {
    const handleUpdateSuccuess = res => {
      fetchApi(false);
      push(PAGE_ROUTES.items);
    };
    const handleUpdateErr = err => {
      fetchApi(false);
      setFetchApiErr('unable to update item details');
    };
    updatedItem.id = undefined;
    updatedItem.roleInPOS = undefined;
    fetchApi(true);
    updateItemById(id, updatedItem)
      .then(handleUpdateSuccuess)
      .catch(handleUpdateErr);
  };
  const handleDelete = () => {
    const handleDeleteSuccuess = () => {
      fetchApi(false);
      push(PAGE_ROUTES.items);
    };
    const handleDeleteError = err => {
      fetchApi(false);
      setFetchApiErr('Unable to delete item');
    };
    fetchApi(true);
    deleteItem(item.id)
      .then(handleDeleteSuccuess)
      .catch(handleDeleteError);
  };
  if (item.id && dataWithValue.length) {
    const editingItem = { ...item };
    dataWithValue.forEach(field => {
      editingItem[`${field.id}`] = field.value;
    });
    console.log(editingItem);
    if (editingItem) {
      return (
        <FormBuilder
          title={'Edit Item'}
          data={dataWithValue}
          onClick={handleFormSubmit}
          actor={editingItem}
          handleDelete={handleDelete}
        />
      );
    }
    return null;
  } else if (!id) {
    const actor = { ...item };
    return (
      <FormBuilder
        title={'Create new Item'}
        data={getItemFormData}
        onClick={handleCreateNewItem}
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
  setFetchApiErr
};

export default connect(mapStateToProps, mapActionToProps)(FormItem);
