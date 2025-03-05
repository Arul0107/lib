import React, { useState } from "react";
import {
  Breadcrumb,
  Drawer,
  Card,
  Avatar,
  Button,
  Row,
  Col,
  Divider,
} from "antd";
import { Input, Select, Form, Upload } from "antd";
import {
  UploadOutlined,
  EditOutlined,
  EllipsisOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import "./Addbooks.css";
import Title from "antd/es/skeleton/Title";

const { Meta } = Card;
const { Option } = Select;

const Addbooks = () => {
  const [form] = Form.useForm();
  const [preview, setPreview] = useState(null);
  const [isDrawerVisible, setIsDrawerVisible] = useState(false);
  const [uploadedImage, setUploadedImage] = useState(null);

  const handleSubmit = (values) => {
    setPreview(values);
    setIsDrawerVisible(true);
  };

  const closeDrawer = () => {
    setIsDrawerVisible(false);
  };

  const handleImageUpload = (info) => {
    const file = info.file;
    const reader = new FileReader();
    reader.onload = () => {
      setUploadedImage(reader.result);
    };
    reader.readAsDataURL(file);
    return false; // Prevents automatic upload
  };

  return (
    <div>
      {/* Breadcrumb */}
      <div className="breadcrumb">
        <Breadcrumb className="mb-8">
          <Breadcrumb.Item href="/">Dashboard</Breadcrumb.Item>
          <Breadcrumb.Item>Add Books</Breadcrumb.Item>
        </Breadcrumb>
      </div>
      <Divider />
      <div className="scroll-container">
        <h2 className="text-xl font-semibold mb-4">Add Books</h2>
        <Form
          form={form}
          layout="vertical"
          onFinish={handleSubmit}
          className="addbookform"
        >
          <Row gutter={16}>
            {/* Left Column */}
            <Col xs={24} sm={12}>
              <Form.Item
                label="ISBN/Barcode"
                name="isbn"
                rules={[{ message: "ISBN is required" }]}
              >
                <Input />
              </Form.Item>

              <Form.Item
                label="Title"
                name="title"
                rules={[{ message: "Title is required" }]}
              >
                <Input />
              </Form.Item>

              <Form.Item label="Edition" name="edition">
                <Input />
              </Form.Item>

              <Form.Item
                label="Author"
                name="author"
                rules={[{ message: "Author is required" }]}
              >
                <Select showSearch>
                  <Option value="Author 1">Author 1</Option>
                  <Option value="Author 2">Author 2</Option>
                  <Option value="Author 3">Author 3</Option>
                </Select>
              </Form.Item>

              <Form.Item label="Publisher" name="publisher">
                <Select showSearch>
                  <Option value="Publisher 1">Publisher 1</Option>
                  <Option value="Publisher 2">Publisher 2</Option>
                </Select>
              </Form.Item>
            </Col>

            {/* Right Column */}
            <Col xs={24} sm={12}>
              <Form.Item
                label="Category"
                name="category"
                rules={[{ message: "Category is required" }]}
              >
                <Select showSearch>
                  <Option value="Fiction">Fiction</Option>
                  <Option value="Science">Science</Option>
                  <Option value="History">History</Option>
                </Select>
              </Form.Item>

              <Form.Item
                label="Language"
                name="language"
                rules={[{ message: "Language is required" }]}
              >
                <Select showSearch>
                  <Option value="English">English</Option>
                  <Option value="French">French</Option>
                  <Option value="Spanish">Spanish</Option>
                </Select>
              </Form.Item>

              <Form.Item
                label="Quantity"
                name="quantity"
                rules={[{ message: "Quantity is required" }]}
              >
                <Input type="number" />
              </Form.Item>

              <Form.Item label="Upload Book Image" name="bookImage">
                <Upload beforeUpload={handleImageUpload} listType="picture">
                  <Button icon={<UploadOutlined />}>Click to Upload</Button>
                </Upload>
              </Form.Item>
            </Col>
          </Row>

          {/* Full-Width Buttons */}
          <div className="addbooklastbtn">
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
            <Button htmlType="reset" onClick={() => form.resetFields()}>
              Reset
            </Button>
          </div>
        </Form>
      </div>

      {/* Drawer for Preview */}
      <Drawer
        title="Book Preview"
        width="40vw"
        onClose={closeDrawer}
        open={isDrawerVisible}
      >
        {preview ? (
          <Card className="custom-card">
            <Row gutter={16} align="middle">
              {/* Book Cover Image */}
              <Col span={8}>
                <img
                  alt="Book Cover"
                  className="book-cover"
                  src={
                    uploadedImage ||
                    "https://via.placeholder.com/150?text=Book+Cover"
                  }
                />
              </Col>

              {/* Book Details */}
              <Col span={16}>
                <h1>
                  <strong>Titile</strong>
                  {preview.title}
                </h1>
                <p>
                  <strong>Author:</strong> {preview.author}
                </p>
                <p>
                  <strong>Category:</strong> {preview.category}
                </p>
                <p>
                  <strong>Language:</strong> {preview.language}
                </p>
                <p>
                  <strong>Quantity:</strong> {preview.quantity}
                </p>
              </Col>
            </Row>

            <div className="actions">
              <Button type="primary">Publish</Button>
            </div>
          </Card>
        ) : (
          <p>No preview available</p>
        )}
      </Drawer>
    </div>
  );
};

export default Addbooks;
