import { Table, Drawer, Button, Dropdown, Menu, Breadcrumb, Typography, Divider, Avatar } from "antd";
import { useState } from "react";
import { MoreOutlined, ArrowDownOutlined, EditFilled } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import './Viewbooks.css';

const { Title, Text } = Typography;

const resources = [
  { id: 1, title: "The Great Gatsby", author: "F. Scott Fitzgerald", category: "Fiction", year: 1925, language: "English", publisher: "Scribner", quantity: 10, available: 8, requested: 2, type: "Book" },
  { id: 2, title: "1984", author: "George Orwell", category: "Dystopian", year: 1949, language: "English", publisher: "Secker & Warburg", quantity: 15, available: 10, requested: 5, type: "Book" },
  { id: 3, title: "Physics for Scientists", author: "Raymond Serway", category: "Science", year: 2019, language: "English", publisher: "Cengage", quantity: 20, available: 18, requested: 2, type: "Book" },
  { id: 4, title: "Data Structures & Algorithms", author: "Robert Lafore", category: "Computer Science", year: 2020, language: "English", publisher: "Pearson", quantity: 25, available: 20, requested: 5, type: "Book" },
];

export default function ResourceTable() {
  const [isDrawerVisible, setIsDrawerVisible] = useState(false);
  const [selectedResource, setSelectedResource] = useState(null);
  const navigate = useNavigate();

  const showDrawer = (resource) => {
    setSelectedResource(resource);
    setIsDrawerVisible(true);
  };
  const handleClose = () => setIsDrawerVisible(false);
  const handleEdit = () => navigate("/addbooks");

  const menu = (
    <Menu>
      <Menu.Item key="print">Print</Menu.Item>
      <Menu.Item key="delete" danger>Delete</Menu.Item>
    </Menu>
  );

  const columns = [
    {
      title: "Title",
      dataIndex: "title",
      key: "title",
      render: (text, record) => (
        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <Avatar size={32} style={{ backgroundColor: "#d9d9d9" }} />
          <Text>{text}</Text>
        </div>
      ),
    },
    {
      title: "Author",
      dataIndex: "author",
      key: "author",
    },
    {
      title: "Category",
      dataIndex: "category",
      key: "category",
    },
    {
      title: "Year",
      dataIndex: "year",
      key: "year",
    },
    {
      title: "Language",
      dataIndex: "language",
      key: "language",
    },
    {
      title: "Available",
      dataIndex: "available",
      key: "available",
    },
    {
      title: "Requested",
      dataIndex: "requested",
      key: "requested",
    },
    {
      title: "Actions",
      key: "actions",
      render: (_, record) => (
        
          <Button icon={<EditFilled />} onClick={() => showDrawer(record)} >Action</Button>
       
      ),
    },
  ];

  return (
    <div style={{ padding: "16px", background: "#fff" }}>
      <Breadcrumb className="mb-8">
        <Breadcrumb.Item href="/">Dashboard</Breadcrumb.Item>
        <Breadcrumb.Item>View Books</Breadcrumb.Item>
      </Breadcrumb>
      
      <Divider />
      <Title level={4}>Library Resources</Title>
      <Table columns={columns} dataSource={resources} rowKey="id" />

      <Drawer title="Resource Details" placement="right" onClose={handleClose} open={isDrawerVisible} width="50vw">
        {selectedResource && (
          <>
            <Title level={4}>{selectedResource.title}</Title>
            <Text strong>Author:</Text> {selectedResource.author}<br />
            <Text strong>Category:</Text> {selectedResource.category}<br />
            <Text strong>Year:</Text> {selectedResource.year}<br />
            <Text strong>Publisher:</Text> {selectedResource.publisher}<br />
            <Text strong>Quantity:</Text> {selectedResource.quantity}<br />
            <Text strong>Available:</Text> {selectedResource.available}<br />
            <Text strong>Requested:</Text> {selectedResource.requested}<br />
            <Divider />
            <Button onClick={handleEdit}>Edit</Button>
            <Button style={{ marginLeft: "8px" }}>Duplicate</Button>
            <Dropdown overlay={menu} trigger={["click"]}>
              <Button style={{ marginLeft: "8px" }} icon={<ArrowDownOutlined />}>More</Button>
            </Dropdown>
          </>
        )}
      </Drawer>
    </div>
  );
}