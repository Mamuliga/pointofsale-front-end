import React from 'react';
import Avatar from '@material-ui/core/Avatar';
// import useStyles from '../../../styles/useStyles';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import { FormControl } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex'
  },
  margin: {
    margin: theme.spacing(1)
  },
  large: {
    width: theme.spacing(9),
    height: theme.spacing(9)
  },
  textField: {
    width: '40ch'
  },
  align: {
    alignItems: 'center'
  }
}));

const CustomAvatar = ({ entry }) => {
  const { src, alt } = entry;
  const classes = useStyles();
  return (
    <FormControl className={clsx(classes.textField, classes.margin)}>
      <Avatar alt={alt} src={src} className={(classes.root, classes.large)} />
    </FormControl>
  );
};

export default CustomAvatar;
