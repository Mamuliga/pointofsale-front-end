import React from "react";
import { connect } from "react-redux";
import classnames from 'classnames';
import { Table, Icon } from 'antd';
import mockCustomers from './utilities/mockData/customers.json';
import { getCustomerTableHeaders } from "./utilities/helpers/tableHelpers.js";

function App(props) {
  const constructTableData = () => {
    return mockCustomers.map((customer) => ({ ...customer }));
  }
  return (
    <div className="App">
      <div className="table-container">
        <Table columns={getCustomerTableHeaders() || [{}]} dataSource={constructTableData()} />
      </div>
    </div >
  );
}

const mapStateToProps = state => ({
  ...state
});

const mapDispatchToProps = dispatch => ({
  // simpleAction: () => dispatch(simpleAction()),
  // authenticate: () => dispatch(authenticate()),
  // postRequest: () => dispatch(postRequest()),
  // putRequest: () => dispatch(putRequest()),
  // deleteRequest: () => dispatch(deleteRequest())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
