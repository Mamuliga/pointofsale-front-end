import React, { useState, useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import FormBuilder from '../uis/FormBuilder';
import { getSupplierFormData } from '../../utilities/helpers/formHelpers/supplierForm';
import {
  updateSupplierById,
  getSupplierById,
  createSupplier,
  deleteSupplier
} from '../../http/supplierApi';
import { PAGE_ROUTES } from '../../services/routeService';

const FormSupplier = () => {
  const { id } = useParams();
  const { push } = useHistory();
  const [dataWithValue, setDataWithValue] = useState([]);
  const [supplier, setSupplier] = useState({});

  useEffect(() => {
    getSupplierById(id).then(res => {
      const dataArray = [];
      const data = getSupplierFormData;
      const newSupplier = res.data;
      Object.keys(res.data).forEach(id => {
        data.forEach(entry => {
          if (id === entry.id) {
            dataArray.push({ ...entry, value: newSupplier[`${id}`] });
          }
          return null;
        });
      });
      setSupplier(newSupplier);
      setDataWithValue([...dataArray]);
    });
  }, [supplier.id, id]);

  const handleCreateNewSupplier = newSupplier => {
    const createNewSupplier = () => {
      createSupplier(newSupplier)
        .then(() => {
          alert('New Supplier created');
          push(PAGE_ROUTES.suppliers);
        })
        .catch(err => {
          console.log(err);
        });
    };
    return createNewSupplier;
  };

  const handleFormSubmit = (updatedSupplier, id) => {
    const formSubmit = () => {
      updateSupplierById(id, updatedSupplier)
        .then(res => {
          console.log(res.data);
          push(PAGE_ROUTES.suppliers);
        })
        .catch(err => {
          console.log(err);
        });
    };
    return formSubmit;
  };

  const handleDelete = () => {
    deleteSupplier(supplier.id)
      .then(() => {
        alert('Succuessfully deleted');
        push(PAGE_ROUTES.suppliers);
      })
      .catch(err => {
        console.log(err);
      });
  };
  if (supplier.id) {
    return (
      <FormBuilder
        title={'Edit Supplier'}
        data={dataWithValue}
        onClick={handleFormSubmit}
        actor={supplier}
        handleDelete={handleDelete}
      />
    );
  } else {
    return (
      <FormBuilder
        title={'Create new Supplier'}
        data={getSupplierFormData}
        onClick={handleCreateNewSupplier}
        actor={supplier}
      />
    );
  }
};

export default FormSupplier;
