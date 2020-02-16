import React from "react";
import PersonIcon from "@material-ui/icons/Person";
import EmailIcon from "@material-ui/icons/Email";
import HomeIcon from "@material-ui/icons/Home";

export const getCustomerFormData = [
  {
    type: "text",
    label: "First Name",
    name: "firstName",
    required: true,
    icon: <PersonIcon />
  },
  {
    type: "text",
    label: "Last Name",
    name: "lastName",
    required: true,
    icon: <PersonIcon />
  },
  {
    type: "text",
    label: "Company Name",
    name: "companyName",
    required: true,
    icon: <HomeIcon />
  },
  {
    type: "email",
    label: "Email",
    name: "email",
    required: true,
    icon: <EmailIcon />
  },
  {
    type: "number",
    label: "phone",
    required: true
  },
  {
    type: "text",
    label: "Address",
    name: "address",
    required: true,
    icon: <HomeIcon />
  },
  {
    type: "radio",
    label: "gender"
  },
  {
    type: "date",
    label: "Date of Birth"
  }
];
