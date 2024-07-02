import { useContext, useEffect, useState } from "react";
import { Layout, theme, Input, Space, Modal, message } from "antd";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useLocation,
  useNavigate,
} from "react-router-dom";
import Sidebar from "./components/Sidebar";
import Dashboard from "./components/Dashboard";
import MenuComponent from "./components/Menu";
import Order from "./components/Order";
import Customer from "./components/Customer";
import Employee from "./components/Employee";
import Product from "./components/Product";
import Login from "./authentication/Login";
import { LogoutOutlined } from "@ant-design/icons";
import "./style/Dashboard.css";
import axios from "axios";
import Category from "./components/Category";
import { AuthContext } from "./context/AuthContext";

const { Content, Sider } = Layout;

const App = () => {
  const { auth } = useContext(AuthContext);
  const [isModalVisible, setIsModalVisible] = useState(false); // State to manage modal visibility
  const { Search } = Input;
  const navigate = useNavigate();

  // const onSearch = (value, _e, info) => console.log(info?.source, value);
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const location = useLocation(); // Hook to get the current location
  const { logout } = useContext(AuthContext);

  // Mapping routes to titles
  const routeTitles = {
    "/dashboard": "Dashboard",
    "/menu": "Menu",
    "/category": "Category",
    "/product": "Product",
    "/order": "Order",
    "/customer": "Customer",
    "/employee": "Employee",
  };

  axios.defaults.baseURL = "http://localhost:3000";

  useEffect(() => {
    if (auth.accessToken) {
      axios.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${auth.accessToken}`;
    }
  }, [auth.accessToken]);

  // Get the current route's title
  const currentTitle = routeTitles[location.pathname] || "Dashboard";

  const onSearch = (value) => {
    navigate(`/menu?search=${value}`);
    window.location.reload();
  };

  // Event handler to toggle modal visibility
  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const handleLogout = () => {
    logout();
    message.success("successfully logged out");
    // navigate("/login");
  };

  return (
    <Layout style={{ minHeight: "100vh" }}>
      {auth.accessToken ? (
        <>
          <Sider
            theme="light"
            style={{
              border: "2px solid white",
              borderRadius: "10px",
              boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
            }}
          >
            <div
              className="logo"
              style={{ textAlign: "center", padding: "16px" }}
            >
              <img
                src="src/assets/Logo.png"
                alt="Logo"
                style={{ width: "70%", height: "auto" }}
              />
            </div>
            <Sidebar />
          </Sider>
          <Layout>
            <div className="header1">
              <h1 className="text1">{currentTitle}</h1> {/* Dynamic title */}
              <div className="text2">
                {location.pathname !== "/product" &&
                  location.pathname !== "/employee" &&
                  location.pathname !== "/customer" &&
                  location.pathname !== "/order" && (
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      <Search
                        placeholder="input search text"
                        onSearch={onSearch}
                        // style={{
                        //   width: 400,
                        //   height: 50,
                        // }}
                      />
                    </div>
                  )}
                <div onClick={handleLogout} className="image-container">
                  <LogoutOutlined style={{ fontSize: "20px" }} />
                </div>
                <div className="image-container">
                  <img
                    src="https://upload.wikimedia.org/wikipedia/commons/9/99/Sample_User_Icon.png"
                    alt="Logo"
                    className="login-logo"
                    onClick={showModal} // Add onClick event to show modal
                  />
                </div>
              </div>
            </div>
            <Content style={{ margin: "0 16px" }}>
              <Routes>
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/menu" element={<MenuComponent />} />
                <Route path="/category" element={<Category />} />
                <Route path="/product" element={<Product />} />
                <Route path="/order" element={<Order />} />
                <Route path="/customer" element={<Customer />} />
                <Route path="/employee" element={<Employee />} />
                <Route path="*" element={<Navigate to="/menu" />} />
              </Routes>
            </Content>
          </Layout>
          <Modal
            title="User Information"
            visible={isModalVisible}
            onOk={handleOk}
            onCancel={handleCancel}
          >
            {auth && (
              <>
                <p>Username: {auth?.profile?.userName}</p>
                <p>Phone Number: {auth?.profile?.phone}</p>
                <p>Role: {auth?.profile?.role}</p>
              </>
            )}
          </Modal>
        </>
      ) : (
        <Content style={{ margin: "0 16px" }}>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="*" element={<Navigate to="/login" replace />} />
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
