const EmployeeModel = require("../models//EmployeeModel");

exports.createEmployee = async (req, res) => {
  try {
    const reqBody = req.body;
    const profileImage = req.file ? req.file?.path : null;
    reqBody.profileImage = profileImage;
    const emp = new EmployeeModel(reqBody);
    await emp.save();
    res
      .status(201)
      .json({ message: "Employee Created Successfully", success: true });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal server error", success: false, error: error });
  }
};

exports.updateEmployee = async (req, res) => {
  try {
    const { name, email, phone, department, salary } = req.body;
    const { id } = req.params;

    let updateData = {
      name,
      email,
      phone,
      department,
      salary,
    };

    if (req.file) {
      updateData.profileImage = req.file.path;
    }

    const updateEmployee = await EmployeeModel.findByIdAndUpdate(
      id,
      updateData,
      { new: true }
    );

    if (!updateEmployee) {
      return res.status(404).json({ message: "Employee Not Found" });
    }

    res.status(201).json({
      message: "Employee Updated Successfully",
      success: true,
      data: updateEmployee,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal server error", success: false, error: error });
  }
};

exports.getAllEmployee = async (req, res) => {
  try {
    let { page, limit, search } = req.query;

    page = parseInt(page) || 1;
    limit = parseInt(limit) || 5;

    const skip = (page - 1) * limit;

    let searchCriteria = {};

    if (search) {
      searchCriteria = {
        name: {
          $regex: search,
          $options: "i", // case insensitive
        },
      };
    }

    const totalEmployee = await EmployeeModel.countDocuments(searchCriteria);

    const emps = await EmployeeModel.find(searchCriteria)
      .skip(skip)
      .limit(limit)
      .sort({ updatedAt: -1 });

    const totalPages = Math.ceil(totalEmployee / limit);

    res.status(201).json({
      message: "All Employee",
      success: true,
      data: {
        employee: emps,
        pagination: {
          totalEmployee,
          currentPage: page,
          totalPages,
          pageSize: limit,
        },
      },
    });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ message: "Internal server error", success: false, error: error });
  }
};

exports.getEmployeeById = async (req, res) => {
  try {
    const { id } = req.params;
    const emp = await EmployeeModel.findOne({ _id: id });
    res.status(201).json({
      message: "Employee Details",
      success: true,
      data: emp,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal server error", success: false, error: error });
  }
};

exports.deleteEmployeeById = async (req, res) => {
  try {
    const { id } = req.params;
    await EmployeeModel.findByIdAndDelete({ _id: id });
    res.status(201).json({
      message: "Employee Deleted",
      success: true,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal server error", success: false, error: error });
  }
};
