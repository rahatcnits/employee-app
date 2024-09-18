const express = require("express");
const EmployeeController = require("../controllers/EmployeeController");
const { cloudinaryFileUploader } = require("../middlewares/FileUploader");

const router = express.Router();

router.get("/", (req, res) => {
  res.send("Employee");
});

router.post(
  "/createEmployee",
  cloudinaryFileUploader.single("profileImage"),
  EmployeeController.createEmployee
);

module.exports = router;
