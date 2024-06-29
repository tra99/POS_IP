import { useState } from 'react';
import { Dropdown, Menu, Modal, Input, Form, Button, Select, message, Upload } from 'antd';
import { EllipsisOutlined, PlusCircleOutlined } from '@ant-design/icons';
import '../style/Product.css';

const { Option } = Select;
const initialData = [
  // Your initial data here
];

const pageSize = 10;

const Product = () => {
  const [data, setData] = useState(initialData);
  const [currentPage, setCurrentPage] = useState(1);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [modalType, setModalType] = useState('');
  const [currentProduct, setCurrentProduct] = useState(null);
  const [form] = Form.useForm();
  const [imageUrl, setImageUrl] = useState('');

  const addNewProduct = () => {
    setModalType('Add');
    setIsModalVisible(true);
  };

  const handleNextPage = () => {
    if (currentPage * pageSize < data.length) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const showModal = (type, product) => {
    setModalType(type);
    setCurrentProduct(product);
    if (type === 'Update') {
      form.setFieldsValue({
        sku: product.sku,
        name: product.name,
        category: product.category,
        price: product.price,
      });
      setImageUrl(product.profileImage);
    }
    setIsModalVisible(true);
  };

  const handleOk = () => {
    form.validateFields().then(values => {
      if (modalType === 'Add') {
        const newProduct = {
          id: data.length + 1,
          sku: values.sku,
          name: values.name,
          category: values.category,
          price: values.price,
          date: new Date().toISOString().slice(0, 19).replace('T', ' '),
          profileImage: imageUrl || 'https://healthjade.com/wp-content/uploads/2017/10/apple-fruit.jpg'
        };
        setData([...data, newProduct]);
        message.success('Product added successfully');
      } else if (modalType === 'Update') {
        const updatedData = data.map(product =>
          product.id === currentProduct.id
            ? { ...product, ...values, profileImage: imageUrl || product.profileImage }
            : product
        );
        setData(updatedData);
        message.success('Product updated successfully');
      }
      setIsModalVisible(false);
      form.resetFields();
      setImageUrl('');
    });
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    form.resetFields();
    setImageUrl('');
  };

  const handleDelete = () => {
    const filteredData = data.filter(product => product.id !== currentProduct.id);
    setData(filteredData);
    setIsModalVisible(false);
    message.success('Product deleted successfully');
  };

  const menu = (product) => (
    <Menu>
      <Menu.Item key="1" onClick={() => showModal('Update', product)}>Update</Menu.Item>
      <Menu.Item key="2" onClick={() => showModal('Delete', product)}>Delete</Menu.Item>
    </Menu>
  );

  const startIndex = (currentPage - 1) * pageSize;
  const currentPageData = data.slice(startIndex, startIndex + pageSize);

  const { Search } = Input;
  const onSearch = (value, _e, info) => console.log(info?.source, value);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setImageUrl(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="Product-table-container">
      <div className='title1'>
        <Button type="primary" icon={<PlusCircleOutlined />} size="large" onClick={addNewProduct}>
          Create
        </Button>
        <div className='search1'>
          <Search
            placeholder="input search text"
            allowClear
            enterButton="Search"
            size="large"
            onSearch={onSearch}
          />
        </div>
      </div>
      <table>
        <thead>
          <tr>
            <th>No.</th>
            <th>SKU</th>
            <th>Name</th>
            <th>Category</th>
            <th>Price</th>
            <th>Date</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody style={{ color: "grey", fontWeight: "bold" }}>
          {currentPageData.map((product, index) => (
            <tr key={product.id}>
              <td>{startIndex + index + 1}</td>
              <td>{product.sku}</td>
              <td className="profile-cell">
                <img src={product.profileImage} alt="Profile" style={{ width: '60px', height: '60px', borderRadius: '20%', borderWidth: 1, borderColor: 'blue', borderStyle: 'solid' }} />
                <span>{product.name}</span>
              </td>
              <td>{product.category}</td>
              <td>{product.price}</td>
              <td>{product.date}</td>
              <td>
                <Dropdown overlay={menu(product)} trigger={['click']}>
                  <EllipsisOutlined style={{ cursor: 'pointer', color: 'black', fontSize: "24px", fontWeight: 'bold' }} />
                </Dropdown>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="pagination">
        <button onClick={handlePreviousPage} disabled={currentPage === 1}>&lt;&lt;</button>
        <span>{currentPage} - {Math.ceil(data.length / pageSize)}</span>
        <button
          className={currentPage * pageSize >= data.length ? 'disabled-button' : ''}
          onClick={handleNextPage}
          disabled={currentPage * pageSize >= data.length}
        >
          &gt;&gt;
        </button>
      </div>

      <Modal
        title={modalType === 'Add' ? 'Create Product' : modalType === 'Update' ? 'Update Product' : 'Delete Product'}
        visible={isModalVisible}
        onOk={modalType === 'Delete' ? handleDelete : handleOk}
        onCancel={handleCancel}
        footer={modalType === 'Delete' ? [
          <Button key="cancel" onClick={handleCancel}>
            Cancel
          </Button>,
          <Button key="delete" type="primary" danger onClick={handleDelete}>
            Delete
          </Button>
        ] : [
          <Button key="cancel" onClick={handleCancel}>
            Cancel
          </Button>,
          <Button key="save" type="primary" onClick={handleOk}>
            Save
          </Button>
        ]}
      >
        {modalType === 'Delete' ? (
          <p>Are you sure you want to delete this product?</p>
        ) : (
          <Form form={form} layout="vertical">
            {modalType !== 'Add' && currentProduct && (
              <div style={{ textAlign: 'center', marginBottom: 20 }}>
                <img src={imageUrl || currentProduct.profileImage} alt="Product" style={{ width: '100px', height: '100px' }} />
              </div>
            )}
            <Form.Item name="sku" label="Code" rules={[{ required: true, message: 'Please input the code!' }]}>
              <Input />
            </Form.Item>
            <Form.Item name="category" label="Category" rules={[{ required: true, message: 'Please select a category!' }]}>
              <Select placeholder="Select a category">
                <Option value="fruit">Fruit</Option>
                <Option value="vegetable">Vegetable</Option>
              </Select>
            </Form.Item>
            <Form.Item name="name" label="Name" rules={[{ required: true, message: 'Please input the name!' }]}>
              <Input />
            </Form.Item>
            <Form.Item name="price" label="Price" rules={[{ required: true, message: 'Please input the price!' }]}>
              <Input />
            </Form.Item>
            <Form.Item name="profileImage" label="Profile Image">
              <input type="file" accept="image/*" onChange={handleImageChange} />
              {imageUrl && <img src={imageUrl} alt="Selected" style={{ width: '100px', height: '100px', marginTop: 10 }} />}
            </Form.Item>
          </Form>
        )}
      </Modal>
    </div>
  );
};

export default Product;
