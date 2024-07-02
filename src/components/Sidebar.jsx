import { Menu } from "antd";
import {
  PieChartOutlined,
  TeamOutlined,
  MenuOutlined,
  ProductOutlined,
  UserOutlined,
  ShoppingCartOutlined,
  ShopOutlined,
} from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

const getItem = (label, key, icon) => {
  return {
    key,
    icon,
    label,
  };
};

const Sidebar = () => {
  const navigate = useNavigate();
  const {auth}= useContext(AuthContext)
  const items = [
    getItem("Dashboard", "1", <PieChartOutlined />),
    getItem("Menu", "2", <MenuOutlined />),
    getItem("Category", "3", <ShopOutlined />),
    getItem("Product", "4", <ProductOutlined />),
    getItem("Order", "5", <ShoppingCartOutlined />),
    getItem("Customer", "6", <TeamOutlined />),
    ...(auth?.profile?.role === 'admin' ? [getItem("Employee", "7", <UserOutlined />)] : [])
  ];
  
  const onClick = (e) => {
    switch (e.key) {
      case "1":
        navigate("/dashboard");
        break;
      case "2":
        navigate("/menu");
        break;
      case "3":
        navigate("/category");
        break;
      case "4":
        navigate("/product");
        break;
      case "5":
        navigate("/order");
        break;
      case "6":
        navigate("/customer");
        break;
      case "7":
        navigate("/employee");
        break;
      default:
        break;
    }
  };

  return (
    <Menu
      theme="light"
      defaultSelectedKeys={["1"]}
      mode="inline"
      items={items}
      onClick={onClick}
    />
  );
};

export default Sidebar;
