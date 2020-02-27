import React from "react";
import Avatar from "@material-ui/core/Avatar";
import useStyles from "../../../styles/useStyles";

const CustomAvatar = ({ entry }) => {
  const { src, alt } = entry;
  const classes = useStyles();

  return (
    <div className={classes.customAvatarRoot}>
      <Avatar alt={alt} src={src} />
    </div>
  );
};

export default CustomAvatar;
