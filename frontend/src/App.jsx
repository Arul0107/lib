import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { ProSidebarProvider } from "react-pro-sidebar";
import Sidebar from "./components/sidebar/Sidebar";
import Dashboard from "./components/dashboard/Dashboard";
import AddBooks from "./components/books/Addbooks";
import AddStudent from "./components/user/AddStudent";
import ViewBooks from "./components/books/Viewbooks";
import Borrowbooks from "./components/borrow/Borrowbooks";
import Viewuser from "./components/user/Viewuser";
import Bookshelf from "./components/self/Bookself";
import ViewBorrow from "./components/borrow/Viewborrow";

function App() {
  return (
    <ProSidebarProvider>
      <Router>
        <div style={{ display: "flex", minHeight: "100vh" }}>
          {/* Sidebar on the left */}
          <Sidebar />

          {/* Main content */}
          <div style={{ flex: 1, padding: "20px", overflow: "auto" }}>
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/addbooks" element={<AddBooks />} />
              <Route path="/viewbooks" element={<ViewBooks />} />
              <Route path="/borrowbooks" element={<Borrowbooks />} />
              <Route path="/addstudent" element={<AddStudent />} />
              <Route path="/viewstudent" element={<Viewuser />} />
              <Route path="/bookself" element={<Bookshelf />} />
              <Route path="/viewborrow" element={<ViewBorrow />} />
            </Routes>
          </div>
        </div>
      </Router>
    </ProSidebarProvider>
  );
}

export default App;
