import React, { useState } from 'react';
import { Card, List, Avatar, Button, Drawer, Radio, Input, Tabs, Form } from 'antd';
import '../style/Menu.css';

const fruitMenu = [
  { name: 'Apple', price: 2.50, quantity: 50, picture: 'src/assets/apple.png' },
  { name: 'Banana', price: 1.20, quantity: 100, picture: 'src/assets/banana.png' },
  { name: 'Orange', price: 1.80, quantity: 80, picture: 'src/assets/orange.png' },
  { name: 'Strawberry', price: 3.00, quantity: 40, picture: 'src/assets/strawberry.png' },
  { name: 'Grapes', price: 2.00, quantity: 70, picture: 'src/assets/grapes.png' },
  { name: 'Pineapple', price: 3.50, quantity: 30, picture: 'src/assets/pineapple.webp' },
  { name: 'Mango', price: 2.75, quantity: 60, picture: 'src/assets/mango.png' },
  { name: 'Watermelon', price: 4.00, quantity: 20, picture: 'src/assets/watermelon.webp' },
  { name: 'Apple', price: 2.50, quantity: 50, picture: 'src/assets/apple.png' },
  { name: 'Banana', price: 1.20, quantity: 100, picture: 'src/assets/banana.png' },
  { name: 'Orange', price: 1.80, quantity: 80, picture: 'src/assets/orange.png' },
  { name: 'Strawberry', price: 3.00, quantity: 40, picture: 'src/assets/strawberry.png' },
  { name: 'Grapes', price: 2.00, quantity: 70, picture: 'src/assets/grapes.png' },
  { name: 'Pineapple', price: 3.50, quantity: 30, picture: 'src/assets/pineapple.webp' },
  { name: 'Mango', price: 2.75, quantity: 60, picture: 'src/assets/mango.png' },
  { name: 'Watermelon', price: 4.00, quantity: 20, picture: 'src/assets/watermelon.webp' },
];

const productCategory = [
  { name: 'Fruit', picture: 'src/assets/fruiteCategory.png' },
  { name: 'Drink', picture: 'src/assets/fruiteCategory.png' },
  { name: 'Food', picture: 'src/assets/fruiteCategory.png' },
  { name: 'SkinCare', picture: 'src/assets/fruiteCategory.png' },
  // { name: 'Meal', picture: 'src/assets/fruiteCategory.png' },
  // { name: 'Kitchen', picture: 'src/assets/fruiteCategory.png' },
  // { name: 'Medicine', picture: 'src/assets/fruiteCategory.png' },
  // { name: 'Accessories', picture: 'src/assets/fruiteCategory.png' },
  // { name: 'Study', picture: 'src/assets/fruiteCategory.png' },
  // { name: 'Fruit', picture: 'src/assets/fruiteCategory.png' },

];

