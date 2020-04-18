import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import useStyles from '../../../styles/useStyles';
import Grid from '@material-ui/core/Grid';

const CustomAvatar = ({ entry }) => {
  const { src, alt } = entry;
  const classes = useStyles();
  return (
    <Grid item xs={6}>
      <Avatar
        alt={alt}
        src={src}
        className={classes.customAvatarStyles}
      ></Avatar>
    </Grid>
  );
};

export default CustomAvatar;
