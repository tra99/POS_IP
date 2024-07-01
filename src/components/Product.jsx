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
import "../style/Product.css";
import axios from "axios";

const { Option } = Select;
const pageSize = 10;

const Product = () => {
  const [data, setData] = useState([]);
  const [category, setCategory] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [totalItems, setTotalItems] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [modalType, setModalType] = useState("");
  const [currentProduct, setCurrentProduct] = useState(null);
  const [form] = Form.useForm();
  const [imageUrl, setImageUrl] = useState("");
  const [photo, setPhoto] = useState("");

  const fetchProducts = (page) => {
    axios
      .get(`/api/product?page=${page}&limit=${pageSize}`)
      .then(({ data }) => {
        const { data: products, total } = data;
        setData(products);
        setTotalItems(total);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    fetchProducts(currentPage);
  }, [currentPage]);

  useEffect(() => {
    axios
      .get(`/api/category`)
      .then(({ data }) => {
        console.log(data);
        const { data: categories } = data;
        setCategory(categories);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const addNewProduct = () => {
    setModalType("Add");
    setIsModalVisible(true);
  };

  const handleNextPage = () => {
    if (currentPage < Math.ceil(totalItems / pageSize)) {
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
    if (type === "Update") {
      form.setFieldsValue({
        name: product.name,
        categoryId: product.categoryId,
        description: product.description,
        photo: product.photo,
        stock: Number(product.stock),
        price: Number(product.price),
        isAvailable: true,
        promotion: "No Discount",
      });
      setSelectedCategory(product.categoryId);
      setImageUrl(product.photo);
      setPhoto(product.photo);
    }
    setIsModalVisible(true);
  };

  const handleOk = () => {
    form.validateFields().then((values) => {
      if (modalType === "Add") {
        const newProduct = {
          name: values.name,
          categoryId: values.category,
          description: values.description,
          photo: photo,
          stock: Number(values.stock),
          price: Number(values.price),
          isAvailable: true,
          promotion: "No Discount",
        };
        axios.post("/api/product", newProduct).then(({ data }) => {
          setData([...data, newProduct]);
          console.log(data);
          message.success("Product added successfully");
        });
        console.log(newProduct);
        message.success("Product added successfully");
      } else if (modalType === "Update") {
        const updatedData = data.map((product) =>
          product.id == currentProduct.id
            ? {
                name: product.name,
                categoryId: product.category,
                description: product.description,
                photo: photo,
                stock: Number(product.stock),
                price: Number(product.price),
                isAvailable: true,
                promotion: "No Discount",
              }
            : product
        );
        console.log(updatedData);

        axios
          .patch(`/api/product/${currentProduct.id}`, {
            name: values.name,
            categoryId: values.category,
            description: values.description,
            photo: photo,
            stock: Number(values.stock),
            price: Number(values.price),
            isAvailable: true,
            promotion: "No Discount",
          })
          .then(({ data }) => {
            message.success(data.message);
            window.location.reload();
          })
          .catch((err) => {
            console.log(err);
            message.error(err.response.data.message);
          });
        setData(updatedData);
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
    const filteredData = data.filter(
      (product) => product.id !== currentProduct.id
    );

    axios
      .delete(`/api/product/${currentProduct.id}`)
      .then(({ data }) => {
        message.success(data.message);
        setData(filteredData);
      })
      .catch((err) => {
        message.error(err.response.data.message);
      });

    setIsModalVisible(false);
  };

  const menu = (product) => (
    <Menu>
      <Menu.Item key="1" onClick={() => showModal("Update", product)}>
        Update
      </Menu.Item>
      <Menu.Item key="2" onClick={() => showModal("Delete", product)}>
        Delete
      </Menu.Item>
    </Menu>
  );

  const startIndex = (currentPage - 1) * pageSize;
  const currentPageData = data.slice(startIndex, startIndex + pageSize);

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
    <div className="Product-table-container">
      <div className="title1">
        <Button
          type="primary"
          icon={<PlusCircleOutlined />}
          size="large"
          onClick={addNewProduct}
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
            <th>Name</th>
            <th>Category</th>
            <th>Stock</th>
            <th>Price</th>
            <th>Date</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody style={{ color: "grey", fontWeight: "bold" }}>
          {data.map((product, index) => (
            <tr key={product.id}>
              <td>{startIndex + index + 1}</td>
              <td className="profile-cell">
                <img
                  src={product.photo}
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
                <span>{product.name}</span>
              </td>
              <td>{product.categoryId}</td>
              <td>{product.stock} unit</td>
              <td>${product.price}</td>
              <td>{product.createdAt}</td>
              <td>
                <Dropdown overlay={menu(product)} trigger={["click"]}>
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
          {currentPage} - {Math.ceil(totalItems / pageSize)}
        </span>
        <button
          className={
            currentPage * pageSize >= totalItems ? "disabled-button" : ""
          }
          onClick={handleNextPage}
          disabled={currentPage * pageSize >= totalItems}
        >
          &gt;&gt;
        </button>
      </div>

      <Modal
        title={
          modalType === "Add"
            ? "Create Product"
            : modalType === "Update"
            ? "Update Product"
            : "Delete Product"
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
          <p>Are you sure you want to delete this product?</p>
        ) : (
          <Form form={form} layout="vertical">
            {modalType !== "Add" && currentProduct && (
              <div style={{ textAlign: "center", marginBottom: 20 }}>
                <img
                  src={photo || ""}
                  alt="Product"
                  style={{ width: "100px", height: "100px" }}
                />
              </div>
            )}
            <Form.Item
              name="category"
              label="Category"
              rules={[{ required: true, message: "Please select a category!" }]}
            >
              <Select
                placeholder="Select a category"
                defaultValue={selectedCategory || ""}
              >
                {category.map((c) => (
                  <Option key={c.id} value={c.id}>
                    {c.name}
                  </Option>
                ))}
              </Select>
            </Form.Item>
            <Form.Item
              name="name"
              label="Name"
              rules={[{ required: true, message: "Please input the name!" }]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              name="description"
              label="Description"
              rules={[
                { required: true, message: "Please input the description!" },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              name="price"
              label="Price"
              rules={[{ required: true, message: "Please input the price!" }]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              name="stock"
              label="Stock"
              rules={[{ required: true, message: "Please input the stock!" }]}
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

export default Product;