const Menu = () => {
  const [cart, setCart] = useState([]);
  const [quantities, setQuantities] = useState({});
  const [drawerVisible, setDrawerVisible] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState('cash');
  const [givenAmount, setGivenAmount] = useState(0);
  const [customer, setCustomer] = useState(null);

  const taxRate = 0.05;
  const discount = 0; // Add logic for discount if needed
  
  const handleAddToCart = (item) => {
    setCart([...cart, item]);
    setQuantities({
      ...quantities,
      [item.name]: (quantities[item.name] || 0) + 1,
    });
  };

  const handleIncrement = (item) => {
    setQuantities({
      ...quantities,
      [item.name]: (quantities[item.name] || 0) + 1,
    });
  };

  const handleDecrement = (item) => {
    if (quantities[item.name] > 1) {
      setQuantities({
        ...quantities,
        [item.name]: quantities[item.name] - 1,
      });
    } else {
      setCart(cart.filter((cartItem) => cartItem.name !== item.name));
      setQuantities({
        ...quantities,
        [item.name]: 0,
      });
    }
  };

  const handleCheckout = () => {
    alert('Proceed to payment');
  };

  const showDrawer = () => {
    setDrawerVisible(true);
  };

  const closeDrawer = () => {
    setDrawerVisible(false);
  };

  const handlePaymentMethodChange = (e) => {
    setPaymentMethod(e.target.value);
  };

  const handleGivenAmountChange = (e) => {
    setGivenAmount(parseFloat(e.target.value) || 0);
  };

  const handleLogin = (values) => {
    setCustomer({ phoneNumber: values.phoneNumber });
    alert(`Customer with phone number ${values.phoneNumber} logged in.`);
  };

  const handleRegister = (values) => {
    setCustomer({ name: values.name, phoneNumber: values.phoneNumber });
    alert(`Customer ${values.name} registered with phone number ${values.phoneNumber}.`);
  };

  const calculateTotal = () => {
    const subtotal = cart.reduce((total, item) => {
      return total + item.price * quantities[item.name];
    }, 0);
    const tax = subtotal * taxRate;
    const total = subtotal + tax - discount;

    return { subtotal, tax, total };
  };

  const { subtotal, tax, total } = calculateTotal();
  return (
    <div>
      <div className='menu-manager'>
        <div className="category">
          <div className="category-text">
            <h2 className="text-category1">Categories Lists</h2>
            <span className="text-category2" onClick={() => alert('See more clicked')}>
              See more ...
            </span>
          </div>
        </div>
        <div className="menu-manager">
          <div className="menu-container">
            <Card className="menu-card1">
              {/* <div className='category-list'> */}
              <div className={`category-list ${productCategory.length <= 3 ? 'few-categories' : 'normal-categories'}`}>
                {productCategory.map((item, index) => (
                  <div key={index} className="category-item">
                    <Card className='productCover' onClick={() => alert('See category')}>
                      <img src={item.picture} alt={item.name} className="category-image" />
                    </Card>
                  </div>
                ))}
              </div>
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
              grid={{ gutter: 16, column: 6 }}
              dataSource={fruitMenu}
              renderItem={item => (
                <List.Item>
                  <Card className='product-card'
                    cover={<img src={item.picture} alt={item.name} className="fruit-image" />}
                    actions={[
                      quantities[item.name] ? (
                        <div>
                          <Button onClick={() => handleDecrement(item)}>-</Button>
                          <span style={{ margin: '0 10px' }}>{quantities[item.name]}</span>
                          <Button onClick={() => handleIncrement(item)}>+</Button>
                        </div>
                      ) : (
                        <Button onClick={() => handleAddToCart(item)}>Add</Button>
                      )
                    ]}
                  >
                    <Card.Meta
                      title={item.name}
                      description={`Price: $${item.price.toFixed(2)} | Quantity: ${item.quantity}`}
                    />
                  </Card>
                </List.Item>
              )}
            />
          </Card>
        </div>
      </div>

      <Button type="primary" onClick={showDrawer}>
        View Cart ({cart.length})
      </Button>
      <Drawer
        title="Shopping Cart"
        placement="right"
        onClose={closeDrawer}
        visible={drawerVisible}
      >
        <List
          dataSource={cart}
          renderItem={(item, index) => (
            <List.Item key={index}>
              <List.Item.Meta
                avatar={<Avatar src={item.picture} />}
                title={item.name}
                description={`Price: $${item.price.toFixed(2)} | Quantity: ${quantities[item.name]} | Total: $${(item.price * quantities[item.name]).toFixed(2)}`}
              />
            </List.Item>
          )}
        />
        <div className="cart-summary">
          <p>Subtotal: ${subtotal.toFixed(2)}</p>
          <p>Tax (5%): ${tax.toFixed(2)}</p>
          <p>Discount: ${discount.toFixed(2)}</p>
          <p><strong>Total: ${total.toFixed(2)}</strong></p>
        </div>
        <Radio.Group onChange={handlePaymentMethodChange} value={paymentMethod}>
          <Radio value="cash">Cash</Radio>
        </Radio.Group>
        <Input 
          type="number" 
          placeholder="Enter amount given by client" 
          onChange={handleGivenAmountChange} 
          style={{ marginTop: '16px' }}
        />
        <Button 
          type="primary" 
          onClick={handleCheckout} 
          style={{ marginTop: '16px' }} 
          disabled={!customer || givenAmount < total}
        >
          Proceed to Payment
        </Button>
        <Tabs defaultActiveKey="1" style={{ marginTop: '16px' }}>
          <Tabs.TabPane tab="Login" key="1">
            <Form onFinish={handleLogin}>
              <Form.Item
                name="phoneNumber"
                rules={[{ required: true, message: 'Please input the phone number!' }]}
              >
                <Input placeholder="Phone Number" />
              </Form.Item>
              <Form.Item>
                <Button type="primary" htmlType="submit">
                  Login
                </Button>
              </Form.Item>
            </Form>
          </Tabs.TabPane>
          <Tabs.TabPane tab="Register" key="2">
            <Form onFinish={handleRegister}>
              <Form.Item
                name="name"
                rules={[{ required: true, message: 'Please input the name!' }]}
              >
                <Input placeholder="Name" />
              </Form.Item>
              <Form.Item
                name="phoneNumber"
                rules={[{ required: true, message: 'Please input the phone number!' }]}
              >
                <Input placeholder="Phone Number" />
              </Form.Item>
              <Form.Item>
                <Button type="primary" htmlType="submit">
                  Register
                </Button>
              </Form.Item>
            </Form>
          </Tabs.TabPane>
        </Tabs>
      </Drawer>
    </div>
  );
};



export default Menu;
