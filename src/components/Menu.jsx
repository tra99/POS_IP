import React, { useState, useEffect } from "react";
import {
  Card,
  List,
  Avatar,
  Button,
  Drawer,
  Radio,
  Input,
  Tabs,
  Form,
  Select,
  message,
} from "antd";
import "../style/Menu.css";
import axios from "axios";
import { useLocation } from "react-router-dom";

const Menu = () => {
  //react
  const [fruitMenu, setFruitMenu] = useState([]);
  const [productCategory, setProductCategory] = useState([]);
  const [productPage, setProductPage] = useState(1);
  const [selectedCategoryId, setSelectedCategoryId] = useState(null);
  const [cart, setCart] = useState([]);
  const [quantities, setQuantities] = useState({});
  const [drawerVisible, setDrawerVisible] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("cash");
  const [givenAmount, setGivenAmount] = useState(0);
  const [customer, setCustomer] = useState(null);
  const [customers, setCustomers] = useState([]);

  const taxRate = 0.05;
  const discount = 0; // Add logic for discount if needed

  const location = useLocation(); // Get the location object
  const searchParams = new URLSearchParams(location.search); // Parse the query string
  const searchQuery = searchParams.get("search"); // Get the search query from the URL

  useEffect(() => {
    axios.get("/api/customer").then(({ data: response }) => {
      setCustomers(response.data);
    });

    axios
      .get(`/api/category`)
      .then(({ data }) => {
        console.log(data);
        const { data: categories } = data;
        setProductCategory(categories);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  //vue
  // const fruitMenu = ref([])
  // fruitMenu.value = [adsjhdajshdja]

  // useEffect(() => {
  //   axios
  //     .get(`/api/product?page=${productPage}&categoryid=${}`)
  //     .then(({ data }) => {
  //       console.log(data);
  //       const { data: products } = data;
  //       console.log(products);
  //       setFruitMenu((prevProduct) => [...prevProduct, ...products]);
  //       console.log(fruitMenu);
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  // }, [productPage]);
  useEffect(() => {
    let url = `/api/product?page=${productPage}`;
    if (selectedCategoryId) {
      url += `&categoryid=${selectedCategoryId}`;
    }
    if (searchQuery) {
      url += `&search=${searchQuery}`;
    }
    axios
      .get(url)
      .then(({ data }) => {
        console.log(data);
        const { data: products } = data;
        setFruitMenu((prevProduct) => [...prevProduct, ...products]);
        console.log(fruitMenu);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [productPage, selectedCategoryId, searchQuery]);

  // axios
  //   .get(`/api/product?page=${productPage}`)
  //   .then(({ data }) => {
  //     const { data: products } = data;
  //     setFruitMenu((prevProduct) => [...prevProduct, ...products]);
  //   })
  //   .catch((err) => {
  //     console.log(err);
  //   });
  // }, [productPage, selectedCategoryId]);

  const handleCategoryClick = (categoryId) => {
    setSelectedCategoryId(categoryId);
    setProductPage(1); // Reset page number when category changes
    setFruitMenu([]); // Clear previous products
  };

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
    alert("Proceed to payment");

    const modifyCart = cart.map((item) => ({
      productId: item.id,
      quantity: Number(quantities[item.name]),
    }));

    const orderData = {
      customerId: customer.id,
      employeeId: "employee1", //todo grab this from the profile local storage
      paidCash: Number(givenAmount),
      orderDetails: modifyCart,
    };
    axios
      .post("/api/order", orderData)
      .then(({ data }) => {
        message.success(data.message);
      })
      .catch((err) => {
        console.log(err);
        message.error("Failed to place order.");
      });
    console.log(orderData);
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
    setCustomer({ phoneNumber: values.phoneNumber, id: values.id });
    alert(`Customer with phone number ${values.phoneNumber} logged in.`);
  };

  const handleRegister = (values) => {
    const newCustomer = {
      name: values.name,
      phone: values.phone,
      loyaltyPoints: 0,
    };

    axios
      .post("/api/customer", newCustomer)
      .then(({ data: registerCustomerData }) => {
        message.success(registerCustomerData.message);
        setCustomers((prevData) => [
          ...prevData,
          { ...newCustomer, id: registerCustomerData.data.id },
        ]);
        setCustomer({
          ...newCustomer,
          id: registerCustomerData.data.id,
        });
      })
      .catch((err) => {
        console.log(err);
        message.error("Failed to add customer");
      });
  };

  const handleCustomerChange = (customerId) => {
    const selectedCustomer = customers.find((c) => c.id === customerId);
    setCustomer(selectedCustomer);
  };

  const calculateTotal = () => {
    const subtotal = cart.reduce((total, item) => {
      return total + item.price * quantities[item.name];
    }, 0);
    const tax = subtotal * taxRate;
    const total = subtotal - discount;

    return { subtotal, tax, total };
  };

  const { subtotal, tax, total } = calculateTotal();

  console.log(customer);

  return (
    <div>
      <div className="menu-manager">
        <div className="category">
          <div className="category-text">
            <h2 className="text-category1">Categories Lists</h2>
            <span
              className="text-category2"
              onClick={() => alert("See more clicked")}
            >
              See more ...
            </span>
          </div>
        </div>
        <div className="menu-manager">
          <div className="menu-container">
            <Card className="menu-card1">
              {/* <div className='category-list'> */}
              <div
                className={`category-list ${
                  productCategory.length <= 3
                    ? "few-categories"
                    : "normal-categories"
                }`}
              >
                {productCategory.map((item, index) => (
                  <div key={index} className="category-item">
                    <Card
                      className="productCover"
                      onClick={() => handleCategoryClick(item.id)}
                    >
                      <img
                        src={item.photo}
                        alt={item.name}
                        className="category-image"
                      />
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
            <h2 className="text-category1">Products</h2>
            <span
              className="text-category2"
              onClick={() => setProductPage(productPage + 1)}
            >
              See more ...
            </span>
          </div>
        </div>
        <div className="menu-container">
          <Button style={{width:"200px",position:"absolute",left:"970px",top:"-30px"}} type="primary" onClick={showDrawer}>
            View Cart ({cart.length})
          </Button>
          <Card title="Menu" className="menu-card">
            <List
              grid={{ gutter: 16, column: 6 }} // Changed from 4 to 6
              dataSource={fruitMenu}
              renderItem={(item) => (
                <List.Item>
                  <Card
                    className="product-card"
                    cover={
                      <img
                        src={item.photo}
                        alt={item.name}
                        className="fruit-image"
                      />
                    }
                    actions={[
                      quantities[item.name] ? (
                        <div>
                          <Button onClick={() => handleDecrement(item)}>
                            -
                          </Button>
                          <span style={{ margin: "0 10px" }}>
                            {quantities[item.name]}
                          </span>
                          <Button onClick={() => handleIncrement(item)}>
                            +
                          </Button>
                        </div>
                      ) : (
                        <Button onClick={() => handleAddToCart(item)}>
                          Add
                        </Button>
                      ),
                    ]}
                  >
                    <Card.Meta
                      title={item.name}
                      description={`Price: $${item.price.toFixed(
                        2
                      )} | Quantity: ${item.stock}`}
                    />
                  </Card>
                </List.Item>
              )}
            />
          </Card>
        </div>
      </div>
      
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
                avatar={<Avatar src={item.photo} />}
                title={item.name}
                description={`Price: $${item.price.toFixed(2)} | Quantity: ${
                  quantities[item.name]
                } | Total: $${(item.price * quantities[item.name]).toFixed(2)}`}
              />
            </List.Item>
          )}
        />
        <div className="cart-summary">
          <p>Subtotal: ${subtotal.toFixed(2)}</p>
          {/* <p>Tax (5%): ${tax.toFixed(2)}</p> */}
          <p>Discount: ${discount.toFixed(2)}</p>
          <p>
            <strong>Total: ${total.toFixed(2)}</strong>
          </p>
        </div>
        <Radio.Group onChange={handlePaymentMethodChange} value={paymentMethod}>
          <Radio value="cash">Cash</Radio>
        </Radio.Group>
        <Input
          type="number"
          placeholder="Enter amount given by client"
          onChange={handleGivenAmountChange}
          style={{ marginTop: "16px" }}
        />
        <Button
          type="primary"
          onClick={handleCheckout}
          style={{ marginTop: "16px" }}
          disabled={!customer?.id || givenAmount < total}
        >
          Proceed to Payment
        </Button>
        <Tabs defaultActiveKey="1" style={{ marginTop: "16px" }}>
          <Tabs.TabPane tab="Login" key="1">
            <Form onFinish={handleLogin}>
              <Form.Item
                name="customer"
                label="Customer"
                rules={[
                  { required: true, message: "Please select a customer!" },
                ]}
              >
                <Select
                  placeholder="Select a phone number"
                  // defaultValue={selectedCategory || ""}
                  onChange={handleCustomerChange}
                >
                  {customers.map((c) => (
                    <Option key={c.id} value={c.id}>
                      {c.phone + " - " + c.name}
                    </Option>
                  ))}
                </Select>
              </Form.Item>
              <Form.Item>
                {/* <Button type="primary" htmlType="submit">
                  Login
                </Button> */}
              </Form.Item>
            </Form>
          </Tabs.TabPane>
          <Tabs.TabPane tab="Register" key="2">
            <Form onFinish={handleRegister}>
              <Form.Item
                name="name"
                rules={[{ required: true, message: "Please input the name!" }]}
              >
                <Input placeholder="Name" />
              </Form.Item>
              <Form.Item
                name="phone"
                rules={[
                  { required: true, message: "Please input the phone number!" },
                ]}
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
