// src/components/Login.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Form, Input, Button, Row, Col } from 'antd';
import '../style/Login.css';

const Login = ({ setAuth }) => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const onFinish = (values) => {
    setLoading(true);
    // Simulate an API call
    setTimeout(() => {
      setLoading(false);
      setAuth(true); // Set authentication state to true
      navigate('/dashboard'); // Redirect to dashboard
    }, 1000);
  };

  return (
    <div className="login-container">
      <Row className="login-row">
        <Col className="login-image">
          <img src="src/assets/login-image.png" alt="Logo" className="login-logo" />
        </Col>
        <Col className="login-form">
          <Form
            name="login"
            onFinish={onFinish}
            style={{ maxWidth: '300px', margin: '0 auto' }}
          >
            <h2>Login</h2>
            <Form.Item
              name="username"
              rules={[{ required: true, message: 'Please input your username!' }]}
            >
              <Input placeholder="Username" />
            </Form.Item>
            <Form.Item
              name="password"
              rules={[{ required: true, message: 'Please input your password!' }]}
            >
              <Input.Password placeholder="Password" />
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit" loading={loading}>
                Login
              </Button>
            </Form.Item>
          </Form>
        </Col>
      </Row>
    </div>
  );
};

export default Login;
