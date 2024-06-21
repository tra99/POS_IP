// src/components/Login.js
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Form, Input, Button, Row, Col, message } from 'antd';
import axios from 'axios';
import '../style/Login.css';

const Login = ({ setAuth }) => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const onFinish = async (values) => {
    setLoading(true);
    try {
      const response = await axios.post('http://localhost:3000/api/auth/login', {
        phone: values.username,
        password: values.password,
      });
  
      if (response.status === 200 || response.status === 201) {
        const { accessToken } = response.data;
  
        // Log the access token to the console
        console.log('Access Token:', accessToken);
  
        // Store the token in local storage
        localStorage.setItem('accessToken', accessToken);
        
        // Update the auth state
        setAuth(true);
  
        // Navigate to the dashboard
        navigate('/dashboard');
      } else {
        const errorMsg = response.data.message || 'Unknown error';
        message.error('Login failed: ' + errorMsg);
        setLoading(false);
      }
    } catch (error) {
      const errorMsg = error.response?.data?.message || error.message || 'Unknown error';
      message.error('Login failed: ' + errorMsg);
      setLoading(false);
    }
  };
  

  return (
    <div className="login-container">
      <Row className="login-row">
        <Col className="login-image" xs={24} sm={12} md={8}>
          <img src="src/assets/cat.png" alt="Logo" className="login-logo" />
        </Col>
        <Col className="login-form" xs={24} sm={12} md={16}>
          <div className="header">
            <h1>POS System</h1>
            <h2>Welcome to admin dashboard</h2>
          </div>
          <Row className="Mainborderlogin">
            <div className="borderLogin">
              <Form
                name="login"
                onFinish={onFinish}
                style={{ maxWidth: '100%', height: '80%', margin: '0 auto' }}
              >
                <h1 className="login">Login</h1>
                <Form.Item
                  className="name"
                  name="username"
                  rules={[{ required: true, message: 'Please input your username!' }]}
                >
                  <Input placeholder="Username" aria-label="Username" />
                </Form.Item>
                <Form.Item
                  className="name"
                  name="password"
                  rules={[{ required: true, message: 'Please input your password!' }]}
                >
                  <Input.Password placeholder="Password" aria-label="Password" />
                </Form.Item>
                <Form.Item className="name">
                  <Button className="loginButton" type="primary" htmlType="submit" loading={loading}>
                    Login
                  </Button>
                </Form.Item>
              </Form>
            </div>
          </Row>
        </Col>
      </Row>
    </div>
  );
};

export default Login;
