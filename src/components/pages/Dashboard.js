import React from 'react';
import FormBuilder from '../uis/FormBuilder';
import { getCustomerFormData } from '../../utilities/helpers/formHelpers/customerForm';

const Dashboard = () => {
  return (
    <FormBuilder
      title={'Customer Details'}
      data={getCustomerFormData}
      onClick={() => {}}
      buttonName={'Submit'}
    />
  );
};

export default Dashboard;
