import React, { useState, useEffect } from 'react';
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

const FormItem = () => {
  const { id } = useParams();
  const { push } = useHistory();
  const [dataWithValue, setDataWithValue] = useState([]);
  const [item, setItem] = useState({
    firstName: null,
    lastName: null,
    companyName: null,
    email: null,
    phoneNo: '',
    gender: '',
    address: null,
    dob: '',
    description: null,
    profilePicture: '',
    defaultDiscount: null,
    bankAccount: null,
    regDate: null,
    recruiter: null
  });

  useEffect(() => {
    getItemById(id).then(res => {
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
    });
  }, [item.id, id]);

  const handleCreateNewItem = newItem => {
    const createNewItem = () => {
      createItem(newItem)
        .then(() => {
          alert('New Item created');
          push(PAGE_ROUTES.items);
        })
        .catch(err => {
          console.log(err);
        });
    };
    return createNewItem;
  };

  const handleFormSubmit = updatedItem => {
    const formSubmit = () => {
      updateItemById(updatedItem.id, updatedItem)
        .then(res => {
          console.log(res.data);
          push(PAGE_ROUTES.items);
        })
        .catch(err => {
          console.log(err);
        });
    };
    return formSubmit;
  };

  const handleDelete = () => {
    deleteItem(item.id)
      .then(() => {
        alert('Succuessfully deleted');
        push(PAGE_ROUTES.items);
      })
      .catch(err => {
        console.log(err);
      });
  };
  if (item.id) {
    return (
      <div>
        <FormBuilder
          title={'Edit Item'}
          data={dataWithValue}
          onClick={handleFormSubmit}
          actor={item}
          handleDelete={handleDelete}
        />
      </div>
    );
  } else {
    return (
      <FormBuilder
        title={'Create new Item'}
        data={getItemFormData}
        onClick={handleCreateNewItem}
        actor={item}
      />
    );
  }
};

export default FormItem;
