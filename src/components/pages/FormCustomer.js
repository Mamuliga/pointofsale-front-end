import React from "react";
import FormBuilder from "../uis/FormBuilder";
import { Button } from "@material-ui/core";

const FormCustomer = ({ onClick, customer }) => {
  return (
    <div>
      {console.log(customer)}
      <FormBuilder />
      <Button variant='contained' color='primary' onClick={onClick()}>
        Submit
      </Button>
    </div>
  );
};

export default FormCustomer;
