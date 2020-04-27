import React from 'react';
import PersonIcon from '@material-ui/icons/Person';
import EmailIcon from '@material-ui/icons/Email';
import HomeIcon from '@material-ui/icons/Home';
import LocalOfferIcon from '@material-ui/icons/LocalOffer';
import RecentActorsIcon from '@material-ui/icons/RecentActors';
import MonetizationOnIcon from '@material-ui/icons/MonetizationOn';
import PhoneIphoneIcon from '@material-ui/icons/PhoneIphone';

export const getSupplierFormData = [
  {
    id: 'firstName',
    type: 'text',
    label: 'First Name',
    name: 'firstName',
    required: true,
    icon: <PersonIcon />,
  },
  {
    id: 'lastName',
    type: 'text',
    label: 'Last Name',
    name: 'lastName',
    required: true,
    icon: <PersonIcon />,
  },
  {
    id: 'email',
    type: 'email',
    label: 'Email',
    name: 'email',
    required: true,
    icon: <EmailIcon />,
  },
  {
    id: 'phoneNo',
    name: 'phoneNo',
    type: 'number',
    label: 'Mobile Number',
    required: true,
    icon: <PhoneIphoneIcon />,
  },
  {
    id: 'gender',
    name: 'gender',
    type: 'radio',
    label: 'gender',
  },
  {
    id: 'address',
    type: 'text',
    label: 'Address',
    name: 'address',
    required: true,
    icon: <HomeIcon />,
  },
  {
    id: 'defaultDiscount',
    type: 'text',
    label: 'Default Discount',
    name: 'defaultDiscount',
    required: true,
    icon: <LocalOfferIcon />,
  },
  {
    id: 'bankAccount',
    type: 'text',
    label: 'Bank Account',
    name: 'bankAccount',
    required: true,
    icon: <MonetizationOnIcon />,
  },
  {
    id: 'recruiter',
    type: 'text',
    label: 'Recruiter',
    name: 'recruiter',
    required: true,
    icon: <RecentActorsIcon />,
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
