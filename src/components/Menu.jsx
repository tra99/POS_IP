import { Card } from 'antd';
import '../style/Menu.css';

const menuItems = [
  { id: 1, name: 'Item 1', description: 'Description for Item 1' },
  { id: 2, name: 'Item 2', description: 'Description for Item 2' },
  { id: 3, name: 'Item 3', description: 'Description for Item 3' },
  { id: 4, name: 'Item 4', description: 'Description for Item 4' },
  { id: 5, name: 'Item 5', description: 'Description for Item 5' },
  { id: 6, name: 'Item 6', description: 'Description for Item 6' },
  { id: 7, name: 'Item 7', description: 'Description for Item 7' },
  { id: 8, name: 'Item 8', description: 'Description for Item 8' },
  { id: 9, name: 'Item 9', description: 'Description for Item 9' },
  { id: 10, name: 'Item 10', description: 'Description for Item 10' },
  // Add more items as needed
];

const MenuComponent = () => {
  return (
    <Card title="Menu" className="menu-card">
      <div className="menu-container">
        {menuItems.map((item) => (
          <Card key={item.id} title={item.name} className="menu-item">
            <p>{item.description}</p>
          </Card>
        ))}
      </div>
    </Card>
  );
};

export default MenuComponent;
