import React from "react";
import { connect } from "react-redux";
import logo from "./logo.svg";
import "./App.css";
import { simpleAction } from "./actions/simpleAction";
import MaterialUIButtons from "./components/utilComponents/materialUiButton";
import VectorIcon from "./components/utilComponents/VectorIcon";
import { heart, pause, play } from "./assets/vectorIcons";

function App(props) {
  return (
    <div className="App">
      <pre>
        {
          JSON.stringify(props)
        }
      </pre>
      <header className="App-header">
        EIP POS FRONT END
        <MaterialUIButtons />
        <VectorIcon name={heart} /> <VectorIcon name={play} />
        <VectorIcon name={pause} />
        <button onClick={() => props.simpleAction()}>Click me</button>
      </header>
    </div>
  );
}

const mapStateToProps = state => ({
  ...state
});

const mapDispatchToProps = dispatch => ({
  simpleAction: () => dispatch(simpleAction())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
