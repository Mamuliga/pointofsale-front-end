import React from 'react';
import BusinessIcon from '@material-ui/icons/Business';
import MonetizationOnIcon from '@material-ui/icons/MonetizationOn';

export const getCashbookFormData = [
  {
    id: 'refNo',
    type: 'text',
    label: 'Ref. No',
    name: 'refNo',
    required: true,
  },
  {
    id: 'type',
    type: 'dropDown',
    label: 'Payment',
    name: 'type',
    required: true,
    icon: <BusinessIcon />,
  },
  {
    id: 'amount',
    name: 'amount',
    type: 'number',
    label: 'Amount',
    required: true,
    icon: <MonetizationOnIcon />,
  },
  {
    id: 'description',
    type: 'text',
    label: 'Description',
    name: 'description',
    multiline: true,
    rows: 4,
    required: true,
  },
];
