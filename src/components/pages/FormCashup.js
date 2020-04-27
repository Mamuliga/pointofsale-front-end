import React, { useState, useEffect } from 'react';
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

const FormCashup = () => {
  const { id } = useParams();
  const { push } = useHistory();
  const [dataWithValue, setDataWithValue] = useState([]);
  const [cashup, setCashup] = useState({
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
    getCashupById(id).then((res) => {
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
    });
  }, [cashup.id, id]);

  const handleCreateNewCashup = (newCashup) => {
    const createNewCashup = () => {
      createCashup(newCashup)
        .then(() => {
          alert('New Cashup created');
          push(PAGE_ROUTES.cashups);
        })
        .catch((err) => {
          console.log(err);
        });
    };
    return createNewCashup;
  };

  const handleFormSubmit = (updatedCashup) => {
    const formSubmit = () => {
      updateCashupById(updatedCashup.id, updatedCashup)
        .then((res) => {
          console.log(res.data);
          push(PAGE_ROUTES.cashups);
        })
        .catch((err) => {
          console.log(err);
        });
    };
    return formSubmit;
  };

  const handleDelete = () => {
    deleteCashup(cashup.id)
      .then(() => {
        alert('Succuessfully deleted');
        push(PAGE_ROUTES.cashups);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  if (cashup.id) {
    return (
      <FormBuilder
        title={'Edit cashup'}
        data={dataWithValue}
        onClick={handleFormSubmit}
        actor={cashup}
        handleDelete={handleDelete}
      />
    );
  } else {
    return (
      <FormBuilder
        title={'Create new Cashup'}
        data={getCashupFormData}
        onClick={handleCreateNewCashup}
        actor={cashup}
      />
    );
  }
};

export default FormCashup;
