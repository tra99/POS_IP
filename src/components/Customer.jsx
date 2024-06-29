import { useState } from 'react';
import { Dropdown, Menu, Modal, Input, Form } from 'antd';
import { EllipsisOutlined } from '@ant-design/icons';
import '../style/Customer.css';

const initialData = [
  { id: 1, name: 'Din Pich', email: 'monopich1823@gmail.com', phone: '086318261', created: '2024-02-24 12:00:00', edited: '2024-02-24 12:00:00', status: true, profileImage: 'https://via.placeholder.com/40' },
  { id: 2, name: 'Ang Ousa', email: 'ousaang@gmail.com', phone: '098787839', created: '2024-02-24 12:00:00', edited: '2024-02-24 12:00:00', status: true, profileImage: 'https://via.placeholder.com/40' },
  { id: 3, name: 'Hok Sochetra', email: 'sochetra@gmail.com', phone: '0975063390', created: '2024-02-24 12:00:00', edited: '2024-02-24 12:00:00', status: true, profileImage: 'https://via.placeholder.com/40' },
  { id: 4, name: 'Chab Sreylen', email: 'chabsreylen@gmail.com', phone: '0967810046', created: '2024-02-24 12:00:00', edited: '2024-02-24 12:00:00', status: true, profileImage: 'https://via.placeholder.com/40' },
  { id: 5, name: 'Sophorn Sovortey', email: 'sovortey@gmail.com', phone: '087609971', created: '2024-02-24 12:00:00', edited: '2024-02-24 12:00:00', status: true, profileImage: 'https://via.placeholder.com/40' },
  { id: 6, name: 'Pom Mouylang', email: 'muylang@gmail.com', phone: '069310609', created: '2024-02-24 12:00:00', edited: '2024-02-24 12:00:00', status: true, profileImage: 'https://via.placeholder.com/40' },
  { id: 7, name: 'Pom Mouylang', email: 'muylang@gmail.com', phone: '069310609', created: '2024-02-24 12:00:00', edited: '2024-02-24 12:00:00', status: true, profileImage: 'https://via.placeholder.com/40' },
  { id: 8, name: 'Pom Mouylang', email: 'muylang@gmail.com', phone: '069310609', created: '2024-02-24 12:00:00', edited: '2024-02-24 12:00:00', status: true, profileImage: 'https://via.placeholder.com/40' },
  { id: 9, name: 'Pom Mouylang', email: 'muylang@gmail.com', phone: '069310609', created: '2024-02-24 12:00:00', edited: '2024-02-24 12:00:00', status: true, profileImage: 'https://via.placeholder.com/40' },
  { id: 10, name: 'Pom Mouylang', email: 'muylang@gmail.com', phone: '069310609', created: '2024-02-24 12:00:00', edited: '2024-02-24 12:00:00', status: true, profileImage: 'https://via.placeholder.com/40' },
  { id: 11, name: 'Pom Mouylang', email: 'muylang@gmail.com', phone: '069310609', created: '2024-02-24 12:00:00', edited: '2024-02-24 12:00:00', status: true, profileImage: 'https://via.placeholder.com/40' }
];

const pageSize = 10;

const Customer = () => {
  const [data, setData] = useState(initialData);
  const [currentPage, setCurrentPage] = useState(1);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [modalType, setModalType] = useState('');
  const [currentCustomer, setCurrentCustomer] = useState(null);
  const [form] = Form.useForm();

  const addNewCustomer = () => {
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

  const showModal = (type, customer) => {
    setModalType(type);
    setCurrentCustomer(customer);
    setIsModalVisible(true);
  };

  const handleOk = () => {
    form.validateFields().then(values => {
      if (modalType === 'Add') {
        const newCustomer = {
          id: data.length + 1,
          name: values.name,
          email: values.email,
          phone: values.phone,
          created: new Date().toISOString().slice(0, 19).replace('T', ' '),
          edited: new Date().toISOString().slice(0, 19).replace('T', ' '),
          status: true,
          profileImage: 'https://via.placeholder.com/40'
        };
        setData([...data, newCustomer]);
      }
      setIsModalVisible(false);
      form.resetFields();
    });
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    form.resetFields();
  };

  const menu = (customer) => (
    <Menu>
      <Menu.Item key="1" onClick={() => showModal('Update', customer)}>Update</Menu.Item>
      <Menu.Item key="2" onClick={() => showModal('Delete', customer)}>Delete</Menu.Item>
    </Menu>
  );

  const startIndex = (currentPage - 1) * pageSize;
  const currentPageData = data.slice(startIndex, startIndex + pageSize);

  return (
    <div className="customer-table-container">
      <div className="header">
        <h2>{data.length} Customers</h2>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <button className='add-customer-button' onClick={addNewCustomer}>Add New Customer</button>
      </div>
      <table>
        <thead>
          <tr>
            <th>No.</th>
            <th>Profile</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Date</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {currentPageData.map((customer, index) => (
            <tr key={customer.id}>
              <td>{startIndex + index + 1}</td>
              <td className="profile-cell">
                <img src={customer.profileImage} alt={customer.name} style={{ width: '40px', height: '40px', borderRadius: '50%' }} />
                <span>{customer.name}</span>
              </td>
              <td>{customer.email}</td>
              <td>{customer.phone}</td>
              <td>
                Create: {customer.created}
                <br />
                Edit: {customer.edited}
              </td>
              <td>
                <Dropdown overlay={() => menu(customer)} trigger={['click']}>
                  <EllipsisOutlined style={{ cursor: 'pointer' }} />
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
      
      <Modal title={modalType === 'Add' ? 'Add New Customer' : `${modalType} Customer`} visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
        <Form form={form} layout="vertical">
          <Form.Item name="name" label="Name" rules={[{ required: true, message: 'Please input the name!' }]}>
            <Input />
          </Form.Item>
          <Form.Item name="email" label="Email" rules={[{ required: true, message: 'Please input the email!' }]}>
            <Input />
          </Form.Item>
          <Form.Item name="phone" label="Phone" rules={[{ required: true, message: 'Please input the phone number!' }]}>
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default Customer;
