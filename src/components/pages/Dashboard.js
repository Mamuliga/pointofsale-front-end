import React from 'react';
import PeopleForm from '../uis/PeopleForm';
import { getCustomerFormData } from '../../utilities/helpers/formHelpers/customerForm';

const Dashboard = () => {
  return (
    <PeopleForm
      title={'Customer Details'}
      data={getCustomerFormData}
      onClick={() => {}}
    />
  );
};

export default Dashboard;
