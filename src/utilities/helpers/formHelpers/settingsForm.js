import React from 'react';
import PersonIcon from '@material-ui/icons/Person';
import EmailIcon from '@material-ui/icons/Email';
import HomeIcon from '@material-ui/icons/Home';
import PhoneIphoneIcon from '@material-ui/icons/PhoneIphone';
import PublicIcon from '@material-ui/icons/Public';
import LocationCityIcon from '@material-ui/icons/LocationCity';
import PrintIcon from '@material-ui/icons/Print';

export const getSettingsFormData = [
  {
    id: 'logo',
    type: 'avatar',
    label: 'Company Logo',
    name: 'companyAvatar',
    required: false,
    icon: <PersonIcon />,
  },
  {
    id: 'companyName',
    type: 'text',
    label: 'Company Name',
    name: 'companyName',
    required: true,
    icon: <LocationCityIcon />,
  },
  {
    id: 'address',
    type: 'text',
    label: 'Company Address',
    name: 'address',
    required: false,
    icon: <HomeIcon />,
  },
  {
    id: 'websiteUrl',
    type: 'text',
    label: 'Website',
    name: 'website',
    required: false,
    icon: <PublicIcon />,
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
    id: 'fax',
    type: 'tel',
    label: 'Fax',
    name: 'fax',
    required: false,
    icon: <PrintIcon />,
  },
  {
    id: 'openingTime',
    type: 'time',
    defaultValue: '08:00',
    label: 'opening Time',
    name: 'openingTime',
    required: false,
  },
  {
    id: 'closingTime',
    type: 'time',
    defaultValue: '20:00',
    label: 'Closing Time',
    name: 'closingTime',
    required: false,
  },

  {
    id: 'fax',
    name: 'fax',
    type: 'tel',
    label: 'Fax',
    required: false,
    icon: <PrintIcon />,
  },
  {
    id: 'returnPolicy',
    type: 'text',
    label: 'Return Policy',
    name: 'returnPolicy',
    multiline: true,
    rows: 3,
    required: false,
  },
];
