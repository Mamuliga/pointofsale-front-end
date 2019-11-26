//Switch case
//Import to app.js
import React from "react";
import { Switch, Route } from "react-router-dom";
import Main from "../components/main";
import Customers from "../components/customers";
import Suppliers from "../components/suppliers";
import Sales from "../components/sales";
import Login from "../components/login";

const Routes = () => (
  <div>
    <Switch>
      <Route exact path="/" component={Main} />
      <Route exact path="/login" component={Login} />
      <Route exact path="/customers" component={Customers} />
      <Route exact path="/suppliers" component={Suppliers} />
      <Route exact path="/sales" component={Sales} />
    </Switch>
  </div>
);

export default Routes;
