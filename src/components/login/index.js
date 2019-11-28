import React from 'react';
import { Icon, Input, Button, Form } from 'antd';
import './login.css';
import { logo } from '../../assets/images';

const LoginPage = () => {
    return (
        <Form className="login-form">
            <h1 className="center">Welcome</h1>
            <div className="logo" align="center">
                <img src={logo} width="100" height="100" alt="logo" />
            </div>

            <Form.Item className="Uname" label="UserName">
                <Input
                    prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                    placeholder="Username"
                />
            </Form.Item>

            <Form.Item label="Password">
                <Input
                    prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                    placeholder="Password" type="password"
                />
            </Form.Item>

            <Button type="primary" block>
                Login
            </Button>
            <div align="right">
                <a className="login-form-forgot" href="">
                    Forgot password
            </a>
            </div>
        </Form>
    );
}
export default LoginPage;