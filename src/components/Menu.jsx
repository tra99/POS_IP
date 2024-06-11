import React from 'react';
import { Card, List, Avatar, Button } from 'antd';
import '../style/Menu.css';

const fruitMenu = [
  { name: 'Apple', price: '$2.50', quantity: 50, picture: 'src/assets/apple.png' },
  { name: 'Banana', price: '$1.20', quantity: 100, picture: 'src/assets/banana.png' },
  { name: 'Orange', price: '$1.80', quantity: 80, picture: 'src/assets/orange.png' },
  { name: 'Strawberry', price: '$3.00', quantity: 40, picture: 'src/assets/strawberry.png' },
  { name: 'Grapes', price: '$2.00', quantity: 70, picture: 'src/assets/grapes.png' },
  { name: 'Pineapple', price: '$3.50', quantity: 30, picture: 'src/assets/pineapple.webp' },
  { name: 'Mango', price: '$2.75', quantity: 60, picture: 'src/assets/mango.png' },
  { name: 'Watermelon', price: '$4.00', quantity: 20, picture: 'src/assets/watermelon.webp' },
  { name: 'Apple', price: '$2.50', quantity: 50, picture: 'src/assets/apple.png' },
  { name: 'Banana', price: '$1.20', quantity: 100, picture: 'src/assets/banana.png' },
  { name: 'Orange', price: '$1.80', quantity: 80, picture: 'src/assets/orange.png' },
  { name: 'Strawberry', price: '$3.00', quantity: 40, picture: 'src/assets/strawberry.png' },
  { name: 'Grapes', price: '$2.00', quantity: 70, picture: 'src/assets/grapes.png' },
  { name: 'Pineapple', price: '$3.50', quantity: 30, picture: 'src/assets/pineapple.webp' },
  { name: 'Mango', price: '$2.75', quantity: 60, picture: 'src/assets/mango.png' },
  { name: 'Watermelon', price: '$4.00', quantity: 20, picture: 'src/assets/watermelon.webp' },
  { name: 'Apple', price: '$2.50', quantity: 50, picture: 'src/assets/apple.png' },
  { name: 'Banana', price: '$1.20', quantity: 100, picture: 'src/assets/banana.png' },
  { name: 'Orange', price: '$1.80', quantity: 80, picture: 'src/assets/orange.png' },
  { name: 'Strawberry', price: '$3.00', quantity: 40, picture: 'src/assets/strawberry.png' },
  { name: 'Grapes', price: '$2.00', quantity: 70, picture: 'src/assets/grapes.png' },
  { name: 'Pineapple', price: '$3.50', quantity: 30, picture: 'src/assets/pineapple.webp' },
  { name: 'Mango', price: '$2.75', quantity: 60, picture: 'src/assets/mango.png' },
  { name: 'Watermelon', price: '$4.00', quantity: 20, picture: 'src/assets/watermelon.webp' },
  { name: 'Apple', price: '$2.50', quantity: 50, picture: 'src/assets/apple.png' },
  { name: 'Banana', price: '$1.20', quantity: 100, picture: 'src/assets/banana.png' },
  { name: 'Orange', price: '$1.80', quantity: 80, picture: 'src/assets/orange.png' },
  { name: 'Strawberry', price: '$3.00', quantity: 40, picture: 'src/assets/strawberry.png' },
  { name: 'Grapes', price: '$2.00', quantity: 70, picture: 'src/assets/grapes.png' },
  { name: 'Pineapple', price: '$3.50', quantity: 30, picture: 'src/assets/pineapple.webp' },
];
const productCategory = [
  { name: 'Fruite', picture: 'src/assets/fruiteCategory.png' },
  { name: 'Drink', picture: 'src/assets/apple.png' },
  { name: 'Food', picture: 'src/assets/apple.png' },
  { name: 'SkinCare', picture: 'src/assets/apple.png' },
  { name: 'Meal', picture: 'src/assets/apple.png' },
  { name: 'kitchen', picture: 'src/assets/apple.png' },
  { name: 'Medicine', picture: 'src/assets/apple.png' },
  { name: 'Accessaries', picture: 'src/assets/apple.png' },
  { name: 'Study', picture: 'src/assets/apple.png' },


];

const Menu = () => {
  return (
    <div>
      <div className='menu-manager'>
      <div className="category">
        <div className="category-text">
          <h2 className="text-category1">Category</h2>
          <span className="text-category2" onClick={() => alert('See more clicked')}>
            See more ...
          </span>
        </div>
      </div>
      <div className="menu-manager">

      <div className="menu-container">
        <Card className="menu-card1">
          <List
            grid={{ gutter: 16, column: 9 }}
            dataSource={productCategory}
            renderItem={item => (
              <List.Item>
                <Card className='productCover'>
                  <img src={item.picture} alt={item.name} className="category-image" />

                </Card> 
              </List.Item>
            )}
          />
        </Card>
      </div>
    </div>
      </div>

      <div className="menu-manager">
      <div className="category">
        <div className="category-text2">
          <h2 className="text-category1">Category</h2>
          <span className="text-category2" onClick={() => alert('See more clicked')}>
            See more ...
          </span>
        </div>
      </div>
      <div className="menu-container">
        <Card title="Fruit Menu" className="menu-card">
          <List
            grid={{ gutter: 16, column: 6 }} // Changed from 4 to 6
            dataSource={fruitMenu}
            renderItem={item => (
              <List.Item>
                <Card className='product-card'
                  cover={<img src={item.picture} alt={item.name} className="fruit-image" />}
                  actions={[<Button onClick={() => handleAddToCart(item.name)}>Add</Button>]}
                >
                  <Card.Meta
                    title={item.name}
                    description={`Price: ${item.price} | Quantity: ${item.quantity}`}
                  />
                </Card>
              </List.Item>
            )}
          />
        </Card>
      </div>
    </div>

    </div>
    
  );
};

export default Menu;
