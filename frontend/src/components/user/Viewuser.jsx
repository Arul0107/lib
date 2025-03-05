import React, { useState } from "react";
import { Table, Tag, Button, message, Drawer, Descriptions, Select, List, Card, Row, Col, Input, Avatar } from "antd";
import { SearchOutlined, UserOutlined } from "@ant-design/icons";

const { Option } = Select;

const initialRecords = [
  {
    id: 1,
    studentId: "STU001",
    firstName: "John",
    lastName: "Doe",
    email: "john.doe@university.edu",
    phoneNumber: "+1 555-1234",
    role: "Student",
    membershipStatus: "Active",
    joinDate: "2023-01-15",
    expiryDate: "2025-01-15",
    booksBorrowed: 4,
    image: "https://randomuser.me/api/portraits/men/1.jpg",
  },
  {
    id: 2,
    studentId: "STU002",
    firstName: "Jane",
    lastName: "Smith",
    email: "jane.smith@faculty.edu",
    phoneNumber: "+1 555-5678",
    role: "Faculty",
    membershipStatus: "Expired",
    joinDate: "2022-03-10",
    expiryDate: "2024-03-10",
    booksBorrowed: 0,
    image: "https://randomuser.me/api/portraits/women/1.jpg",
  },
];

const Viewuser = () => {
  const [members, setMembers] = useState(initialRecords);
  const [drawerVisible, setDrawerVisible] = useState(false);
  const [selectedMember, setSelectedMember] = useState(null);
  const [viewType, setViewType] = useState("table");
  const [searchTerm, setSearchTerm] = useState("");
  const [filterRole, setFilterRole] = useState("all");

  const filteredMembers = members.filter(member => {
    const matchesSearch = member.studentId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      member.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      member.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      member.email.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesRole = filterRole === "all" || member.role === filterRole;
    
    return matchesSearch && matchesRole;
  });

  const updateMembershipStatus = (member, newStatus) => {
    const updatedMembers = members.map(item =>
      item.id === member.id ? { ...item, membershipStatus: newStatus } : item
    );
    setMembers(updatedMembers);
    message.success(`Membership status updated to ${newStatus}`);
  };

  const getRoleOptions = () => {
    const roles = [...new Set(members.map(member => member.role))];
    return roles.map(role => <Option key={role} value={role}>{role}</Option>);
  };

  const showDrawer = (record) => {
    setSelectedMember(record);
    setDrawerVisible(true);
  };

  const closeDrawer = () => {
    setDrawerVisible(false);
    setSelectedMember(null);
  };

  const activateMembership = () => {
    if (selectedMember) {
      updateMembershipStatus(selectedMember, "Active");
      setDrawerVisible(false);
    }
  };

  const renewMembership = () => {
    if (selectedMember) {
      updateMembershipStatus(selectedMember, "Active");
      // Add logic to update expiry date here
      setDrawerVisible(false);
    }
  };

  const columns = [
    {
      title: "Profile",
      key: "image",
      render: (record) => <Avatar src={record.image} icon={<UserOutlined />} />
    },
    {
      title: "Student ID",
      dataIndex: "studentId",
      key: "studentId",
      sorter: (a, b) => a.studentId.localeCompare(b.studentId),
    },
    {
      title: "Name",
      render: (record) => `${record.firstName} ${record.lastName}`,
      sorter: (a, b) => a.firstName.localeCompare(b.firstName),
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Role",
      dataIndex: "role",
      key: "role",
      filters: [...new Set(members.map(member => ({ text: member.role, value: member.role })))], // Added missing closing parens
      onFilter: (value, record) => record.role === value,
    },
    {
      title: "Status",
      key: "membershipStatus",
      render: (record) => (
        <Tag color={{
          Active: "green",
          Expired: "red",
          Suspended: "orange",
        }[record.membershipStatus]}>
          {record.membershipStatus}
        </Tag>
      ),
    },
    {
      title: "Actions",
      key: "actions",
      render: (record) => <Button onClick={() => showDrawer(record)}>View Details</Button>,
    },
  ];

  return (
    <div style={{ padding: "16px", background: "#fff" }}>
      <div style={{ display: 'flex', gap: 16, marginBottom: 16 }}>
        <Input
          placeholder="Search members..."
          prefix={<SearchOutlined />}
          style={{ width: 200 }}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <Select
          style={{ width: 150 }}
          placeholder="Filter by Role"
          onChange={setFilterRole}
          allowClear
        >
          <Option value="all">All Roles</Option>
          {getRoleOptions()}
        </Select>
        <Select
          value={viewType}
          onChange={setViewType}
          style={{ width: 200 }}
        >
          <Option value="table">Table View</Option>
          <Option value="list">List View</Option>
          <Option value="card">Card View</Option>
        </Select>
      </div>

      {viewType === "table" && (
        <Table
          columns={columns}
          dataSource={filteredMembers}
          rowKey="id"
          bordered
          pagination={{ pageSize: 5 }}
        />
      )}

      {viewType === "list" && (
        <List
          dataSource={filteredMembers}
          renderItem={(member) => (
            <List.Item
              onClick={() => showDrawer(member)}
              extra={<Tag color={member.membershipStatus === "Active" ? "green" : "red"}>
                {member.membershipStatus}
              </Tag>}
            >
              <List.Item.Meta
                avatar={<Avatar src={member.image} />}
                title={`${member.firstName} ${member.lastName}`}
                description={
                  <>
                    <div>{member.email}</div>
                    <div>{member.role} | {member.studentId}</div>
                  </>
                }
              />
            </List.Item>
          )}
        />
      )}

      {viewType === "card" && (
        <Row gutter={[16, 16]}>
          {filteredMembers.map((member) => (
            <Col key={member.id} xs={24} sm={12} md={8} lg={6}>
              <Card
                hoverable
                onClick={() => showDrawer(member)}
                cover={<img alt="profile" src={member.image} style={{ height: 200, objectFit: 'cover' }} />}
              >
                <Card.Meta
                  title={<>
                    {member.firstName} {member.lastName}
                    <Tag color={member.membershipStatus === "Active" ? "green" : "red"} style={{ marginLeft: 8 }}>
                      {member.membershipStatus}
                    </Tag>
                  </>}
                  description={
                    <>
                      <div>{member.role}</div>
                      <div>{member.email}</div>
                      <div>Student ID: {member.studentId}</div>
                    </>
                  }
                />
              </Card>
            </Col>
          ))}
        </Row>
      )}

      <Drawer
        title="Member Details"
        width={500}
        open={drawerVisible}
        onClose={closeDrawer}
      >
        {selectedMember && (
          <>
            <div style={{ textAlign: 'center', marginBottom: 24 }}>
              <Avatar
                src={selectedMember.image}
                size={128}
                icon={<UserOutlined />}
              />
              <h3 style={{ marginTop: 16 }}>
                {selectedMember.firstName} {selectedMember.lastName}
              </h3>
              <Tag color="blue">{selectedMember.role}</Tag>
            </div>

            <Descriptions bordered column={1}>
              <Descriptions.Item label="Student ID">{selectedMember.studentId}</Descriptions.Item>
              <Descriptions.Item label="Email">{selectedMember.email}</Descriptions.Item>
              <Descriptions.Item label="Phone">{selectedMember.phoneNumber}</Descriptions.Item>
              <Descriptions.Item label="Membership Status">
                <Tag color={selectedMember.membershipStatus === "Active" ? "green" : "red"}>
                  {selectedMember.membershipStatus}
                </Tag>
              </Descriptions.Item>
              <Descriptions.Item label="Join Date">{selectedMember.joinDate}</Descriptions.Item>
              <Descriptions.Item label="Expiry Date">{selectedMember.expiryDate}</Descriptions.Item>
              <Descriptions.Item label="Books Borrowed">
                <span style={{ fontSize: 18 }}>{selectedMember.booksBorrowed}</span>
              </Descriptions.Item>
            </Descriptions>

            <div style={{ marginTop: 24, display: 'flex', gap: 8, flexWrap: 'wrap' }}>
              {selectedMember.membershipStatus !== "Active" ? (
                <Button type="primary" onClick={activateMembership}>
                  Activate Membership
                </Button>
              ) : (
                <>
                  <Button danger onClick={() => updateMembershipStatus(selectedMember, "Suspended")}>
                    Suspend
                  </Button>
                  <Button onClick={renewMembership}>
                    Renew
                  </Button>
                </>
              )}
              <Button onClick={() => updateMembershipStatus(selectedMember, "Expired")}>
                Mark as Expired
              </Button>
            </div>
          </>
        )}
      </Drawer>
    </div>
  );
};

export default Viewuser;