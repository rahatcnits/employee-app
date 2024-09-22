const express = require("express");
const EmployeeController = require("../controllers/EmployeeController");
const { cloudinaryFileUploader } = require("../middlewares/FileUploader");

const router = express.Router();

router.get("/", EmployeeController.getAllEmployee);
router.post(
  "/",
  cloudinaryFileUploader.single("profileImage"),
  EmployeeController.createEmployee
);
router.put(
  "/:id",
  cloudinaryFileUploader.single("profileImage"),
  EmployeeController.updateEmployee
);
router.get("/:id", EmployeeController.getEmployeeById);
router.delete("/:id", EmployeeController.deleteEmployeeById);

module.exports = router;
