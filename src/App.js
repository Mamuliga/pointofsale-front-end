import React from "react";
import { connect } from "react-redux";
import { simpleAction, postRequest, putRequest, deleteRequest } from "./store/actions/simpleAction";
import VectorIcon from "./components/uis/VectorIcon";
import { heart, pause, play } from "./assets/vectorIcons";
import { DatePicker } from 'antd';
import 'antd/dist/antd.css';
import { authenticate } from "./store/actions/authActions";
import LoginPage from "./components/login";

function App(props) {
  return (
    <div className="App">
      {/* <pre>
        {JSON.stringify(props)}
      </pre>
      <header className="App-header">
        EIP POS FRONT END
        <VectorIcon name={heart} /> <VectorIcon name={play} />
        <VectorIcon name={pause} />
        <button onClick={() => props.simpleAction()}>Click me</button>
        <button onClick={() => props.authenticate()}>Authenticate</button>
        <button onClick={() => props.postRequest()}>Post Request</button>
        <button onClick={() => props.putRequest()}>Put Request</button>
        <button onClick={() => props.deleteRequest()}>delete Request</button>

        <DatePicker /> */}
        <LoginPage />
      {/* </header> */}
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
