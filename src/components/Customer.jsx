import { useState, useEffect } from "react";
import { Dropdown, Menu, Modal, Input, Form, message } from "antd";
import { EllipsisOutlined } from "@ant-design/icons";
import "../style/Customer.css";
import axios from "axios";

const initialData = [
  {
    id: 1,
    name: "Din Pich",
    email: "monopich1823@gmail.com",
    phone: "086318261",
    created: "2024-02-24 12:00:00",
    edited: "2024-02-24 12:00:00",
    status: true,
    profileImage: "https://via.placeholder.com/40",
  },
  {
    id: 2,
    name: "Ang Ousa",
    email: "ousaang@gmail.com",
    phone: "098787839",
    created: "2024-02-24 12:00:00",
    edited: "2024-02-24 12:00:00",
    status: true,
    profileImage: "https://via.placeholder.com/40",
  },
  {
    id: 3,
    name: "Hok Sochetra",
    email: "sochetra@gmail.com",
    phone: "0975063390",
    created: "2024-02-24 12:00:00",
    edited: "2024-02-24 12:00:00",
    status: true,
    profileImage: "https://via.placeholder.com/40",
  },
  {
    id: 4,
    name: "Chab Sreylen",
    email: "chabsreylen@gmail.com",
    phone: "0967810046",
    created: "2024-02-24 12:00:00",
    edited: "2024-02-24 12:00:00",
    status: true,
    profileImage: "https://via.placeholder.com/40",
  },
  {
    id: 5,
    name: "Sophorn Sovortey",
    email: "sovortey@gmail.com",
    phone: "087609971",
    created: "2024-02-24 12:00:00",
    edited: "2024-02-24 12:00:00",
    status: true,
    profileImage: "https://via.placeholder.com/40",
  },
  {
    id: 6,
    name: "Pom Mouylang",
    email: "muylang@gmail.com",
    phone: "069310609",
    created: "2024-02-24 12:00:00",
    edited: "2024-02-24 12:00:00",
    status: true,
    profileImage: "https://via.placeholder.com/40",
  },
  {
    id: 7,
    name: "Pom Mouylang",
    email: "muylang@gmail.com",
    phone: "069310609",
    created: "2024-02-24 12:00:00",
    edited: "2024-02-24 12:00:00",
    status: true,
    profileImage: "https://via.placeholder.com/40",
  },
  {
    id: 8,
    name: "Pom Mouylang",
    email: "muylang@gmail.com",
    phone: "069310609",
    created: "2024-02-24 12:00:00",
    edited: "2024-02-24 12:00:00",
    status: true,
    profileImage: "https://via.placeholder.com/40",
  },
  {
    id: 9,
    name: "Pom Mouylang",
    email: "muylang@gmail.com",
    phone: "069310609",
    created: "2024-02-24 12:00:00",
    edited: "2024-02-24 12:00:00",
    status: true,
    profileImage: "https://via.placeholder.com/40",
  },
  {
    id: 10,
    name: "Pom Mouylang",
    email: "muylang@gmail.com",
    phone: "069310609",
    created: "2024-02-24 12:00:00",
    edited: "2024-02-24 12:00:00",
    status: true,
    profileImage: "https://via.placeholder.com/40",
  },
  {
    id: 11,
    name: "Pom Mouylang",
    email: "muylang@gmail.com",
    phone: "069310609",
    created: "2024-02-24 12:00:00",
    edited: "2024-02-24 12:00:00",
    status: true,
    profileImage: "https://via.placeholder.com/40",
  },
];

const pageSize = 10;

