import React, { useState, useEffect } from "react";
import { Breadcrumb, Drawer, Card, Avatar, Button, Row, Col, Divider, message, Upload, Table, Spin } from "antd";
import { Input, Select, Form, DatePicker, Switch, notification } from "antd";
import { UploadOutlined, UserAddOutlined, FileAddOutlined } from "@ant-design/icons";
import Papa from 'papaparse';
import "./Addstudent.css";

const { Meta } = Card;
const { Option } = Select;
const { RangePicker } = DatePicker;

const Addstudent = () => {
  const [form] = Form.useForm();
  const [preview, setPreview] = useState(null);
  const [isDrawerVisible, setIsDrawerVisible] = useState(false);
  const [uploadedImage, setUploadedImage] = useState(null);
  const [bulkData, setBulkData] = useState([]);
  const [bulkMode, setBulkMode] = useState(false);
  const [students, setStudents] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = (values) => {
    setPreview(values);
    setIsDrawerVisible(true);
  };

  const handleBulkUpload = (info) => {
    if (info.file) {
      setIsLoading(true);
      setError(null);
      Papa.parse(info.file, {
        complete: (result) => {
          setIsLoading(false);
          const data = result.data.slice(1).map(item => ({
            s_id: item[0],
            firstName: item[1],
            lastName: item[2],
            email: item[3],
            phone: item[4],
            course: item[5],
            enrollmentDate: item[6]
          }));
          setBulkData(data);
          message.success(`${data.length} students parsed successfully`);
        },
        header: true,
        error: (err) => {
          setIsLoading(false);
          setError(err.message);
          message.error("Error parsing CSV file");
        }
      });
    }
  };

  const confirmBulkUpload = () => {
    setStudents(prev => [...prev, ...bulkData]);
    setBulkData([]);
    notification.success({
      message: 'Bulk Upload Successful',
      description: `${bulkData.length} students added successfully`
    });
  };

  const columns = [
    { title: 'Student ID', dataIndex: 's_id' },
    { title: 'Name', render: (_, record) => `${record.firstName} ${record.lastName}` },
    { title: 'Email', dataIndex: 'email' },
    { title: 'Course', dataIndex: 'course' }
  ];

  return (
    <div className="p-4 scroll-containerstudents" style={{ height: '100vh', overflowY: 'auto' }}>
      <Breadcrumb className="mb-4">
        <Breadcrumb.Item href="/">Dashboard</Breadcrumb.Item>
        <Breadcrumb.Item>Add Student</Breadcrumb.Item>
      </Breadcrumb>

      <Divider />

      <div className="mb-4">
        <Switch
          checkedChildren="Bulk Mode"
          unCheckedChildren="Single Mode"
          onChange={checked => setBulkMode(checked)}
        />
        <Button 
          type="link" 
          href="/sample-students.csv" 
          download="students-template.csv"
        >
          Download CSV Template
        </Button>
      </div>

      {bulkMode ? (
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">
            <FileAddOutlined /> Bulk Upload Students
          </h2>
          {error && <p className="text-red">{error}</p>}
          <Upload
            accept=".csv"
            beforeUpload={handleBulkUpload}
            showUploadList={false}
          >
            <Button icon={<UploadOutlined />}>Upload CSV File</Button>
          </Upload>
          {isLoading ? (
            <Spin size="large" />
          ) : (
            <>
              {bulkData.length > 0 && (
                <>
                  <Table
                    className="mt-4"
                    columns={columns}
                    dataSource={bulkData}
                    pagination={false}
                    rowKey="s_id"
                  />
                  <Button
                    type="primary"
                    className="mt-4"
                    onClick={confirmBulkUpload}
                  >
                    Confirm Upload ({bulkData.length} students)
                  </Button>
                </>
              )}
            </>
          )}
        </div>
      ) : (
        <div className="bg-white p-6 rounded-lg shadow-md form-container">
          <h2 className="text-xl font-semibold mb-4">
            <UserAddOutlined /> Add New Student
          </h2>

          <Form form={form} layout="vertical" onFinish={handleSubmit}>
            <Row gutter={16}>
              <Col span={24}>
                <Form.Item
                  name="profileImage"
                  label="Profile Picture"
                  valuePropName="fileList"
                  getValueFromEvent={e => e?.fileList}
                >
                  <Upload
                    listType="picture-card"
                    beforeUpload={file => {
                      const reader = new FileReader();
                      reader.onload = e => setUploadedImage(e.target.result);
                      reader.readAsDataURL(file);
                      return false;
                    }}
                    maxCount={1}
                  >
                    {uploadedImage ? null : <UploadOutlined />}
                  </Upload>
                </Form.Item>
              </Col>

              <Col xs={24} md={12}>
                <Form.Item
                  label="Student ID"
                  name="s_id"
                >
                  <Input 
                    placeholder="STU-001" 
                    suffix={<Button type="link" onClick={() => form.setFieldValue('s_id', `STU-${Math.floor(Math.random() * 1000)}`)}>
                      Generate
                    </Button>}
                  />
                </Form.Item>
              </Col>

              <Col xs={24} md={12}>
                <Form.Item
                  label="Enrollment Date"
                  name="enrollmentDate"
                >
                  <DatePicker className="w-full" />
                </Form.Item>
              </Col>

              <Col xs={24} md={12}>
                <Form.Item
                  label="First Name"
                  name="firstName"
                >
                  <Input placeholder="John" />
                </Form.Item>
              </Col>

              <Col xs={24} md={12}>
                <Form.Item
                  label="Last Name"
                  name="lastName"
                >
                  <Input placeholder="Doe" />
                </Form.Item>
              </Col>

              <Col xs={24} md={12}>
                <Form.Item
                  label="Course"
                  name="course"
                >
                  <Select placeholder="Select course">
                    <Option value="Computer Science">Computer Science</Option>
                    <Option value="Electrical Engineering">Electrical Engineering</Option>
                    <Option value="Business Administration">Business Administration</Option>
                  </Select>
                </Form.Item>
              </Col>

              <Col xs={24} md={12}>
                <Form.Item
                  label="Email"
                  name="email"
                >
                  <Input placeholder="john@example.com" />
                </Form.Item>
              </Col>

              <Col span={24} className="">
                <Form.Item>
                  <div className="addlastbtn">
                    <Button type="primary" htmlType="submit">
                      Add Student
                    </Button>
                    <Button htmlType="reset" className="ml-2">
                      Reset
                    </Button>
                  </div>
                </Form.Item>
              </Col>
            </Row>
          </Form>
        </div>
      )}

      <Divider />

      <div className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-lg font-semibold mb-4">Recently Added Students</h3>
        <Table
          columns={columns}
          dataSource={students}
          pagination={{ pageSize: 5 }}
          rowKey="s_id"
        />
      </div>

      <Drawer
        title="Student Preview"
        height="100vh"
        open={isDrawerVisible}
        onClose={() => setIsDrawerVisible(false)}
        bodyStyle={{ padding: '24px' }}
      >
        {preview && (
          <Card>
            <Meta
              avatar={<Avatar src={uploadedImage} size={64} />}
              title={`${preview.firstName} ${preview.lastName}`}
              description={preview.course}
            />
            <Divider />
            <div className="space-y-2 mt-4">
              <p><strong>Student ID:</strong> {preview.s_id}</p>
              <p><strong>Email:</strong> {preview.email}</p>
              <p><strong>Enrollment Date:</strong> {preview.enrollmentDate}</p>
              <p><strong>Phone:</strong> {preview.phone}</p>
              <p><strong>Address:</strong> {preview.address}</p>
              <p><strong>Country:</strong> {preview.country}</p>
            </div>
            <Button
              type="primary"
              block
              className="mt-4"
              onClick={() => {
                setStudents(prev => [...prev, preview]);
                setIsDrawerVisible(false);
                notification.success({
                  message: 'Student Added',
                  description: `${preview.firstName} added successfully`
                });
              }}
            >
              Confirm and Save
            </Button>
          </Card>
        )}
      </Drawer>
    </div>
  );
};

export default Addstudent;