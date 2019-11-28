import React from 'react';
import { Icon, Input, Button, Form } from 'antd';
import './login.css';
import { logo } from '../../assets/images';
// import logo from '../../assets/images/emraldIT.jpeg';

const LoginPage = () => {
    return (
        <Form className="login-form">
            <h1 className="center">Welcome</h1>
            <div class="logo" align="center">
                <img src={logo} width="100" height="100" alt="go" />
            </div>

            <Form.Item label="UserName">
                <Input
                    prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                    placeholder="Username"
                />
            </Form.Item>

            <Form.Item label="Password">
                <Input
                    prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                    placeholder="Password"
                />
            </Form.Item>

            <Button type="primary" block>
                Login
            </Button>
            <a className="login-form-forgot" href="">
                Forgot password
          </a>


        </Form>
    );
}
export default LoginPage;