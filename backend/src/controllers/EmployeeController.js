const EmployeeModel = require("../models//EmployeeModel");

exports.createEmployee = async (req, res) => {
  try {
    const reqBody = req.body;
    const profileImage = req.file ? req.file?.path : null;
    reqBody.profileImage = profileImage;
    console.log(reqBody);
    const emp = new EmployeeModel(reqBody);
    await emp.save();
    res
      .status(201)
      .json({ message: "Employee Created Successfully", status: true });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal server error", status: false, error: error });
  }
};
