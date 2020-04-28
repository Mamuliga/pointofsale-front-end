import React from 'react';
import CalendarViewDayRoundedIcon from '@material-ui/icons/CalendarViewDayRounded';
import ViewListRoundedIcon from '@material-ui/icons/ViewListRounded';

export const getItemFormData = [
  {
    id: 'barcode',
    type: 'number',
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
    icon: <ViewListRoundedIcon />,
  },
  {
    id: 'category',
    type: 'text',
    label: 'Category',
    name: 'category',
    required: true,
  },
  {
    id: 'reorderlevel',
    name: 'reorderlevel',
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
    required: true,
  },
];
