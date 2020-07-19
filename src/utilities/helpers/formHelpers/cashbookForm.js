import React from 'react';
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
export const getCashbookFormDataForDue = [
  {
    id: 'id',
    type: 'text',
    label: 'Customer ID',
    name: 'id',
    readOnly: true,
  },
  {
    id: 'firstName',
    name: 'firstName',
    type: 'text',
    label: 'First Name',
    // readOnly: true,
    // icon: <People />,
  },
  {
    id: 'lastName',
    name: 'lastName',
    type: 'text',
    label: 'Last Name',
    readOnly: true,
    // icon: <People />,
  },
  // {
  //   id: 'refNo',
  //   type: 'text',
  //   label: 'Ref. No',
  //   name: 'refNo',
  //   required: true,
  // },
  {
    id: 'amount',
    type: 'dropdown',
    label: 'Due dropdown',
    name: 'amount',
    required: true,
    multiple: true,
  },
  // {
  //   id: 'description',
  //   type: 'text',
  //   label: 'Description',
  //   name: 'description',
  //   multiline: true,
  //   rows: 4,
  //   required: true,
  // },
];
