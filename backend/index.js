const express = require("express");
const dotenv = require("dotenv");
dotenv.config();
const mongoose = require("mongoose");
const cors = require("cors");
const router = require("./src/routes/EmployeeRoutes");
const app = express();

const PORT = process.env.PORT || 5050;
const MONGO_URL = process.env.MONGO_URL;

// Database Connect
mongoose
  .connect(MONGO_URL)
  .then(() => {
    console.log("Database Connected Successfully");
  })
  .catch((err) => {
    console.log("Database Connected Failed - ", err);
  });

app.use(express.json());
app.use(cors());

app.use("/api/employee", router);

app.listen(PORT, () => {
  console.log(`Server is running at port ${PORT}`);
});
