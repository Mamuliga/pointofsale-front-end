import React from 'react';
import { Avatar, Grid, Button } from '@material-ui/core';
import useStyles from '../../../styles/useStyles';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';

const CustomAvatar = ({ entry }) => {
  const { src, alt } = entry;
  const classes = useStyles();

  const fileSelectedHandler = event => {
    console.log(event.target.files[0]);
  };

  return (
    <Grid xs={12}>
      <div className={classes.customAvatarRoot}>
        <Avatar alt={alt} src={src} className={classes.customAvatarStyles} />
        <input
          accept='image/*'
          className={classes.customAvatarInput}
          id='contained-button-file'
          multiple
          type='file'
          onChange={fileSelectedHandler}
        />
        <label
          className={classes.customAvatarButton}
          htmlFor='contained-button-file'
        >
          <Button
            variant='contained'
            color='primary'
            size='small'
            component='span'
            startIcon={<CloudUploadIcon />}
            // onClick={handleButton}
          >
            Upload
          </Button>
        </label>
      </div>
    </Grid>
  );
};

export default CustomAvatar;
