import React from "react";
import PersonIcon from "@material-ui/icons/Person";
import EmailIcon from "@material-ui/icons/Email";
import HomeIcon from "@material-ui/icons/Home";
import DescriptionIcon from "@material-ui/icons/Description";

export const getSuplierFormData = [
  {
    id: "firstName",
    type: "text",
    label: "First Name",
    name: "firstName",
    required: true,
    icon: <PersonIcon />
  },
  {
    id: "lastName",
    type: "text",
    label: "Last Name",
    name: "lastName",
    required: true,
    icon: <PersonIcon />
  },
  {
    id: "companyName",
    type: "text",
    label: "Company Name",
    name: "companyName",
    required: true,
    icon: <HomeIcon />
  },
  {
    id: "email",
    type: "email",
    label: "Email",
    name: "email",
    required: true,
    icon: <EmailIcon />
  },
  {
    id: "phoneNo",
    name: "phoneNo",
    type: "number",
    label: "phone",
    required: true
  },
  {
    id: "address",
    type: "text",
    label: "Address",
    name: "address",
    required: true,
    icon: <HomeIcon />
  },
  {
    id: "gender",
    name: "gender",
    type: "radio",
    label: "gender"
  },
  {
    id: "dob",
    name: "dob",
    type: "date",
    label: "Date of Birth"
  },
  {
    id: "description",
    type: "text",
    label: "Description",
    name: "description",
    multiline: true,
    rows: 4,
    required: true,
    icon: <DescriptionIcon />
  },
  {
    id: "profilePicture",
    name: "profilePicture",
    type: "avatar",
    label: "avatar",
    src: "",
    alt: "profile pic"
  },
  {
    id: "defaultDiscount",
    type: "text",
    label: "Default Discount",
    name: "defaultDiscount",
    required: true,
    icon: <HomeIcon />
  },
  {
    id: "bankAccount",
    type: "text",
    label: "Bank Account",
    name: "bankAccount",
    required: true,
    icon: <HomeIcon />
  },
  {
    id: "regDate",
    type: "text",
    label: "Reg Date",
    name: "regDate",
    required: true,
    icon: <HomeIcon />
  },
  {
    id: "recruiter",
    type: "text",
    label: "Recruiter",
    name: "recruiter",
    required: true,
    icon: <HomeIcon />
  }
];
