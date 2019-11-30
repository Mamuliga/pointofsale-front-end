import React from "react";
import { connect } from "react-redux";
import { simpleAction, postRequest, putRequest, deleteRequest } from "./store/actions/simpleAction";
import 'antd/dist/antd.css';
import { authenticate } from "./store/actions/authActions";
import Routes from "./routes";

function App(props) {
  return (
    <div className="App">
      <Routes {...props} />
    </div>
  );
}

const mapStateToProps = state => ({
  ...state
});

const mapDispatchToProps = dispatch => ({
  simpleAction: () => dispatch(simpleAction()),
  authenticate: () => dispatch(authenticate()),
  postRequest: () => dispatch(postRequest()),
  putRequest: () => dispatch(putRequest()),
  deleteRequest: () => dispatch(deleteRequest())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
