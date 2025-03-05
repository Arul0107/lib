import React from "react";
import { Avatar, Layout, Menu, Tooltip, Dropdown } from "antd";
import { Link, useLocation } from "react-router-dom";
import {
  HomeOutlined,
  FileTextOutlined,
  SendOutlined,
  UserAddOutlined,
  SettingOutlined,
  BookOutlined,
  UserOutlined,
  LogoutOutlined,
} from "@ant-design/icons";
import logo from "../../assets/logo/logo.png";

const { Sider } = Layout;
const { SubMenu } = Menu;

const menuItems = [
  { key: "1", label: "Dashboard", icon: <HomeOutlined />, path: "/" },
  {
    key: "2",
    label: "Schedules",
    icon: <UserAddOutlined />,
    children: [
      { key: "2-1", label: "Add Student", path: "/addStudent" },
      { key: "2-2", label: "View Student", path: "/viewstudent" },
    ],
  },
 
  {
    key: "3",
    label: "Borrow Book",
    icon: <SendOutlined />,
    children: [
      { key: "3-1", label: "Borrow Books", path: "/borrowbooks" },
      { key: "3-2", label: "View Borrowed Books", path: "/viewborrow" }, // New submenu item
    ],
  },
  {
    key: "4",
    label: "Books",
    icon: <FileTextOutlined />,
    children: [
      { key: "4-1", label: "Add Books", path: "/addbooks" },
      { key: "4-2", label: "View Books", path: "/viewbooks" },
    ],
  },
  { key: "5", label: "Bookself", icon: <BookOutlined />, path: "/bookself" },
  { key: "6", label: "Settings", icon: <SettingOutlined />, path: "/settings" },
];

// Dropdown menu for avatar
const avatarMenu = (
  <Menu>
    <Menu.Item key="profile" icon={<UserOutlined />}>
      <Link to="/profile">Profile</Link>
    </Menu.Item>
    <Menu.Item key="logout" icon={<LogoutOutlined />} danger>
      Logout
    </Menu.Item>
  </Menu>
);

const Sidebar = () => {
  const location = useLocation();

  return (
    <Sider
      collapsed={true}
      width={80}
      style={{
        background: "transparent",
        display: "flex",
        flexDirection: "column",
        height: "100vh",
      }}
    >
      {/* Logo Section */}
      <div style={{ textAlign: "center", padding: "16px" }}>
        <img src={logo} alt="Logo" width="50" />
      </div>

      {/* Menu (Takes up all available space) */}
      <div style={{ flexGrow: 1, overflowY: "auto" }}>
        <Menu
          theme="light"
          mode="vertical"
          defaultSelectedKeys={[location.pathname]}
          style={{ border: "none", background: "transparent" }}
        >
          {menuItems.map((item) =>
            item.children ? (
              <SubMenu key={item.key} icon={item.icon} title={item.label}>
                {item.children.map((subItem) => (
                  <Menu.Item key={subItem.key} style={{ background: "transparent" }}>
                    <Link to={subItem.path}>{subItem.label}</Link>
                  </Menu.Item>
                ))}
              </SubMenu>
            ) : (
              <Tooltip key={item.key} title={item.label} placement="right">
                <Menu.Item
                  key={item.key}
                  icon={item.icon}
                  style={{
                    color: location.pathname === item.path ? "#1890ff" : "#555",
                    background: "transparent",
                  }}
                >
                  <Link to={item.path}>{item.label}</Link>
                </Menu.Item>
              </Tooltip>
            )
          )}
        </Menu>
      </div>

      {/* Fixed Avatar with Dropdown */}
      <div
        style={{
          textAlign: "center",
          paddingBottom: "16px",
          paddingTop: "10px",
          borderTop: "1px solid #ddd",
          marginTop: "280px",
        }}
      >
        <Dropdown overlay={avatarMenu} trigger={["click"]}>
          <Avatar size="large" style={{ cursor: "pointer" }} />
        </Dropdown>
      </div>
    </Sider>
  );
};

export default Sidebar;
