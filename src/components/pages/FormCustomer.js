import React from "react";
import FormBuilder from "../uis/FormBuilder";
import PersonIcon from "@material-ui/icons/Person";
import EmailIcon from "@material-ui/icons/Email";
import HomeIcon from "@material-ui/icons/Home";

const FormCustomer = ({ onClick, customer }) => {
  return (
    <div>
      {console.log(customer)}
      <FormBuilder
        title={"Customer Details"}
        data={[
          {
            type: "text",
            label: "First Name",
            name: "firstName",
            required: true,
            value: customer.firstName,
            icon: <PersonIcon />
          },
          {
            type: "text",
            label: "Last Name",
            name: "lastName",
            required: true,
            value: customer.lastName,
            icon: <PersonIcon />
          },
          {
            type: "text",
            label: "Address",
            name: "address",
            required: true,
            value: customer.address,
            icon: <HomeIcon />
          },
          {
            type: "email",
            label: "Email",
            name: "email",
            required: true,
            value: customer.email,
            icon: <EmailIcon />
          },
          {
            type: "radio",
            label: "gender"
          },
          {
            type: "number",
            label: "phone",
            required: true
          }
        ]}
        onClick={onClick}
      />
    </div>
  );
};

export default FormCustomer;
