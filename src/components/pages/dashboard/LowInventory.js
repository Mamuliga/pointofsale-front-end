import React from 'react';
import { useHistory } from 'react-router-dom';
import { PAGE_ROUTES } from '../../../services/routeService';

const LowInventory = () => {
  const { push } = useHistory();
  const onClick = () => {
    push(PAGE_ROUTES.lowInventory);
  };
  return (
    <div style={{ minHeight: '140px' }} onClick={onClick}>
      Low Inventory Table builder goes here
    </div>
  );
};

export default LowInventory;
