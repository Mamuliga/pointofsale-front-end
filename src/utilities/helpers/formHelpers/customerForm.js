import React from "react";
import PersonIcon from "@material-ui/icons/Person";
import EmailIcon from "@material-ui/icons/Email";
import HomeIcon from "@material-ui/icons/Home";
import DescriptionIcon from "@material-ui/icons/Description";

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
  },
  {
    type: "text",
    label: "Description",
    name: "description",
    multiline: true,
    rows: 4,
    required: true,
    icon: <DescriptionIcon />
  },
  {
    type: "avatar",
    label: "avatar",
    src: "",
    alt: "profile pic"
  },
  {
    type: "text",
    label: "Default Discount",
    name: "defaultDiscount",
    required: true,
    icon: <HomeIcon />
  },
  {
    type: "text",
    label: "Bank Account",
    name: "bankAccount",
    required: true,
    icon: <HomeIcon />
  },
  {
    type: "text",
    label: "Reg Date",
    name: "regDate",
    required: true,
    icon: <HomeIcon />
  },
  {
    type: "text",
    label: "Recruiter",
    name: "recruiter",
    required: true,
    icon: <HomeIcon />
  }
];
