import React from "react";
import { Layout } from "antd";
import Sidebar from "../components/sidebar/Sidebar";
import { Outlet } from "react-router-dom";

const { Content } = Layout;

const AppLayout = () => {
  return (
    <Layout style={{ minHeight: "100vh" }}>
      {/* Sidebar (Fixed for all pages) */}
      <Sidebar />

      {/* Main Content */}
      <Layout style={{ padding: "20px", marginLeft: 80 }}>
        <Content>
          <Outlet /> {/* This will render the child components (Dashboard, Account, etc.) */}
        </Content>
      </Layout>
    </Layout>
  );
};

export default AppLayout;
