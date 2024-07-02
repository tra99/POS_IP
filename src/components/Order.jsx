import { useState, useEffect } from "react";
import { Modal, Input, Form, Menu, Dropdown, Button, message } from "antd";
import "../style/Order.css";
import axios from "axios";
import { EllipsisOutlined, PlusCircleOutlined } from "@ant-design/icons";

const pageSize = 10;

const Order = () => {
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [currentOrder, setCurrentOrder] = useState(null);
  const [modalType, setModalType] = useState("");
  const [form] = Form.useForm();

  useEffect(() => {
    axios
      .get(`/api/order?page=${currentPage}&size=10`)
      .then(({ data }) => {
        const { data: orders } = data;
        console.log(orders.orders);
        setData(orders.orders);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [currentPage]);

  const handleNextPage = () => {
    // if (currentPage * pageSize < data.length) {
    setCurrentPage(currentPage + 1);
    // }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const addNewOrder = () => {
    setModalType("Add");
    setIsModalVisible(true);
  };

  const handleOk = () => {
    form.validateFields().then((values) => {
      if (modalType === "Add") {
        const newOrder = {
          id: data.length + 1,
          name: values.name,
          payment: values.payment,
          phone: values.phone,
          total: values.total,
          status: values.status,
          created: new Date().toISOString().slice(0, 19).replace("T", " "),
          edited: new Date().toISOString().slice(0, 19).replace("T", " "),
          profileImage: "https://via.placeholder.com/40",
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

  const showModal = (type, order) => {
    setModalType(type);
    setCurrentOrder(order);
    console.log(order);
    setIsModalVisible(true);
  };

  const handleDelete = () => {
    axios
      .delete(`/api/order/${currentOrder.id}`)
      .then(({ data: deleteData }) => {
        console.log(data);
        message.success(deleteData.message);
        setData(data.filter((order) => order.id !== currentOrder.id));
      })
      .catch((err) => {
        message.error(err.response.data.message);
      });

    setIsModalVisible(false);
  };

  const startIndex = (currentPage - 1) * pageSize;

  const menu = (order) => (
    <Menu>
      <Menu.Item key="1" onClick={() => showModal("Delete", order)}>
        Delete
      </Menu.Item>
    </Menu>
  );

  return (
    <div className="Order-table-container">
      <table>
        <thead>
          <tr>
            <th>No.</th>
            <th>OrderID</th>
            <th>Name</th>
            <th>Details</th>
            <th>Payment</th>
            <th>Total</th>
            <th>Return Cash</th>
            <th>phone</th>
            <th>Date</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {data.map((order, index) => (
            <tr key={order.id}>
              <td>{startIndex + index + 1}</td>
              <td style={{ fontWeight: "bold" }}>{order.id}</td>
              <td className="">
                {/* <img
                  src={order.profileImage}
                  alt={order.name}
                  style={{ width: "40px", height: "40px", borderRadius: "50%" }}
                /> */}
                <span>{order.customer.name}</span>
              </td>
              <td>
                {order.orderDetails
                  .map((o) => o.product.name + " " + o.quantity + " PCS")
                  .join(", ")}
              </td>
              <td>${order.paidCash}</td>

              <td>${order.totalPrice}</td>
              <td>${order.returnCash}</td>
              <td>{order.customer.phone}</td>
              <td>{order.purchaseDate}</td>
              <td>
                <Dropdown overlay={menu(order)} trigger={["click"]}>
                  <EllipsisOutlined
                    style={{
                      cursor: "pointer",
                      color: "black",
                      fontSize: "24px",
                      fontWeight: "bold",
                    }}
                  />
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
          // className={
          //   currentPage * pageSize >= data.length ? "disabled-button" : ""
          // }
          onClick={handleNextPage}
          // disabled={currentPage * pageSize >= data.length}
        >
          &gt;&gt;
        </button>
      </div>

      <Modal
        title={
          modalType === "Add"
            ? "Create Category"
            : modalType === "Update"
            ? "Update Category"
            : "Delete Order"
        }
        visible={isModalVisible}
        onOk={modalType === "Delete" ? handleDelete : handleOk}
        onCancel={handleCancel}
        footer={
          modalType === "Delete"
            ? [
                <Button key="cancel" onClick={handleCancel}>
                  Cancel
                </Button>,
                <Button
                  key="delete"
                  type="primary"
                  danger
                  onClick={handleDelete}
                >
                  Delete
                </Button>,
              ]
            : [
                <Button key="cancel" onClick={handleCancel}>
                  Cancel
                </Button>,
                <Button key="save" type="primary" onClick={handleOk}>
                  Save
                </Button>,
              ]
        }
      >
        {modalType === "Delete" ? (
          <p>
            Are you sure you want to delete this Order? **order cannot be
            deleted after 10min"
          </p>
        ) : (
          <Form form={form} layout="vertical">
            {modalType !== "Add" && currentOrder && (
              <div style={{ textAlign: "center", marginBottom: 20 }}>
                <img
                  src={currentOrder.photo}
                  alt="Category"
                  style={{ width: "100px", height: "100px" }}
                />
              </div>
            )}
            {/* {currentOrder.id && (
              <Form.Item
                name="ID"
                label="ID"
                rules={[{ required: true, message: "Please input the code!" }]}
              >
                <Input />
              </Form.Item>
            )} */}

            <Form.Item
              name="name"
              label="Name"
              rules={[{ required: true, message: "Please input the name!" }]}
            >
              <Input />
            </Form.Item>
          </Form>
        )}
      </Modal>
    </div>
  );
};

export default Order;
