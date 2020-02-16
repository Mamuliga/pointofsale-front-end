import React from "react";
import FormBuilder from "../uis/FormBuilder";
import PersonIcon from "@material-ui/icons/Person";
import EmailIcon from "@material-ui/icons/Email";
import HomeIcon from "@material-ui/icons/Home";

const Dashboard = () => {
  return (
    <FormBuilder
      title={"Customer Details"}
      data={[
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
          label: "Address",
          name: "address",
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
          type: "radio",
          label: "gender"
        },
        {
          type: "number",
          label: "phone",
          required: true
        }
      ]}
      onClick={() => {}}
    />
  );
};

export default Dashboard;
