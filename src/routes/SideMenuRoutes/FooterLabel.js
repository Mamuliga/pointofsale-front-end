import React from "react";
import useStyles from "../../styles/useStyles";

const FooterLabel = ({ hidden }) => {
  const classes = useStyles();
  return (
    <div className={classes.copyrightLabel} hidden={hidden}>
      <p>Emerald IT</p>
      <p>Point of sale Solution</p>
      <p>&copy; All right reserved</p>
    </div>
  );
};

export default FooterLabel;
