import React from 'react';
import CalendarViewDayRoundedIcon from '@material-ui/icons/CalendarViewDayRounded';
import ViewListRoundedIcon from '@material-ui/icons/ViewListRounded';

export const getItemFormData = [
  {
    id: 'barcode',
    type: 'text',
    label: 'Barcode',
    name: 'barcode',
    required: true,
    icon: <CalendarViewDayRoundedIcon />,
  },
  {
    id: 'itemName',
    type: 'text',
    label: 'Item Name',
    name: 'itemName',
    required: true,
    autoFocus: true,
    icon: <ViewListRoundedIcon />,
  },
  {
    id: 'category',
    type: 'text',
    label: 'Category',
    name: 'category',
    required: false,
  },
  {
    id: 'reOrderLevel',
    name: 'reOrderLevel',
    type: 'number',
    label: 'Reorder Level',
  },
  {
    id: 'description',
    type: 'text',
    label: 'Description',
    name: 'description',
    multiline: true,
    rows: 4,
    required: false,
  },
  {
    id: 'customSwitch',
    type: 'switch',
    label: 'Expiry Date Validation',
    name: 'isExpireDateEnabled',
  },
];
