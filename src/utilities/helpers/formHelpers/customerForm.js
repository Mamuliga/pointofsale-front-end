import React from 'react';
import PersonIcon from '@material-ui/icons/Person';
import EmailIcon from '@material-ui/icons/Email';
import HomeIcon from '@material-ui/icons/Home';
import BusinessIcon from '@material-ui/icons/Business';
import TodayIcon from '@material-ui/icons/Today';
import LocalOfferIcon from '@material-ui/icons/LocalOffer';
import RecentActorsIcon from '@material-ui/icons/RecentActors';
import MonetizationOnIcon from '@material-ui/icons/MonetizationOn';
import PhoneIphoneIcon from '@material-ui/icons/PhoneIphone';

export const getCustomerFormData = [
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
    required: false,
    icon: <PersonIcon />,
  },
  {
    id: 'companyName',
    type: 'text',
    label: 'Company Name',
    name: 'companyName',
    required: false,
    icon: <BusinessIcon />,
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
    type: 'number',
    label: 'Mobile Number',
    required: false,
    icon: <PhoneIphoneIcon />,
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
    id: 'gender',
    name: 'gender',
    type: 'radio',
    label: 'gender',
  },
  {
    id: 'dob',
    name: 'dob',
    type: 'date',
    label: 'Date of Birth',
    icon: <TodayIcon />,
  },

  {
    id: 'defaultDiscount',
    type: 'text',
    label: 'Default Discount',
    name: 'defaultDiscount',
    required: false,
    icon: <LocalOfferIcon />,
  },
  {
    id: 'bankAccount',
    type: 'text',
    label: 'Bank Account',
    name: 'bankAccount',
    required: false,
    icon: <MonetizationOnIcon />,
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
    id: 'recruiter',
    type: 'text',
    label: 'Recruiter',
    name: 'recruiter',
    required: false,
    icon: <RecentActorsIcon />,
  },
  {
    id: 'profilePicture',
    name: 'profilePicture',
    type: 'avatar',
    label: 'avatar',
    src: '',
    alt: 'profile pic',
  },
];
