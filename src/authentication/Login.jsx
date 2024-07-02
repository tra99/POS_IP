import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Form, Input, Button, Row, Col, message } from "antd";
import { AuthContext } from "../context/AuthContext";
import "../style/Login.css";

const Login = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);

  const onFinish = async (values) => {
    setLoading(true);
    const success = await login(values.username, values.password);
    setLoading(false);
    if (success) {
      navigate("/dashboard");
      message.success("Login successful.");
    } else {
      message.error("Login failed. Please check your credentials.");
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
                style={{ maxWidth: "100%", height: "80%", margin: "0 auto" }}
              >
                <h1 className="login">Login</h1>
                <Form.Item
                  className="name"
                  name="username"
                  rules={[
                    { required: true, message: "Please input your username!" },
                  ]}
                >
                  <Input placeholder="Username" aria-label="Username" />
                </Form.Item>
                <Form.Item
                  className="name"
                  name="password"
                  rules={[
                    { required: true, message: "Please input your password!" },
                  ]}
                >
                  <Input.Password
                    placeholder="Password"
                    aria-label="Password"
                  />
                </Form.Item>
                <Form.Item className="name">
                  <Button
                    className="loginButton"
                    type="primary"
                    htmlType="submit"
                    loading={loading}
                  >
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
