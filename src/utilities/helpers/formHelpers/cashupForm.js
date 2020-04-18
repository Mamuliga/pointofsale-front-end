import React from 'react';
import BusinessIcon from '@material-ui/icons/Business';
import TodayIcon from '@material-ui/icons/Today';
import MonetizationOnIcon from '@material-ui/icons/MonetizationOn';

export const getCashupFormData = [
  {
    id: 'refNumber',
    type: 'text',
    label: 'Ref. No',
    name: 'refNumber',
    required: true,
  },
  {
    id: 'date',
    type: 'date',
    label: 'Date',
    name: 'date',
    required: true,
    icon: <TodayIcon />,
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
