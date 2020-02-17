import React from "react";
import FormBuilder from "../uis/FormBuilder";

const FormCustomer = ({ onClick, customer, data }) => {
  return (
    <div>
      {console.log(customer)}
      <FormBuilder
        title={"Customer Details"}
        data={data}
        onClick={onClick}
        actor={customer}
      />
    </div>
  );
};

export default FormCustomer;
