import React from 'react';
import BusinessIcon from '@material-ui/icons/Business';
import MonetizationOnIcon from '@material-ui/icons/MonetizationOn';

export const getCashupFormData = [
  {
    id: 'cashBook',
    type: 'number',
    label: 'Cash Book',
    name: 'cashBook',
    required: true,
  },
  {
    id: 'refNumber',
    type: 'text',
    label: 'Ref. No',
    name: 'refNumber',
    required: true,
  },
  {
    id: 'payment',
    type: 'dropDown',
    label: 'Payment',
    name: 'payment',
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
