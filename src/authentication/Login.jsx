// src/components/Login.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Form, Input, Button, Row, Col } from 'antd';
import '../style/Login.css';
import { icons } from 'antd/es/image/PreviewGroup';

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
          <img src="src/assets/cat.png" alt="Logo" className="login-logo" />
        </Col>
        <Col className="login-form">
          <div className='header'>
                <h1>POS System</h1>
                <h2>Welcome to admin dashboard </h2>
          </div>
          <Row className='Mainborderlogin'>
            <div className='borderLogin'>
            <Form
              
              name="login"
              onFinish={onFinish}
              style={{ maxWidth: '100%', height: '80%', margin: '0 auto' }}
            >
            <h1 className='login'>Login</h1>
          <Form.Item
  
            className='name'
            name="username"
            rules={[{ required: true, message: 'Please input your username!' }]}
          >
            <Input placeholder="Username" />
          </Form.Item>
          <Form.Item className='name'
            name="password"
            rules={[{ required: true, message: 'Please input your password!' }]}
          >
            <Input.Password placeholder="Password" />
          </Form.Item>
          <Form.Item className='name'>
          
            <Button className='loginButton' type="primary" htmlType="submit" loading={loading}>
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
