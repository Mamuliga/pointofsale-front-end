import React, { useState } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
// import { Icon, Input, Button, Form } from "antd";
// import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import { logo } from "../../assets/images";
import { authenticate } from "../../store/actions/authActions";
import { FormGroup } from "@material-ui/core";
import Button from "@material-ui/core/Button";
// import classes from "*.module.sass";

const Login = props => {
  // const { loading, onLoginClick, isAuthenticated } = props;
  const { isAuthenticated } = props;

  const [loginCredential, setLoginCredential] = useState({
    username: "",
    password: ""
  });

  const handleFieldChanges = e =>
    setLoginCredential({ ...loginCredential, [e.target.name]: e.target.value });

  // const handleLoginClick = e => {
  //   e.preventDefault();
  //   onLoginClick(loginCredential);
  // };

  if (isAuthenticated) return <Redirect to="/" />;

  return (
    <div className="login-page-container">
      <div className="login-form-container">
        <form className={FormGroup.root} noValidate autoComplete="off">
          <h2 className="login-title">Welcome to EIT POS</h2>
          <hr className="divider" />
          <div className="login-logo">
            <img className="logo-image" src={logo} alt="logo" />
          </div>

          <div>
            <div>
              <lable>Username</lable>
            </div>
            <TextField
              id="outlined-textarea"
              label="User Name"
              placeholder="Placeholder"
              multiline
              variant="outlined"
              onChange={handleFieldChanges}
            />
          </div>
          <div>
            <div>
              <lable>Password</lable>
            </div>
            <TextField
              id="outlined-textarea"
              label="Password"
              placeholder="Placeholder"
              multiline
              variant="outlined"
              onChange={handleFieldChanges}
            />
          </div>
          <div className="button">
            <Button variant="contained" color="primary" disableElevation>
              Login
            </Button>
          </div>
        </form>
      </div>
    </div>
  );

  // {/* //   <div className="login-page-container">
  // //     <div className="login-form-container">
  // //       <Form onSubmit={handleLoginClick} className="login-form">
  // //         <h2 className="login-title">Welcome to EIT POS</h2>
  // //         <hr className="divider" />
  // //         <div className="login-logo">
  // //           <img className="logo-image" src={logo} alt="logo" />
  // //         </div>

  // //         <Form.Item className="username" label="Username">
  // //           <Input
  // //             prefix={<Icon type="user" />}
  // //             placeholder="Username"
  // //             name="username"
  // //             value={loginCredential.username}
  // //             onChange={handleFieldChanges}
  // //           />
  // //         </Form.Item>

  // //         <Form.Item label="Password">
  // //           <Input
  // //             prefix={<Icon type="lock" />}
  // //             placeholder="Password"
  // //             type="password"
  // //             name="password"
  // //             value={loginCredential.password}
  // //             onChange={handleFieldChanges}
  // //           />
  // //         </Form.Item>

  // //         <Button htmlType="submit" loading={loading} type="primary" block>
  // //           Login
  // //         </Button>
  // //         <div className="login-forgot-password">
  // //           <a className="login-form-forgot" href="/forgot-password">
  // //             Forgot password
  // //           </a>
  // //         </div>
  // //       </Form>
  // //     </div>
  // //   </div>
  // // ); */}
};

const mapStateToProps = ({ auth }) => ({
  ...auth
});

const mapActionToProps = {
  onLoginClick: authenticate
};

export default connect(mapStateToProps, mapActionToProps)(Login);
