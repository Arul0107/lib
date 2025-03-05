import React, { useState } from "react";
import { Form, Input, Select, DatePicker, Button, Card, Breadcrumb, Divider, Row, Col, Drawer, Spin } from "antd";
import dayjs from "dayjs";
import "./borrow.css";

const { Option } = Select;

export default function BorrowBooks() {
  const [form] = Form.useForm();
  const [days, setDays] = useState("");
  const [isDrawerVisible, setIsDrawerVisible] = useState(false);
  const [ticketDetails, setTicketDetails] = useState(null);
  const [isGenerating, setIsGenerating] = useState(false);

  const calculateDays = () => {
    const fromDate = form.getFieldValue("fromDate");
    const toDate = form.getFieldValue("toDate");

    if (fromDate && toDate) {
      const diff = dayjs(toDate).diff(dayjs(fromDate), "day");
      setDays(diff > 0 ? diff : "");
    }
  };

  const onFinish = (values) => {
    setIsGenerating(true);
    setTimeout(() => {
      const ticketId = `TICKET-${Math.random().toString(36).substr(2, 9).toUpperCase()}`;
      const ticket = {
        id: ticketId,
        member: values.member,
        isbn: values.isbn,
        resourceType: values.resourceType,
        title: values.title,
        edition: values.edition,
        language: values.language,
        fromDate: values.fromDate,
        toDate: values.toDate,
        days: days,
      };
      setTicketDetails(ticket);
      setIsDrawerVisible(true);
      setIsGenerating(false);
    }, 1000);
  };

  const closeDrawer = () => {
    setIsDrawerVisible(false);
  };

  return (
    <div className="container mx-auto p-6">
      {/* Breadcrumb Navigation */}
      <Breadcrumb className="mb-4">
        <Breadcrumb.Item href="/">Dashboard</Breadcrumb.Item>
        <Breadcrumb.Item>Borrow Books</Breadcrumb.Item>
      </Breadcrumb>

      <Divider />

      {/* Borrow Resource Form */}
      <div className="scroll-containerborrow">
        <Card title="Borrow Books" className="shadow-md w-full max-w-4xl mx-auto">
          <Form form={form} layout="vertical" onFinish={onFinish}>
            <Row gutter={16}>
              {/* Member */}
              <Col xs={24} md={12}>
                <Form.Item name="member" label="Member">
                  <Select placeholder="-Select-">
                    <Option value="user1">User 1</Option>
                    <Option value="user2">User 2</Option>
                  </Select>
                </Form.Item>
              </Col>

              {/* ISBN/Barcode */}
              <Col xs={24} md={12}>
                <Form.Item name="isbn" label="ISBN/Barcode">
                  <Input placeholder="Enter ISBN/Barcode" />
                </Form.Item>
              </Col>
            </Row>

            <Row gutter={16}>
              {/* Resource Type */}
              <Col xs={24} md={12}>
                <Form.Item name="resourceType" label="Resource Type">
                  <Select placeholder="-Select-">
                    <Option value="book">Book</Option>
                    <Option value="cd">CD</Option>
                  </Select>
                </Form.Item>
              </Col>

              {/* Title */}
              <Col xs={24} md={12}>
                <Form.Item name="title" label="Title">
                  <Select placeholder="-Select-">
                    <Option value="title1">Title 1</Option>
                    <Option value="title2">Title 2</Option>
                  </Select>
                </Form.Item>
              </Col>
            </Row>

            <Row gutter={16}>
              {/* Edition */}
              <Col xs={24} md={12}>
                <Form.Item name="edition" label="Edition">
                  <Select placeholder="-Select-">
                    <Option value="first">First Edition</Option>
                    <Option value="second">Second Edition</Option>
                  </Select>
                </Form.Item>
              </Col>

              {/* Language */}
              <Col xs={24} md={12}>
                <Form.Item name="language" label="Language">
                  <Select placeholder="-Select-">
                    <Option value="english">English</Option>
                    <Option value="tamil">Tamil</Option>
                  </Select>
                </Form.Item>
              </Col>
            </Row>

            <Row gutter={16}>
              {/* From Date */}
              <Col xs={24} md={12}>
                <Form.Item name="fromDate" label="From Date">
                  <DatePicker style={{ width: "100%" }} format="DD-MMM-YYYY" onChange={calculateDays} />
                </Form.Item>
              </Col>

              {/* To Date */}
              <Col xs={24} md={12}>
                <Form.Item name="toDate" label="To Date">
                  <DatePicker style={{ width: "100%" }} format="DD-MMM-YYYY" onChange={calculateDays} />
                </Form.Item>
              </Col>
            </Row>

            <Row gutter={16}>
              {/* No of Days */}
              <Col xs={24} md={12}>
                <Form.Item label="No Of Days">
                  <Input value={days} readOnly placeholder="######" />
                </Form.Item>
              </Col>
            </Row>

            {/* Buttons */}
            <Row gutter={16}>
              <Col xs={24} md={12}>
                <Form.Item>
                  <Button type="primary" htmlType="submit" style={{ marginRight: 10 }} loading={isGenerating}>
                    Submit
                  </Button>
                  <Button onClick={() => form.resetFields()}>Reset</Button>
                </Form.Item>
              </Col>
            </Row>
          </Form>
        </Card>
      </div>

      {/* Drawer to display ticket details */}
      <Drawer
        title="Ticket Details"
        width={600}
        open={isDrawerVisible}
        onClose={closeDrawer}
      >
        {ticketDetails ? (
          <Card className="ticket-details-card">
            <p><strong>Ticket ID:</strong> {ticketDetails.id}</p>
            <p><strong>Member:</strong> {ticketDetails.member}</p>
            <p><strong>ISBN/Barcode:</strong> {ticketDetails.isbn}</p>
            <p><strong>Resource Type:</strong> {ticketDetails.resourceType}</p>
            <p><strong>Title:</strong> {ticketDetails.title}</p>
            <p><strong>Edition:</strong> {ticketDetails.edition}</p>
            <p><strong>Language:</strong> {ticketDetails.language}</p>
            <p><strong>From Date:</strong> {ticketDetails.fromDate}</p>
            <p><strong>To Date:</strong> {ticketDetails.toDate}</p>
            <p><strong>No Of Days:</strong> {ticketDetails.days}</p>
          </Card>
        ) : (
          <Spin />
        )}
      </Drawer>
    </div>
  );
}