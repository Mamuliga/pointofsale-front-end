import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';

const useStyles = makeStyles((theme) => ({
  avatar: {
    margin: theme.spacing(1),
    width: theme.spacing(10),
    height: theme.spacing(10),
  },
}));

const CustomAvatar = ({ entry }) => {
  const { src, alt } = entry;
  const classes = useStyles();
  return (
    <Grid item xs={6}>
      <Avatar alt={alt} src={src} className={classes.avatar}></Avatar>;
    </Grid>
  );
};

export default CustomAvatar;
