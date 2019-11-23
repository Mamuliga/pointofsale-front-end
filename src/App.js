import React from "react";
import { connect } from "react-redux";
import logo from "./logo.svg";
import "./App.css";
import { simpleAction } from "./actions/simpleAction";
import MaterialUIButtons from "./materialUiButton";
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
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <MaterialUIButtons />
        <VectorIcon name={heart} /> <VectorIcon name={play} />
        <VectorIcon name={pause} />
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
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
