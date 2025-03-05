import React, { useState } from "react";
import { Table, Tag, Button, message, Drawer, Descriptions } from "antd";

const initialRecords = [
  {
    id: 1,
    studentName: "John Doe",
    studentId: "STU001",
    year: "2023",
    bookName: "The Great Gatsby",
    author: "F. Scott Fitzgerald",
    issueDate: "2024-02-01",
    returnDate: "2024-02-10",
    dueDate: "2024-02-08",
    status: "Active",
    fine: 0,
  },
  {
    id: 2,
    studentName: "Jane Smith",
    studentId: "STU002",
    year: "2023",
    bookName: "1984",
    author: "George Orwell",
    issueDate: "2024-01-15",
    returnDate: "2024-02-05",
    dueDate: "2024-02-03",
    status: "Pending",
    fine: 5,
  },
];

const ViewBorrow = () => {
  const [borrowRecords, setBorrowRecords] = useState(initialRecords);
  const [drawerVisible, setDrawerVisible] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState(null);

  const updateStatus = (record, newStatus) => {
    const updatedRecords = borrowRecords.map((item) =>
      item.id === record.id ? { ...item, status: newStatus } : item
    );
    setBorrowRecords(updatedRecords);
    message.success(`Status updated to ${newStatus}`);
  };

  const markAsReturned = () => {
    if (selectedRecord) {
      updateStatus(selectedRecord, "Closed");
      setDrawerVisible(false);
    }
  };

  const markAsUnreturned = () => {
    if (selectedRecord) {
      updateStatus(selectedRecord, "Active");
      setDrawerVisible(false);
    }
  };

  const getStatusTag = (record) => {
    let color = "blue";
    let label = record.status;

    if (record.status === "Pending" && record.fine > 0) {
      color = "red";
      label = `Pending - $${record.fine}`;
    } else if (record.status === "Active") {
      color = "green";
    } else if (record.status === "Closed") {
      color = "gray";
    }

    return <Tag color={color}>{label}</Tag>;
  };

  const showDrawer = (record) => {
    setSelectedRecord(record);
    setDrawerVisible(true);
  };

  const closeDrawer = () => {
    setDrawerVisible(false);
    setSelectedRecord(null);
  };

  const columns = [
    {
      title: "Student Name",
      dataIndex: "studentName",
      key: "studentName",
    },
    {
      title: "Student ID",
      dataIndex: "studentId",
      key: "studentId",
    },
    {
      title: "Year",
      dataIndex: "year",
      key: "year",
    },
    {
      title: "Book Name",
      dataIndex: "bookName",
      key: "bookName",
    },
    {
      title: "Author",
      dataIndex: "author",
      key: "author",
    },
    {
      title: "Issue Date",
      dataIndex: "issueDate",
      key: "issueDate",
    },
    {
      title: "Due Date",
      dataIndex: "dueDate",
      key: "dueDate",
    },
    {
      title: "Return Date",
      dataIndex: "returnDate",
      key: "returnDate",
    },
    {
      title: "Status",
      key: "status",
      render: (record) => getStatusTag(record),
    },
    {
      title: "Actions",
      key: "actions",
      render: (record) => (
        <Button onClick={() => showDrawer(record)}>View Details</Button>
      ),
    },
  ];

  return (
    <div style={{ padding: "16px", background: "#fff" }}>
      <h2 className="text-xl font-semibold mb-4">Borrowed Books Records</h2>
      <Table columns={columns} dataSource={borrowRecords} rowKey="id" bordered pagination={{ pageSize: 5 }} />

      {/* Drawer for viewing details */}
      <Drawer
        title="Borrow Record Details"
        placement="right"
        width={400}
        onClose={closeDrawer}
        open={drawerVisible}
      >
        {selectedRecord && (
          <>
            <Descriptions column={1} bordered>
              <Descriptions.Item label="Student Name">{selectedRecord.studentName}</Descriptions.Item>
              <Descriptions.Item label="Student ID">{selectedRecord.studentId}</Descriptions.Item>
              <Descriptions.Item label="Year">{selectedRecord.year}</Descriptions.Item>
              <Descriptions.Item label="Book Name">{selectedRecord.bookName}</Descriptions.Item>
              <Descriptions.Item label="Author">{selectedRecord.author}</Descriptions.Item>
              <Descriptions.Item label="Issue Date">{selectedRecord.issueDate}</Descriptions.Item>
              <Descriptions.Item label="Due Date">{selectedRecord.dueDate}</Descriptions.Item>
              <Descriptions.Item label="Return Date">{selectedRecord.returnDate}</Descriptions.Item>
              <Descriptions.Item label="Fine">
                {selectedRecord.fine > 0 ? `$${selectedRecord.fine}` : "No Fine"}
              </Descriptions.Item>
              <Descriptions.Item label="Status">{selectedRecord.status}</Descriptions.Item>
            </Descriptions>
            {selectedRecord.status !== "Closed" ? (
              <Button type="primary" style={{ marginTop: 16 }} onClick={markAsReturned}>
                Mark as Returned
              </Button>
            ) : (
              <Button type="default" style={{ marginTop: 16 }} onClick={markAsUnreturned}>
                Mark as Unreturned
              </Button>
            )}
          </>
        )}
      </Drawer>
    </div>
  );
};

export default ViewBorrow;
    