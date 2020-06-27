import React from 'react';
import { useHistory } from 'react-router-dom';
import dashboardStyles from '../../../styles/dashboard/dashboardStyles';
import GridItem from './Grid/GridItem';
import { PAGE_ROUTES } from '../../../services/routeService';

const VisualCard = ({ children, title, desc, mainPath }) => {
  const classes = dashboardStyles();
  const { push } = useHistory();
  const onClick = () => {
    // push(PAGE_ROUTES[`${key}`]);
    push(mainPath);
  };

  return (
    <GridItem xs={12} sm={12} md={4} onClick={onClick}>
      <div className={classes.card}>
        <div className={classes.cardInnerDiv}>
          <div className={classes.cardShading}>
            <div className={classes.cardInnerDiv2}>{children}</div>
            <div className={classes.cardBody}>
              <h4 className={classes.cardTitle}>{title}</h4>
              <p className={classes.cardOuterDiv}>{desc}</p>
            </div>
          </div>
        </div>
      </div>
    </GridItem>
  );
};

export default VisualCard;
