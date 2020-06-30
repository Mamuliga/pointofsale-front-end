import React from 'react';
import PersonIcon from '@material-ui/icons/Person';
import EmailIcon from '@material-ui/icons/Email';
import HomeIcon from '@material-ui/icons/Home';
import LocalOfferIcon from '@material-ui/icons/LocalOffer';
import RecentActorsIcon from '@material-ui/icons/RecentActors';
import MonetizationOnIcon from '@material-ui/icons/MonetizationOn';
import PhoneIphoneIcon from '@material-ui/icons/PhoneIphone';

export const getSettingsFormData = [
  {
    id: 'logo',
    type: 'text',
    label: 'Company Logo',
    name: 'logo',
    required: true,
    autoFocus: true,
    icon: <PersonIcon />,
  },
  {
    id: 'companyName',
    type: 'text',
    label: 'Company Name',
    name: 'companyName',
    required: true,
    icon: <PersonIcon />,
  },
  {
    id: 'address',
    type: 'text',
    label: 'Address',
    name: 'address',
    required: false,
    icon: <HomeIcon />,
  },
  {
    id: 'email',
    type: 'email',
    label: 'Email',
    name: 'email',
    required: false,
    icon: <EmailIcon />,
  },
  {
    id: 'phoneNo',
    name: 'phoneNo',
    type: 'tel',
    label: 'Mobile Number',
    required: false,
    icon: <PhoneIphoneIcon />,
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
    id: 'openingTime',
    type: 'text',
    label: 'opening Time',
    name: 'openingTime',
    required: false,
    icon: <LocalOfferIcon />,
  },
  {
    id: 'closingTime',
    type: 'text',
    label: 'Closing Time',
    name: 'closingTime',
    required: false,
    icon: <LocalOfferIcon />,
  },
];
