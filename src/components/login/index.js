import React from "react";
import { Icon, Input, Button, Form } from "antd";
import { logo } from "../../assets/images";

const LoginPage = () => {
    return (
        <div className="login-page-container">
            <div className="login-form-container">
                <Form className="login-form">
                    <h2 className="login-title">Welcome to EIT POS</h2>
                    <hr className="divider" />
                    <div className="login-logo">
                        <img className="logo-image" src={logo} alt="logo" />
                    </div>

                    <Form.Item className="username" label="Username">
                        <Input
                            prefix={<Icon type="user" />}
                            placeholder="Username"
                        />
                    </Form.Item>

                    <Form.Item label="Password">
                        <Input
                            prefix={<Icon type="lock" />}
                            placeholder="Password"
                            type="password"
                        />
                    </Form.Item>

                    <Button type="primary" block>
                        Login
      </Button>
                    <div className="login-forgot-password">
                        <a className="login-form-forgot" href="/forgot-password">
                            Forgot password
        </a>
                    </div>
                </Form>
            </div>
        </div>
    );
};
export default LoginPage;
