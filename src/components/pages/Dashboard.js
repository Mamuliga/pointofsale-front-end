import React from 'react';
import FormBuilder from '../uis/FormBuilder';
import { getCustomerFormData } from '../../utilities/helpers/formHelpers/customerForm';

const Dashboard = () => {
  return (
    <FormBuilder
      title={'Customer Details'}
      data={getCustomerFormData}
      onClick={() => {}}
    />
  );
};

export default Dashboard;
