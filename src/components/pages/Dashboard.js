import React from "react";
import FormBuilder from "../uis/FormBuilder";
import { getCustomerFormData } from "../../utilities/helpers/formHelpers/customerForm";
import { getEmployeeFormData } from "../../utilities/helpers/formHelpers/employeeForm";
import { getSuplierFormData } from "../../utilities/helpers/formHelpers/suplierForm";

const Dashboard = () => {
  return (
    <div>
      <FormBuilder
        title={"Customer Details"}
        data={getCustomerFormData}
        onClick={() => {}}
      />
      <FormBuilder
        title={"Employee Details"}
        data={getEmployeeFormData}
        onClick={() => {}}
      />
      <FormBuilder
        title={"Supliers Details"}
        data={getSuplierFormData}
        onClick={() => {}}
      />
    </div>
  );
};

export default Dashboard;
