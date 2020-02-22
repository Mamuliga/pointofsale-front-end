import React, { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import FormBuilder from "../uis/FormBuilder";
import { getSuplierFormData } from "../../utilities/helpers/formHelpers/suplierForm";
import {
  updateSuplierById,
  getSuplierById,
  createSuplier,
  deleteSuplier
} from "../../http/suplierApi";
import { PAGE_ROUTES } from "../../services/routeService";

const FormSuplier = () => {
  const { id } = useParams();
  const { push } = useHistory();
  const [dataWithValue, setDataWithValue] = useState([]);
  const [suplier, setSuplier] = useState({
    firstName: null,
    lastName: null,
    companyName: null,
    email: null,
    phoneNo: "0771234567",
    gender: "male",
    address: null,
    dob: "95-01-02",
    description: null,
    profilePicture: "hh",
    defaultDiscount: null,
    bankAccount: null,
    regDate: null,
    recruiter: null
  });

  useEffect(() => {
    getSuplierById(id).then(res => {
      const dataArray = [];
      const data = getSuplierFormData;
      const newSuplier = res.data;
      Object.keys(res.data).forEach(id => {
        data.forEach(entry => {
          if (id === entry.id) {
            dataArray.push({ ...entry, value: newSuplier[`${id}`] });
          }
          return null;
        });
      });

      setSuplier(newSuplier);
      setDataWithValue([...dataArray]);
    });
  }, [suplier.id, id]);

  const handleCreateNewSuplier = newSuplier => {
    const createNewSuplier = () => {
      createSuplier(newSuplier)
        .then(() => {
          alert("New Suplier created");
          push(PAGE_ROUTES.supliers);
        })
        .catch(err => {
          console.log(err);
        });
    };
    return createNewSuplier;
  };

  const handleFormSubmit = updatedSuplier => {
    const formSubmit = () => {
      updateSuplierById(updatedSuplier.id, updatedSuplier)
        .then(res => {
          console.log(res.data);
          push(PAGE_ROUTES.supliers);
        })
        .catch(err => {
          console.log(err);
        });
    };
    return formSubmit;
  };

  const handleDelete = () => {
    deleteSuplier(suplier.id)
      .then(() => {
        alert("Succuessfully deleted");
        push(PAGE_ROUTES.supliers);
      })
      .catch(err => {
        console.log(err);
      });
  };
  if (suplier.id) {
    return (
      <div>
        {console.log(suplier)}
        <FormBuilder
          title={"Edit Suplier"}
          data={dataWithValue}
          onClick={handleFormSubmit}
          actor={suplier}
          handleDelete={handleDelete}
        />
      </div>
    );
  } else {
    return (
      <FormBuilder
        title={"Create new Suplier"}
        data={getSuplierFormData}
        onClick={handleCreateNewSuplier}
        actor={suplier}
      />
    );
  }
};

export default FormSuplier;