const Customer = () => {
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [modalType, setModalType] = useState("");
  const [currentCustomer, setCurrentCustomer] = useState(null);
  const [form] = Form.useForm();

  // const token =
  //   "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImVtcGxveWVlMSIsInJvbGUiOiJhZG1pbiIsImlhdCI6MTcxOTY2MjQ4OCwiZXhwIjoxNzE5NzQ4ODg4fQ.f91ZEkWJZsjPlRu8rcezKkVb-bRKvduxCFRl5HjF_4s";
  // const headers = {
  //   Authorization: `Bearer ${token}`,
  // };

  useEffect(() => {
    axios
      .get(`/api/customer`)
      .then(({ data }) => {
        console.log(data);
        const { data: customers } = data;
        setData(customers);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const addNewCustomer = () => {
    setModalType("Add");
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
    if (type === "Update" || type === "Delete") {
      form.setFieldsValue({
        name: customer.name,
        loyaltyPoints: customer.loyaltyPoints,
        phone: customer.phone,
      });
    } else {
      form.resetFields();
    }
    setIsModalVisible(true);
  };

  const handleOk = () => {
    form.validateFields().then((values) => {
      if (modalType === "Add") {
        let newCustomer = {
          name: values.name,
          email: values.email,
          phone: values.phone,
          loyaltyPoints: Number(values.loyaltyPoints),
        };
        axios
          .post("/api/customer", newCustomer)
          .then(({ data: addedCustomer }) => {
            message.success(addedCustomer.message);
            newCustomer = {
              ...newCustomer,
              id: addedCustomer.data.id,
              firstBoughtAt: addedCustomer.data.firstBoughtAt,
              updatedAt: addedCustomer.data.updatedAt,
            };
            setData((prevData) => [...prevData, newCustomer]);
          })
          .catch((err) => {
            console.log(err);
            message.error("Failed to add customer");
          });
      } else if (modalType === "Update") {
        // Destructure properties that should not be included in the update payload
        const customerId = currentCustomer.id;
        const {
          id,
          firstBoughtAt,
          updatedAt,
          purchaseHistory,
          ...updatedValues
        } = {
          ...currentCustomer,
          name: values.name,
          loyaltyPoints: Number(values.loyaltyPoints),
          phone: values.phone,
        };
        axios
          .patch(`/api/customer/${customerId}`, updatedValues)
          .then(({ data }) => {
            message.success(data.message);
            setData((prevData) =>
              prevData.map((customer) =>
                customer.id === currentCustomer.id
                  ? { ...currentCustomer, ...updatedValues }
                  : customer
              )
            );
          })
          .catch((err) => {
            console.log(err);
            message.error("Failed to update customer");
          });
      } else if (modalType === "Delete") {
        axios
          .delete(`/api/customer/${currentCustomer.id}`)
          .then(({ data }) => {
            message.success(data.message);
            setData((prevData) =>
              prevData.filter((customer) => customer.id !== currentCustomer.id)
            );
          })
          .catch((err) => {
            console.log(err);
            message.error("Failed to delete customer");
          });
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
      <Menu.Item key="1" onClick={() => showModal("Update", customer)}>
        Update
      </Menu.Item>
      <Menu.Item key="2" onClick={() => showModal("Delete", customer)}>
        Delete
      </Menu.Item>
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
        <button className="add-customer-button" onClick={addNewCustomer}>
          Add New Customer
        </button>
      </div>
      <table>
        <thead>
          <tr>
            <th>No.</th>
            <th>Profile</th>
            <th>Loyalty point</th>
            <th>Phone</th>
            <th>Date</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {currentPageData.map((customer, index) => (
            <tr key={customer.id}>
              <td>{startIndex + index + 1}</td>
              <td>
                <img
                  src={customer.profileImage}
                  alt={customer.name}
                  style={{
                    width: "40px",
                    height: "40px",
                    borderRadius: "50%",
                    display: "none",
                  }}
                />
                <span>{customer.name}</span>
              </td>
              <td>{customer.loyaltyPoints}</td>
              <td>{customer.phone}</td>
              <td>
                Create: {customer.firstBoughtAt}
                <br />
                Edit: {customer.updatedAt}
              </td>
              <td>
                <Dropdown overlay={() => menu(customer)} trigger={["click"]}>
                  <EllipsisOutlined style={{ cursor: "pointer" }} />
                </Dropdown>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="pagination">
        <button onClick={handlePreviousPage} disabled={currentPage === 1}>
          &lt;&lt;
        </button>
        <span>
          {currentPage} - {Math.ceil(data.length / pageSize)}
        </span>
        <button
          className={
            currentPage * pageSize >= data.length ? "disabled-button" : ""
          }
          onClick={handleNextPage}
          disabled={currentPage * pageSize >= data.length}
        >
          &gt;&gt;
        </button>
      </div>

      <Modal
        title={
          modalType === "Add" ? "Add New Customer" : `${modalType} Customer`
        }
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Form form={form} layout="vertical">
          <Form.Item
            name="name"
            label="Name"
            rules={[{ required: true, message: "Please input the name!" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="loyaltyPoints"
            label="Loyalty point"
            rules={[{ required: true, message: "Please input loyalty points" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="phone"
            label="Phone"
            rules={[
              { required: true, message: "Please input the phone number!" },
            ]}
          >
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default Customer;
