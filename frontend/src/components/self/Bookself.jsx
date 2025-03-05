import React, { useState } from "react";
import {
  Input,
  Select,
  Card,
  Row,
  Col,
  Button,
  Breadcrumb,
  List,
  Divider,
  Drawer,
} from "antd";

const { Search } = Input;
const { Option } = Select;

const categories = [
  { id: "fiction", name: "Fiction" },
  { id: "science", name: "Science" },
  { id: "history", name: "History" },
];

const booksData = [
  { id: 1, title: "Fiction Book 1", author: "Author A", edition: "1st", category: "fiction", image: null },
  { id: 2, title: "Fiction Book 2", author: "Author B", edition: "2nd", category: "fiction", image: null },
  { id: 3, title: "Science Book 1", author: "Author C", edition: "1st", category: "science", image: null },
  { id: 4, title: "History Book 1", author: "Author D", edition: "3rd", category: "history", image: null },
];

const BookShelf = () => {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [searchText, setSearchText] = useState("");
  const [selectedAuthor, setSelectedAuthor] = useState(null);
  const [selectedEdition, setSelectedEdition] = useState(null);
  const [viewType, setViewType] = useState("card");
  const [selectedBook, setSelectedBook] = useState(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const selectedCategoryName = categories.find((cat) => cat.id === selectedCategory)?.name || "";

  const filteredBooks = booksData.filter((book) => {
    return (
      (!selectedCategory || book.category === selectedCategory) &&
      (searchText === "" || book.title.toLowerCase().includes(searchText.toLowerCase())) &&
      (!selectedAuthor || book.author === selectedAuthor) &&
      (!selectedEdition || book.edition === selectedEdition)
    );
  });

  const openDrawer = (book) => {
    setSelectedBook(book);
    setIsDrawerOpen(true);
  };

  return (
    <div style={{ padding: "20px" }}>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <Breadcrumb style={{ marginBottom: "20px" }}>
          <Breadcrumb.Item onClick={() => setSelectedCategory(null)} style={{ cursor: "pointer" }} m href="/">
            Dashboard
          </Breadcrumb.Item>
          <Breadcrumb.Item>Borrow Books Category</Breadcrumb.Item>
          {selectedCategory && <Breadcrumb.Item>{selectedCategoryName}</Breadcrumb.Item>}
        </Breadcrumb>
        {selectedCategory && (
          <Button onClick={() => setSelectedCategory(null)} style={{ marginBottom: "20px" }}>
            Back to Categories
          </Button>
        )}
      </div>

      <Divider />

      {!selectedCategory ? (
        <Row gutter={[16, 16]}>
          {categories.map((category) => (
            <Col key={category.id} xs={24} sm={12} md={8} lg={6}>
              <Card hoverable onClick={() => setSelectedCategory(category.id)} style={{ textAlign: "center" }}>
                <Card.Meta title={category.name} />
              </Card>
            </Col>
          ))}
        </Row>
      ) : (
        <>
        <div  style={{ display: "flex", justifyContent: "space-between" }}>
          <div>
        <Search placeholder="Search books..." onChange={(e) => setSearchText(e.target.value)} style={{ width: 200 }} />

        </div>
        <div style={{ display: "flex", gap: "10px", marginBottom: "20px", justifyContent: "" }}>
            <Select placeholder="Select Author" style={{ width: 150 }} allowClear onChange={setSelectedAuthor}>
              {[...new Set(booksData.map((book) => book.author))].map((author) => (
                <Option key={author} value={author}>
                  {author}
                </Option>
              ))}
            </Select>
            <Select placeholder="Select Edition" style={{ width: 150 }} allowClear onChange={setSelectedEdition}>
              {[...new Set(booksData.map((book) => book.edition))].map((edition) => (
                <Option key={edition} value={edition}>
                  {edition}
                </Option>
              ))}
            </Select>
            <Select value={viewType} onChange={setViewType} style={{ width: 150 }}>
              <Option value="list">List View</Option>
              <Option value="card">Card View</Option>
                {/* <Option value="tile">Tile View</Option>
                <Option value="detailed">Detailed View</Option> */}
            </Select>
          </div>
        </div>

       

          <Divider />

          {viewType === "list" && (
            <List
              itemLayout="horizontal"
              dataSource={filteredBooks}
              renderItem={(book) => (
                <List.Item onClick={() => openDrawer(book)} style={{ cursor: "pointer" }}>
                  <List.Item.Meta title={book.title} description={`Author: ${book.author}, Edition: ${book.edition}`} />
                </List.Item>
              )}
            />
          )}

          {viewType === "card" && (
            <Row gutter={[16, 16]}>
              {filteredBooks.map((book) => (
                <Col key={book.id} xs={24} sm={12} md={8} lg={6} xl={4}>
                  <Card hoverable onClick={() => openDrawer(book)} cover={<div style={{ height: 150, background: "#f0f0f0" }}>{book.image ? <img alt={book.title} src={book.image} style={{ height: 150, objectFit: "cover" }} /> : "No Image"}</div>}>
                    <Card.Meta title={book.title} description={`Author: ${book.author}, Edition: ${book.edition}`} />
                  </Card>
                </Col>
              ))}
            </Row>
          )}
        </>
      )}

      {/* Drawer for Book Details */}
      <Drawer title={selectedBook?.title} placement="right" onClose={() => setIsDrawerOpen(false)} open={isDrawerOpen} width={400}>
        {selectedBook && (
          <div>
            {selectedBook.image ? (
              <img alt={selectedBook.title} src={selectedBook.image} style={{ width: "100%", height: "200px", objectFit: "cover" }} />
            ) : (
              <div style={{ width: "100%", height: "200px", background: "#f0f0f0", display: "flex", alignItems: "center", justifyContent: "center" }}>No Image</div>
            )}
            <p><strong>Author:</strong> {selectedBook.author}</p>
            <p><strong>Edition:</strong> {selectedBook.edition}</p>
          </div>
        )}
      </Drawer>
    </div>
  );
};

export default BookShelf;
    