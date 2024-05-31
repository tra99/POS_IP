import { Menu } from 'antd';
import {
  PieChartOutlined,
  TeamOutlined,
  MenuOutlined,
  BarChartOutlined,
  DownSquareOutlined,
  SettingOutlined,
} from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';

const getItem = (label, key, icon) => {
  return {
    key,
    icon,
    label,
  };
};

const items = [
  getItem('Dashboard', '1', <PieChartOutlined />),
  getItem('Menu', '2', <MenuOutlined />),
  getItem('Order', '3', <BarChartOutlined />),
  getItem('Customer', '4', <TeamOutlined />),
  getItem('Promotion', '5', <DownSquareOutlined />),
  getItem('Setting', '6', <SettingOutlined />),
];

const Sidebar = () => {
  const navigate = useNavigate();

  const onClick = (e) => {
    switch (e.key) {
      case '1':
        navigate('/dashboard');
        break;
      case '2':
        navigate('/menu');
        break;
      case '3':
        navigate('/order');
        break;
      case '4':
        navigate('/customer');
        break;
      case '5':
        navigate('/promotion');
        break;
      case '6':
        navigate('/setting');
        break;
      default:
        break;
    }
  };

  return (
    <Menu
      theme="light"
      defaultSelectedKeys={['1']}
      mode="inline"
      items={items}
      onClick={onClick}
    />
  );
};

export default Sidebar;
