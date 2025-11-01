// server.js
import express from "express";
const app = express();
const PORT = 3000;

// Middleware to parse JSON body
app.use(express.json());

// Dummy product data (15 products)
let products = [
  { id: 1, name: "Apple iPhone 15 Pro", price: 1399, category: "Smartphones" },
  { id: 2, name: "Samsung Galaxy S24 Ultra", price: 1299, category: "Smartphones" },
  { id: 3, name: "Google Pixel 8", price: 999, category: "Smartphones" },
  { id: 4, name: "MacBook Air M3", price: 1699, category: "Laptops" },
  { id: 5, name: "Dell XPS 15", price: 1899, category: "Laptops" },
  { id: 6, name: "HP Envy 13", price: 1099, category: "Laptops" },
  { id: 7, name: "Sony WH-1000XM5", price: 399, category: "Headphones" },
  { id: 8, name: "JBL Flip 6", price: 129, category: "Speakers" },
  { id: 9, name: "Apple Watch Series 10", price: 499, category: "Wearables" },
  { id: 10, name: "Samsung Galaxy Watch 6", price: 449, category: "Wearables" },
  { id: 11, name: "Canon EOS R8", price: 1499, category: "Cameras" },
  { id: 12, name: "Nikon Z50", price: 1199, category: "Cameras" },
  { id: 13, name: "Asus ROG Strix G16", price: 1999, category: "Gaming Laptop" },
  { id: 14, name: "Logitech MX Master 3", price: 99, category: "Accessories" },
  { id: 15, name: "Anker PowerCore 20000", price: 69, category: "Accessories" },
];

// ✅ GET all products
app.get("/api/products", (req, res) => {
  res.json({ success: true, total: products.length, data: products });
});

// ✅ GET product by ID
app.get("/api/products/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const product = products.find((p) => p.id === id);

  if (product) {
    res.json({ success: true, data: product });
  } else {
    res.status(404).json({ success: false, message: "Product not found" });
  }
});

// ✅ POST - Add new product
app.post("/api/products", (req, res) => {
  const { name, price, category } = req.body;

  if (!name || !price || !category) {
    return res
      .status(400)
      .json({ success: false, message: "Please provide name, price, and category" });
  }

  const newProduct = {
    id: products.length + 1,
    name,
    price,
    category,
  };

  products.push(newProduct);
  res.status(201).json({
    success: true,
    message: "Product added successfully",
    data: newProduct,
  });
});

// ✅ PUT - Update existing product
app.put("/api/products/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const productIndex = products.findIndex((p) => p.id === id);

  if (productIndex === -1) {
    return res.status(404).json({ success: false, message: "Product not found" });
  }

  const { name, price, category } = req.body;
  products[productIndex] = {
    ...products[productIndex],
    name: name || products[productIndex].name,
    price: price || products[productIndex].price,
    category: category || products[productIndex].category,
  };

  res.json({
    success: true,
    message: "Product updated successfully",
    data: products[productIndex],
  });
});

// ✅ DELETE - Remove product
app.delete("/api/products/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const productIndex = products.findIndex((p) => p.id === id);

  if (productIndex === -1) {
    return res.status(404).json({ success: false, message: "Product not found" });
  }

  const deletedProduct = products.splice(productIndex, 1);
  res.json({
    success: true,
    message: "Product deleted successfully",
    data: deletedProduct[0],
  });
});

// ✅ Start server
app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));
