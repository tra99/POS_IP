import { useState } from 'react';
import { Dropdown, Menu, Modal, Input, Form } from 'antd';
import { EllipsisOutlined } from '@ant-design/icons';
import '../style/Employee.css';

const initialData = [
  { id: 1, name: 'Din Pich', email: 'monopich1823@gmail.com', phone: '086318261', role:'admin',  profileImage: 'https://via.placeholder.com/40' },
  { id: 2, name: 'Ang Ousa', email: 'ousaang@gmail.com', phone: '098787839', role:'admin',  profileImage: 'https://via.placeholder.com/40' },
  { id: 3, name: 'Hok Sochetra', email: 'sochetra@gmail.com', phone: '0975063390', role:'admin',  profileImage: 'https://via.placeholder.com/40' },
  { id: 4, name: 'Chab Sreylen', email: 'chabsreylen@gmail.com', phone: '0967810046', role:'admin',  profileImage: 'https://via.placeholder.com/40' },
  { id: 5, name: 'Sophorn Sovortey', email: 'sovortey@gmail.com', phone: '087609971', role:'admin',  profileImage: 'https://via.placeholder.com/40' },
  { id: 6, name: 'Pom Mouylang', email: 'muylang@gmail.com', phone: '069310609', role:'admin',  profileImage: 'https://via.placeholder.com/40' },
  { id: 7, name: 'Pom Mouylang', email: 'muylang@gmail.com', phone: '069310609', role:'admin',  profileImage: 'https://via.placeholder.com/40' },
  { id: 8, name: 'Pom Mouylang', email: 'muylang@gmail.com', phone: '069310609', role:'admin',  profileImage: 'https://via.placeholder.com/40' },
  { id: 9, name: 'Pom Mouylang', email: 'muylang@gmail.com', phone: '069310609', role:'admin',  profileImage: 'https://via.placeholder.com/40' },
  { id: 10, name: 'Pom Mouylang', email: 'muylang@gmail.com', phone: '069310609', role:'admin',  profileImage: 'https://via.placeholder.com/40' },
  { id: 11, name: 'Pom Mouylang', email: 'muylang@gmail.com', phone: '069310609', role:'admin',  profileImage: 'https://via.placeholder.com/40' }
];

const pageSize = 10;

const Employee = () => {
  const [data, setData] = useState(initialData);
  const [currentPage, setCurrentPage] = useState(1);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [modalType, setModalType] = useState('');
  const [currentEmployee, setCurrentEmployee] = useState(null);
  const [form] = Form.useForm();

  const addNewEmployee = () => {
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

  const showModal = (type, Employee) => {
    setModalType(type);
    setCurrentEmployee(Employee);
    setIsModalVisible(true);
  };

  const handleOk = () => {
    form.validateFields().then(values => {
      if (modalType === 'Add') {
        const newEmployee = {
          id: data.length + 1,
          name: values.name,
          email: values.email,
          phone: values.phone,
          created: new Date().toISOString().slice(0, 19).replace('T', ' '),
          edited: new Date().toISOString().slice(0, 19).replace('T', ' '),
          
          profileImage: 'https://via.placeholder.com/40'
        };
        setData([...data, newEmployee]);
      }
      setIsModalVisible(false);
      form.resetFields();
    });
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    form.resetFields();
  };

  const menu = (Employee) => (
    <Menu>
      <Menu.Item key="1" onClick={() => showModal('Update', Employee)}>Update</Menu.Item>
      <Menu.Item key="2" onClick={() => showModal('Delete', Employee)}>Delete</Menu.Item>
    </Menu>
  );

  const startIndex = (currentPage - 1) * pageSize;
  const currentPageData = data.slice(startIndex, startIndex + pageSize);

  return (
    <div className="Employee-table-container">
      <h2>Employees Information</h2>
    
      <table>
        <thead>
          <tr>
            <th>No.</th>
            <th>Username</th>
            <th>Phone</th>
            <th>Password</th>
            <th>Role</th>
            <th>Action</th>

          </tr>
        </thead>
        <tbody>
          {currentPageData.map((Employee, index) => (
            <tr key={Employee.id}>
              <td>{startIndex + index + 1}</td>
              <td className="profile-cell">
                <img src={Employee.profileImage} alt={"Profile"} style={{ width: '40px', height: '40px', borderRadius: '50%' }} />
                <span>{Employee.name}</span>
              </td>
              <td>{Employee.phone}</td>
              <td>{Employee.email}</td>
              <td>{Employee.role}</td>
              
              <td>
                <Dropdown overlay={() => menu(Employee)} trigger={['click']}>
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
      
      <Modal title={modalType === 'Add' ? 'Add New Employee' : `${modalType} Employee`} visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
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

export default Employee;
