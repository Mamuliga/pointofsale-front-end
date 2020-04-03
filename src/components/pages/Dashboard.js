import React from 'react';
// import FormBuilder from '../uis/FormBuilder';
import PeopleForm from '../uis/PeopleForm';
import { getCustomerFormData } from '../../utilities/helpers/formHelpers/customerForm';

const Dashboard = () => {
  return (
    // <FormBuilder
    <PeopleForm
      title={'Customer Details'}
      data={getCustomerFormData}
      onClick={() => {}}
    />
  );
};

export default Dashboard;
