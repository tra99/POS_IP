import { useState } from 'react';
import { Modal, Input, Form } from 'antd';
import '../style/Order.css';

const initialData = [
  { id: 1, name: 'Din Pich', status: 'Completed', total: '$20', payment: '$50', phone: '086318261', created: '2024-02-24 12:00:00', edited: '2024-02-24 12:00:00', profileImage: 'https://via.placeholder.com/40' },
  { id: 2, name: 'Ang Ousa', status: 'Completed', total: '$20', payment: 'R5000', phone: '098787839', created: '2024-02-24 12:00:00', edited: '2024-02-24 12:00:00', profileImage: 'https://via.placeholder.com/40' },
  { id: 3, name: 'Hok Sochetra', status: 'Completed', total: '$20', payment: '$50', phone: '0975063390', created: '2024-02-24 12:00:00', edited: '2024-02-24 12:00:00', profileImage: 'https://via.placeholder.com/40' },
  { id: 4, name: 'Chab Sreylen', status: 'Completed', total: '$20', payment: 'R5000', phone: '0967810046', created: '2024-02-24 12:00:00', edited: '2024-02-24 12:00:00', profileImage: 'https://via.placeholder.com/40' },
  { id: 5, name: 'Sophorn Sovortey', status: 'Completed', total: '$20', payment: 'R5000', phone: '087609971', created: '2024-02-24 12:00:00', edited: '2024-02-24 12:00:00', profileImage: 'https://via.placeholder.com/40' },
  { id: 6, name: 'Pom Mouylang', status: 'Completed', total: '$20', payment: '$50', phone: '069310609', created: '2024-02-24 12:00:00', edited: '2024-02-24 12:00:00', profileImage: 'https://via.placeholder.com/40' },
  { id: 7, name: 'Pom Mouylang', status: 'Completed', total: '$20', payment: '$50', phone: '069310609', created: '2024-02-24 12:00:00', edited: '2024-02-24 12:00:00', profileImage: 'https://via.placeholder.com/40' },
  { id: 8, name: 'Pom Mouylang', status: 'Completed', total: '$20', payment: '$50', phone: '069310609', created: '2024-02-24 12:00:00', edited: '2024-02-24 12:00:00', profileImage: 'https://via.placeholder.com/40' },
  { id: 9, name: 'Pom Mouylang', status: 'Completed', total: '$20', payment: '$50', phone: '069310609', created: '2024-02-24 12:00:00', edited: '2024-02-24 12:00:00', profileImage: 'https://via.placeholder.com/40' },
  { id: 10, name: 'Pom Mouylang', status: 'Completed', total: '$20', payment: '$50', phone: '069310609', created: '2024-02-24 12:00:00', edited: '2024-02-24 12:00:00', profileImage: 'https://via.placeholder.com/40' },
  { id: 11, name: 'Pom Mouylang', status: 'Completed', total: '$20', payment: '$50', phone: '069310609', created: '2024-02-24 12:00:00', edited: '2024-02-24 12:00:00', profileImage: 'https://via.placeholder.com/40' }
];

const pageSize = 10;

const Order = () => {
  const [data, setData] = useState(initialData);
  const [currentPage, setCurrentPage] = useState(1);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [modalType, setModalType] = useState('');
  const [form] = Form.useForm();

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

  const addNewOrder = () => {
    setModalType('Add');
    setIsModalVisible(true);
  };

  const handleOk = () => {
    form.validateFields().then(values => {
      if (modalType === 'Add') {
        const newOrder = {
          id: data.length + 1,
          name: values.name,
          payment: values.payment,
          phone: values.phone,
          total: values.total,
          status: values.status,
          created: new Date().toISOString().slice(0, 19).replace('T', ' '),
          edited: new Date().toISOString().slice(0, 19).replace('T', ' '),
          profileImage: 'https://via.placeholder.com/40'
        };
        setData([...data, newOrder]);
      }
      setIsModalVisible(false);
      form.resetFields();
    });
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    form.resetFields();
  };

  const startIndex = (currentPage - 1) * pageSize;
  const currentPageData = data.slice(startIndex, startIndex + pageSize);

  return (
    <div className="Order-table-container">
      <table>
        <thead>
          <tr>
            <th>OrderID</th>
            <th>Name</th>
            <th>Payment</th>
            <th>Phone</th>
            <th>Total</th>
            <th>Date</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {currentPageData.map((order, index) => (
            <tr key={order.id}>
              <td>{startIndex + index + 1}</td>
              <td className="profile-cell">
                <img src={order.profileImage} alt={order.name} style={{ width: '40px', height: '40px', borderRadius: '50%' }} />
                <span>{order.name}</span>
              </td>
              <td>{order.payment}</td>
              <td>{order.phone}</td>
              <td>{order.total}</td>
              <td>{order.created}</td>
              <td>{order.status}</td>
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
      
      <Modal title={modalType === 'Add' ? 'Add New Order' : `${modalType} Order`} visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
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
          <Form.Item name="total" label="Total" rules={[{ required: true, message: 'Please input the total!' }]}>
            <Input />
          </Form.Item>
          <Form.Item name="status" label="Status" rules={[{ required: true, message: 'Please input the status!' }]}>
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default Order;
