import { useNavigate } from 'react-router-dom';
import { Menu } from 'antd';
import {
  PieChartOutlined,
  TeamOutlined,
  MenuOutlined,
  BarChartOutlined,
  DownSquareOutlined,
  WechatOutlined,
  SettingOutlined
} from '@ant-design/icons';

function getItem(label, key, icon, children) {
  return {
    key,
    icon,
    children,
    label,
  };
}

const items = [
  getItem('Dashboard', '/dashboard', <PieChartOutlined />),
  getItem('Menu', '/menu', <MenuOutlined />),
  getItem('Order', '/order', <BarChartOutlined />),
  getItem('Customer', '/customer', <TeamOutlined />),
  getItem('Promotion', '/promotion', <DownSquareOutlined />),
  getItem('Chat', '/chat', <WechatOutlined />),
  getItem('Setting', '/setting', <SettingOutlined />),
];

const Sidebar = () => {
  const navigate = useNavigate();

  const handleMenuClick = (e) => {
    navigate(e.key);
  };

  return (
    <Menu
      theme="light"
      defaultSelectedKeys={['/dashboard']}
      mode="inline"
      items={items}
      onClick={handleMenuClick}
    />
  );
};

export default Sidebar;
