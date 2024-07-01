import { useState, useEffect } from "react";
import {
  Dropdown,
  Menu,
  Modal,
  Input,
  Form,
  Button,
  Select,
  message,
  Upload,
} from "antd";
import { EllipsisOutlined, PlusCircleOutlined } from "@ant-design/icons";
import "../style/Category.css";
import axios from "axios";

const { Option } = Select;
const initialData = [
  // Your initial data here
];

const pageSize = 10;

const Category = () => {
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [modalType, setModalType] = useState("");
  const [currentCategory, setCurrentCategory] = useState(null);
  const [form] = Form.useForm();
  const [imageUrl, setImageUrl] = useState("");
  const [photo, setPhoto] = useState("");

  useEffect(() => {
    axios
      .get(`/api/category`)
      .then(({ data }) => {
        console.log(data);
        const { data: categories } = data;
        setData(categories);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const addNewCategory = () => {
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

  const showModal = (type, Category) => {
    setModalType(type);
    setCurrentCategory(Category);
    if (type === "Update") {
      form.setFieldsValue({
        ID: Category.ID,
        name: Category.name,
        category: Category.category,
        price: Category.price,
      });
      setImageUrl(Category.profileImage);
    }
    setIsModalVisible(true);
  };

  const handleOk = () => {
    form.validateFields().then((values) => {
      if (modalType === "Add") {
        const newCategory = {
          name: values.name,
          photo: photo,
        };
        console.log(newCategory);
        axios
          .post(`/api/category`, newCategory)
          .then(({ data: createCategoryData }) => {
            console.log(createCategoryData);
            setData([...data, createCategoryData.data]);
            message.success(createCategoryData.message);
          })
          .catch((err) => {
            console.log(err);
            message.error(err.response.data.message);
          });
      } else if (modalType === "Update") {
        axios
          .patch(`/api/category/${currentCategory.id}`, {
            name: values.name,
            photo: photo,
          })
          .then(({ data: returnupdatedData }) => {
            console.log(returnupdatedData);
            const updatedData = data.map((Category) =>
              Category.id === currentCategory.id
                ? {
                    ...Category,
                    ...values,
                    photo: returnupdatedData.data.photo,
                  }
                : Category
            );
            setData(updatedData);
            message.success(returnupdatedData.message);
          })
          .catch((err) => {
            message.error(err.response.data.message);
          });
      }
      setIsModalVisible(false);
      form.resetFields();
      setImageUrl("");
    });
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    form.resetFields();
    setImageUrl("");
  };

  const handleDelete = () => {
    axios
      .delete(`/api/category/${currentCategory.id}`)
      .then(({ data: deleteData }) => {
        console.log(data);
        message.success(deleteData.message);
        setData(data.filter((Category) => Category.id !== currentCategory.id));
      })
      .catch((err) => {
        message.error(err.response.data.message);
      });

    setIsModalVisible(false);
  };

  const menu = (Category) => (
    <Menu>
      <Menu.Item key="1" onClick={() => showModal("Update", Category)}>
        Update
      </Menu.Item>
      <Menu.Item key="2" onClick={() => showModal("Delete", Category)}>
        Delete
      </Menu.Item>
    </Menu>
  );

  const startIndex = (currentPage - 1) * pageSize;
  //   const currentPageData = data.slice(startIndex, startIndex + pageSize);

  const { Search } = Input;
  const onSearch = (value, _e, info) => console.log(info?.source, value);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Create an object URL for the image file to preview it immediately
      setImageUrl(URL.createObjectURL(file));

      const formData = new FormData();
      formData.append("file", file);

      axios
        .post("/api/upload", formData)
        .then((response) => {
          const { url } = response.data;
          setPhoto(url); // Save the uploaded file URL
        })
        .catch((error) => {
          console.error("Error uploading the image:", error);
        });
    }
  };

  return (
    <div className="Category-table-container">
      <div className="title1">
        <Button
          type="primary"
          icon={<PlusCircleOutlined />}
          size="large"
          onClick={addNewCategory}
        >
          Create
        </Button>
        <div className="search1">
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
            <th>ID</th>
            <th>Name</th>
            <th>CreatedAt</th>
            <th>updatedAt</th>
          </tr>
        </thead>
        <tbody style={{ color: "grey", fontWeight: "bold" }}>
          {data.map((Category, index) => (
            <tr key={Category.id}>
              <td>{startIndex + index + 1}</td>
              <td>{Category.id}</td>
              <td className="profile-cell">
                <img
                  src={Category.photo}
                  alt="Profile"
                  style={{
                    width: "60px",
                    height: "60px",
                    borderRadius: "20%",
                    borderWidth: 1,
                    borderColor: "blue",
                    borderStyle: "solid",
                  }}
                />
                <span>{Category.name}</span>
              </td>
              <td>{Category.createdAt}</td>
              <td>{Category.updatedAt}</td>
              <td>
                <Dropdown overlay={menu(Category)} trigger={["click"]}>
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
          modalType === "Add"
            ? "Create Category"
            : modalType === "Update"
            ? "Update Category"
            : "Delete Category"
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
          <p>Are you sure you want to delete this Category?</p>
        ) : (
          <Form form={form} layout="vertical">
            {modalType !== "Add" && currentCategory && (
              <div style={{ textAlign: "center", marginBottom: 20 }}>
                <img
                  src={currentCategory.photo}
                  alt="Category"
                  style={{ width: "100px", height: "100px" }}
                />
              </div>
            )}
            {/* {currentCategory.id && (
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

            <Form.Item name="profileImage" label="Profile Image">
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
              />
              {imageUrl && (
                <img
                  src={imageUrl}
                  alt="Selected"
                  style={{ width: "100px", height: "100px", marginTop: 10 }}
                />
              )}
            </Form.Item>
          </Form>
        )}
      </Modal>
    </div>
  );
};

export default Category;
