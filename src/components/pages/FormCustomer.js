import React, { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import FormBuilder from "../uis/FormBuilder";
import { getCustomerFormData } from "../../utilities/helpers/formHelpers/customerForm";
import { updateCustomerById, getCustomerById } from "../../http/customerApi";
import { PAGE_ROUTES } from "../../services/routeService";

const FormCustomer = () => {
  const { id } = useParams();
  const { push } = useHistory();
  const [dataWithValue, setDataWithValue] = useState([]);
  const [customer, setCustomer] = useState({});

  useEffect(() => {
    getCustomerById(id).then(res => {
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
    });
  }, [customer.id, id]);
  const handleFormSubmit = updatedCustomer => {
    const formSubmit = () => {
      updateCustomerById(updatedCustomer.id, updatedCustomer)
        .then(res => {
          console.log(res.data);
          push(PAGE_ROUTES.customers);
        })
        .catch(err => {
          console.log(err);
        });
    };
    return formSubmit;
  };
  const dumbClick = () => {};
  if (customer.id) {
    return (
      <div>
        {console.log(customer)}
        <FormBuilder
          title={"Customer Details"}
          data={dataWithValue}
          onClick={handleFormSubmit || dumbClick}
          actor={customer}
        />
      </div>
    );
  } else {
    return null;
  }
  // return (
  //   <div>
  //     {console.log(customer)}
  //     <FormBuilder
  //       title={"Customer Details"}
  //       data={dataWithValue || getCustomerFormData}
  //       onClick={handleFormSubmit || dumbClick}
  //       actor={customer || {}}
  //     />
  //   </div>
  // );
};

export default FormCustomer;
