import React, { useState } from 'react';
import { Layout, theme } from 'antd';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Dashboard from './components/Dashboard';
import MenuComponent from './components/Menu';
import Order from './components/Order';
import Customer from './components/Customer';
import Promotion from './components/Promotion';
import Chat from './components/Chat';
import Setting from './components/Setting';
import Login from './authentication/Login';

const { Header, Content, Sider } = Layout;

const App = () => {
  const [isAuth, setIsAuth] = useState(false);
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  return (
    <Router>
      <Layout
        style={{
          minHeight: '100vh',
        }}
      >
        {isAuth ? (
          <>
            <Sider
              theme="light"
              style={{
                border: '2px solid white',
                borderRadius: '10px',
                boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
              }}
            >
              <div className="logo" style={{ textAlign: 'center', padding: '16px' }}>
                <img src="src/assets/Logo.png" alt="Logo" style={{ width: '70%', height: 'auto' }} />
              </div>
              <Sidebar />
            </Sider>
            <Layout>
              <Header
                style={{
                  padding: 20,
                  background: colorBgContainer,
                }}
              />
              <Content
                style={{
                  margin: '0 16px',
                }}
              >
                <Routes>
                  <Route path="/dashboard" element={<Dashboard />} />
                  <Route path="/menu" element={<MenuComponent />} />
                  <Route path="/order" element={<Order />} />
                  <Route path="/customer" element={<Customer />} />
                  <Route path="/promotion" element={<Promotion />} />
                  <Route path="/chat" element={<Chat />} />
                  <Route path="/setting" element={<Setting />} />
                  <Route path="*" element={<Navigate to="/dashboard" />} /> {/* Default route */}
                </Routes>
              </Content>
            </Layout>
          </>
        ) : (
          <Routes>
            <Route path="/login" element={<Login setAuth={setIsAuth} />} />
            <Route path="*" element={<Navigate to="/login" />} /> {/* Redirect all unknown routes to login */}
          </Routes>
        )}
      </Layout>
    </Router>
  );
};

export default App;
