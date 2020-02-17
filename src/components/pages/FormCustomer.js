import React from "react";
import FormBuilder from "../uis/FormBuilder";
import { getCustomerFormData } from "../../utilities/helpers/formHelpers/customerForm";

const FormCustomer = ({ onClick, customer }) => {
  return (
    <div>
      {console.log(customer)}
      <FormBuilder
        title={"Customer Details"}
        data={getCustomerFormData}
        onClick={onClick}
        actor={customer}
      />
    </div>
  );
};

export default FormCustomer;
