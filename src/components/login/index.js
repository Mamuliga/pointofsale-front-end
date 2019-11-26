import React from 'react';
import ReactDOM from 'react-dom';
import { Icon, Input, Button, Form } from 'antd';
import './login.css';



const LoginPage = () => {
    return (
        <Form className="login-form">
            <h1 className="center">Welcome</h1>
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