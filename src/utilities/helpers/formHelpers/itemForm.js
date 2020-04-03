import React from 'react';
import PersonIcon from '@material-ui/icons/Person';
import CalendarViewDayRoundedIcon from '@material-ui/icons/CalendarViewDayRounded';
import MonetizationOnIcon from '@material-ui/icons/MonetizationOn';
import Filter1Icon from '@material-ui/icons/Filter1';
import ViewListRoundedIcon from '@material-ui/icons/ViewListRounded';

export const getItemFormData = [
  {
    id: 'barcode',
    type: 'number',
    label: 'Barcode',
    name: 'barcode',
    required: true,
    icon: <CalendarViewDayRoundedIcon />
  },
  {
    id: 'itemName',
    type: 'text',
    label: 'Item Name',
    name: 'itemName',
    required: true,
    icon: <ViewListRoundedIcon />
  },
  // {
  //   id: 'category',
  //   type: 'radio',
  //   label: 'Category',
  //   name: 'category',
  //   required: true
  // },
  {
    id: 'supplier',
    type: 'text',
    label: 'Supplier',
    name: 'supplier',
    required: true,
    icon: <PersonIcon />
  },
  {
    id: 'costprice',
    name: 'costprice',
    type: 'number',
    label: 'Cost Price',
    required: true,
    icon: <MonetizationOnIcon />
  },
  {
    id: 'sellingprice',
    type: 'number',
    label: 'Selling Price',
    name: 'sellingprice',
    required: true,
    icon: <MonetizationOnIcon />
  },
  {
    id: 'quantity',
    name: 'quantity',
    type: 'number',
    label: 'Quantity',
    icon: <Filter1Icon />
  },
  {
    id: 'avatar',
    name: 'avatar',
    type: 'avatar',
    label: 'Avatar',
    src: '',
    alt: 'avatar'
  },
  {
    id: 'reorderlevel',
    name: 'reorderlevel',
    type: 'number',
    label: 'Reorder Level'
  }
];
