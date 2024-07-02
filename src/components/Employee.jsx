import { useState, useEffect } from "react";
import { Dropdown, Menu, Modal, Input, Form, Select, message } from "antd";
import { EllipsisOutlined } from "@ant-design/icons";
import "../style/Employee.css";
import axios from "axios";

const initialData = [
  {
    id: 1,
    name: "Din Pich",
    email: "monopich1823@gmail.com",
    phone: "086318261",
    role: "admin",
    profileImage: "https://via.placeholder.com/40",
  },
  {
    id: 2,
    name: "Ang Ousa",
    email: "ousaang@gmail.com",
    phone: "098787839",
    role: "admin",
    profileImage: "https://via.placeholder.com/40",
  },
  {
    id: 3,
    name: "Hok Sochetra",
    email: "sochetra@gmail.com",
    phone: "0975063390",
    role: "admin",
    profileImage: "https://via.placeholder.com/40",
  },
  {
    id: 4,
    name: "Chab Sreylen",
    email: "chabsreylen@gmail.com",
    phone: "0967810046",
    role: "admin",
    profileImage: "https://via.placeholder.com/40",
  },
  {
    id: 5,
    name: "Sophorn Sovortey",
    email: "sovortey@gmail.com",
    phone: "087609971",
    role: "admin",
    profileImage: "https://via.placeholder.com/40",
  },
  {
    id: 6,
    name: "Pom Mouylang",
    email: "muylang@gmail.com",
    phone: "069310609",
    role: "admin",
    profileImage: "https://via.placeholder.com/40",
  },
  {
    id: 7,
    name: "Pom Mouylang",
    email: "muylang@gmail.com",
    phone: "069310609",
    role: "admin",
    profileImage: "https://via.placeholder.com/40",
  },
  {
    id: 8,
    name: "Pom Mouylang",
    email: "muylang@gmail.com",
    phone: "069310609",
    role: "admin",
    profileImage: "https://via.placeholder.com/40",
  },
  {
    id: 9,
    name: "Pom Mouylang",
    email: "muylang@gmail.com",
    phone: "069310609",
    role: "admin",
    profileImage: "https://via.placeholder.com/40",
  },
  {
    id: 10,
    name: "Pom Mouylang",
    email: "muylang@gmail.com",
    phone: "069310609",
    role: "admin",
    profileImage: "https://via.placeholder.com/40",
  },
  {
    id: 11,
    name: "Pom Mouylang",
    email: "muylang@gmail.com",
    phone: "069310609",
    role: "admin",
    profileImage: "https://via.placeholder.com/40",
  },
];

const roles = [
  { id: 1, name: "admin" },
  { id: 2, name: "staff" },
];

const pageSize = 10;

const Employee = () => {
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [modalType, setModalType] = useState("");
  const [currentEmployee, setCurrentEmployee] = useState(null);
  const [form] = Form.useForm();

  useEffect(() => {
    axios
      .get(`/api/employee`)
      .then(({ data }) => {
        console.log(data);
        const { data: employees } = data;
        setData(employees);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const addNewEmployee = () => {
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

  const showModal = (type, Employee) => {
    setModalType(type);
    setCurrentEmployee(Employee);
    if (type === "Update" || type === "Delete") {
      form.setFieldsValue({
        userName: Employee.userName,
        role: Employee.role,
        phone: Employee.phone,
      });
    } else {
      form.resetFields();
    }
    setIsModalVisible(true);
  };

  const handleOk = () => {
    form.validateFields().then((values) => {
      if (modalType === "Add") {
        let newEmployee = {
          userName: values.userName,
          role: values.role,
          phone: values.phone,
          password: values.password,
        };
        console.log(newEmployee);
        axios
          .post(`/api/employee`, newEmployee)
          .then(({ data: resultAdded }) => {
            console.log(resultAdded);
            message.success(resultAdded.message);
            newEmployee = {
              userName: values.userName,
              role: values.role,
              phone: values.phone,
              password: values.password,
              createdAt: resultAdded.data.purchaseAt,
              updatedAt: resultAdded.data.updatedAt,
              id: resultAdded.data.id,
            };
            setData([...data, newEmployee]);
          })
          .catch((err) => message.error(err.response.data.message));
      } else if (modalType === "Update") {
        let newEmployee = {
          userName: values.userName,
          role: values.role,
          phone: values.phone,
          password: values.password,
        };
        console.log(newEmployee);
        axios
          .patch(`/api/employee/${currentEmployee.id}`, newEmployee)
          .then(({ data: returnupdatedData }) => {
            const updatedData = data.map((Employee) =>
              Employee.id === currentEmployee.id
                ? {
                    ...Employee,
                    ...values,
                    photo: returnupdatedData.data.photo,
                  }
                : Employee
            );
            setData(updatedData);
            message.success(returnupdatedData.message);
          })
          .catch((err) => message.error(err.response.data.message));
      } else if (modalType === "Delete") {
        axios
          .delete(`/api/employee/${currentEmployee.id}`)
          .then(({ data }) => {
            message.success(data.message);
            setData((prevData) =>
              prevData.filter((employee) => employee.id !== currentEmployee.id)
            );
          })
          .catch((err) => {
            console.log(err);
            message.error("Failed to delete employee");
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

  const menu = (Employee) => (
    <Menu>
      <Menu.Item key="1" onClick={() => showModal("Update", Employee)}>
        Update
      </Menu.Item>
      <Menu.Item key="2" onClick={() => showModal("Delete", Employee)}>
        Delete
      </Menu.Item>
    </Menu>
  );

  const startIndex = (currentPage - 1) * pageSize;
  const currentPageData = data.slice(startIndex, startIndex + pageSize);

  return (
    <div className="Employee-table-container">
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginBottom: "20px",
        }}
      >
        <h2>Employees Information</h2>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <button className="add-customer-button" onClick={addNewEmployee}>
          Add New Employee
        </button>
      </div>

      <table>
        <thead>
          <tr>
            <th>No.</th>
            <th>Username</th>
            <th>Phone</th>
            <th>Role</th>
            <th>CreatedAt</th>
            <th>updatedAt</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {currentPageData.map((Employee, index) => (
            <tr key={Employee.id}>
              <td>{startIndex + index + 1}</td>
              <td className="profile-cell">
                {/* <img
                  src={Employee.profileImage}
                  alt={"Profile"}
                  style={{ width: "40px", height: "40px", borderRadius: "50%" }}
                /> */}
                <span>{Employee.userName}</span>
              </td>
              <td>{Employee.phone}</td>
              <td>{Employee.role}</td>
              <td>{Employee.createdAt}</td>
              <td>{Employee.updatedAt}</td>

              <td>
                <Dropdown overlay={() => menu(Employee)} trigger={["click"]}>
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
          modalType === "Add" ? "Add New Employee" : `${modalType} Employee`
        }
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Form form={form} layout="vertical">
          <Form.Item
            name="userName"
            label="userName"
            rules={[{ required: true, message: "Please input the username!" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="phone"
            label="Phone Number"
            rules={[
              { required: true, message: "Please input the phone number!" },
            ]}
          >
            <Input />
          </Form.Item>
          {modalType !== "Delete" && (
            <Form.Item
              name="password"
              label="Password"
              rules={[{ required: false, message: "Please input password" }]}
            >
              <Input />
            </Form.Item>
          )}
          <Form.Item
            name="role"
            label="Role"
            rules={[{ required: true, message: "Please select a role" }]}
          >
            <Select placeholder="Select a role" defaultValue={"staff"}>
              {roles.map((role) => (
                <Option key={role.id} value={role.name}></Option>
              ))}
            </Select>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default Employee;
