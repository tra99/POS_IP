import { useState } from 'react';
import { Layout, theme, Input, Space } from 'antd';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Dashboard from './components/Dashboard';
import MenuComponent from './components/Menu';
import Customer from './components/Customer';
import Employee from './components/Employee';
import Product from './components/Product';
import Order from './components/Order';
import Category from './components/Category';
import Login from './authentication/Login';
import { BellOutlined } from '@ant-design/icons';
import './style/Dashboard.css';

const { Content, Sider } = Layout;

const App = () => {
  const [isAuth, setIsAuth] = useState(false);
  const { Search } = Input;
  const onSearch = (value, _e, info) => console.log(info?.source, value);
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const location = useLocation(); // Hook to get the current location

  // Mapping routes to titles
  const routeTitles = {
    '/dashboard': 'Dashboard',
    '/menu': 'Menu',
    '/product': 'Product',
    '/order': 'Order',
    '/customer': 'Customer',
    '/employee': 'Employee',
    '/orderHistory': 'OrderHistory',
    '/category': 'Category',
  };

  // Get the current route's title
  const currentTitle = routeTitles[location.pathname] || 'Dashboard';

  return (
    <Layout style={{ minHeight: '100vh' }}>
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
            <div className="header1">
              <h1 className="text1">{currentTitle}</h1> {/* Dynamic title */}
              <div className='text2'>
                {location.pathname !== '/product' && (
                  <Space direction="vertical">
                    <Search
                      placeholder="input search text"
                      onSearch={onSearch}
                      style={{
                        width: 400,
                        height: 50
                      }}
                    />
                  </Space>
                )}
                <div className="image-container">
                  <BellOutlined style={{ fontSize: "20px" }} />
                </div>
                <div className="image-container">
                  <img src="src/assets/cat.png" alt="Logo" className="login-logo" />
                </div>
              </div>
            </div>
            <Content style={{ margin: '0 16px' }}>
              <Routes>
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/menu" element={<MenuComponent />} />
                <Route path="/product" element={<Product />} />
                <Route path="/customer" element={<Customer />} />
                <Route path="/employee" element={<Employee />} />
                <Route path="/order" element={<Order />} />
                <Route path="/category" element={<Category />} />
                <Route path="*" element={<Navigate to="/menu" />} /> {/* Default route when authenticated */}
              </Routes>
            </Content>
          </Layout>
        </>
      ) : (
        <Content style={{ margin: '0 16px' }}>
          <Routes>
            <Route path="/login" element={<Login setAuth={setIsAuth} />} />
            <Route path="*" element={<Navigate to="/login" replace />} /> {/* Redirect all other routes to login */}
          </Routes>
        </Content>
      )}
    </Layout>
  );
};

const WrappedApp = () => (
  <Router>
    <App />
  </Router>
);

export default WrappedApp;
