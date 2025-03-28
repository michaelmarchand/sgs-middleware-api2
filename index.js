const express = require("express");
require("dotenv").config();

const students = require("./api/students");

const app = express();
app.use(express.json());

// Mount the route from students.js
app.use("/", students);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`✅ Server is running on port ${PORT}`);
});