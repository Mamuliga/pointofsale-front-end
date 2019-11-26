//Switch case
//Import to app.js
import React from 'react';
import { Switch, Route } from "react-router-dom";

const Routes = () => (
  <div>
    <Switch>
      <Route exact path="/customers" />
    </Switch>
  </div>
);

export default Routes;
