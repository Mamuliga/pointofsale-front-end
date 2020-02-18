import React from "react";
import FormBuilder from "../uis/FormBuilder";
import { getCustomerFormData } from "../../utilities/helpers/formHelpers/customerForm";

const FormCustomer = ({ onClick, customer, data }) => {
  const dumbClick = () => {};
  return (
    <div>
      {console.log(customer)}
      <FormBuilder
        title={"Customer Details"}
        data={data || getCustomerFormData}
        onClick={onClick || dumbClick}
        actor={customer || {}}
      />
    </div>
  );
};

export default FormCustomer;
