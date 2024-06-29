import { Menu } from 'antd';
import {
  PieChartOutlined,
  TeamOutlined,
  MenuOutlined,
  BarChartOutlined,
  ProductOutlined,
  UserOutlined,
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
  getItem('Product', '3', <ProductOutlined />),
  getItem('Order', '4', <BarChartOutlined />),
  getItem('Customer', '5', <TeamOutlined />),
  getItem('Employee', '6', <UserOutlined />),
  
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
        navigate('/product');
        break;
      case '4':
        navigate('/order');
        break;
      case '5':
        navigate('/customer');
        break;
      case '6':
        navigate('/employee');
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
