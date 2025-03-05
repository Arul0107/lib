import React, { useState } from "react";
import { Layout, Card, Table, Typography, Row, Col, Select, DatePicker } from "antd";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, PieChart, Pie, Cell, LineChart, Line } from "recharts";
import moment from "moment";
import './dashboard.css'

const { Content } = Layout;
const { Title } = Typography;
const { Option } = Select;
const { RangePicker } = DatePicker;

// Sample Data
const bookStats = [
  { name: "Total Books", count: 1200 },
  { name: "Daily Active Users", count: 340 },
  { name: "Fast Moving Books", count: 85 },
  { name: "Borrowed Books", count: 450 },
];

const borrowedBooksData = [
  { key: "1", student: "Alice Johnson", book: "JavaScript Essentials", issueDate: "2025-02-20", returnDate: "2025-03-05", pendingFine: "$5", totalAmount: "$50" },
  { key: "2", student: "Bob Smith", book: "React Basics", issueDate: "2025-02-22", returnDate: "2025-03-08", pendingFine: "$0", totalAmount: "$30" },
];

const colors = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

const Dashboard = () => {
  const [barChartFilter, setBarChartFilter] = useState("monthly");
  const [barChartDateRange, setBarChartDateRange] = useState([moment().startOf("month"), moment()]);
  
  const [pieChartFilter, setPieChartFilter] = useState("monthly");
  const [pieChartDateRange, setPieChartDateRange] = useState([moment().startOf("month"), moment()]);
  
  // const [lineChartFilter, setLineChartFilter] = useState("monthly");
  // const [lineChartDateRange, setLineChartDateRange] = useState([moment().startOf("month"), moment()]);
  
  return (
    <Layout style={{ height: "100vh", display: "flex", flex: "none" }}>
      <Content style={{ padding: "20px", overflow: "auto", flex: 1 }}>
        <Title level={2}>Library Dashboard</Title>

        {/* Charts Section */}
        <Row gutter={[16, 16]} style={{ marginTop: "20px" }}>
          {/* Bar Chart */}
          <Col xs={24} md={12}>
            <Card title="Book Statistics">
              <Select value={barChartFilter} onChange={setBarChartFilter} style={{ width: 200, marginRight: 10 }}>
                <Option value="daily">Daily</Option>
                <Option value="monthly">Monthly</Option>
                <Option value="yearly">Yearly</Option>
              </Select>
              <RangePicker value={barChartDateRange} onChange={setBarChartDateRange} />
              <BarChart width={400} height={250} data={bookStats}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="count" fill="#8884d8" />
              </BarChart>
            </Card>
          </Col>

          {/* Pie Chart */}
          <Col xs={24} md={12}>
            <Card title="Book Distribution">
              <Select value={pieChartFilter} onChange={setPieChartFilter} style={{ width: 200, marginRight: 10 }}>
                <Option value="daily">Daily</Option>
                <Option value="monthly">Monthly</Option>
                <Option value="yearly">Yearly</Option>
              </Select>
              <RangePicker value={pieChartDateRange} onChange={setPieChartDateRange} />
              <PieChart width={400} height={250}>
                <Pie data={bookStats} cx="50%" cy="50%" outerRadius={80} fill="#82ca9d" dataKey="count">
                  {bookStats.map((_, index) => (
                    <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </Card>
          </Col>
        </Row>
{/* 
        Line Chart
        <Row gutter={[16, 16]} style={{ marginTop: "20px" }}>
          <Col span={24}>
            <Card title="Book Trends Over Time">
              <Select value={lineChartFilter} onChange={setLineChartFilter} style={{ width: 200, marginRight: 10 }}>
                <Option value="daily">Daily</Option>
                <Option value="monthly">Monthly</Option>
                <Option value="yearly">Yearly</Option>
              </Select>
              <RangePicker value={lineChartDateRange} onChange={setLineChartDateRange} />
              <LineChart width={800} height={300} data={bookStats}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="count" stroke="#8884d8" />
              </LineChart>
            </Card>
          </Col>
        </Row> */}

        {/* Borrowed Books Table */}
        <Card title="Borrowed Books" style={{ marginTop: "20px" }}>
          <Table
            columns={[
              { title: "Student Name", dataIndex: "student", key: "student" },
              { title: "Book Title", dataIndex: "book", key: "book" },
              { title: "Issue Date", dataIndex: "issueDate", key: "issueDate" },
              { title: "Return Date", dataIndex: "returnDate", key: "returnDate" },
              { title: "Pending Fine", dataIndex: "pendingFine", key: "pendingFine" },
              { title: "Total Amount", dataIndex: "totalAmount", key: "totalAmount" },
            ]}
            dataSource={borrowedBooksData}
            pagination={{ pageSize: 5 }}
          />
        </Card>
      </Content>
    </Layout>
  );
};

export default Dashboard;