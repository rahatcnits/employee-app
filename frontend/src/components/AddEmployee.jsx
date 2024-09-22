import React, { useEffect, useState } from "react";
import { createEmployee, updateEmployeeById } from "../api";
import { notify } from "../utils";

const AddEmployee = ({
  showModal,
  setShowModal,
  fetchEmployee,
  updateEmpObj,
}) => {
  const [employee, setEmployee] = useState({
    name: "",
    email: "",
    phone: "",
    department: "",
    salary: "",
    profileImage: null,
  });

  const [updateMode, setUpdateMode] = useState(false);

  useEffect(() => {
    if (updateEmpObj) {
      setUpdateMode(true);
      setEmployee(updateEmpObj);
    }
  }, [updateEmpObj]);

  const resetEmployeeStates = () => {
    setEmployee({
      name: "",
      email: "",
      phone: "",
      department: "",
      salary: "",
      profileImage: null,
    });
  };

  const handleClose = () => {
    setShowModal(false);
    setUpdateMode(false);
    resetEmployeeStates();
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEmployee({
      ...employee,
      [name]: value,
    });
  };

  const handleFileChange = (e) => {
    setEmployee({
      ...employee,
      profileImage: e.target.files[0],
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { success, message } = updateMode
        ? await updateEmployeeById(employee, employee._id)
        : await createEmployee(employee);
      console.log(success, message);
      if (success) {
        notify(message, "success");
      } else {
        notify(message, "error");
      }
      setShowModal(false);
      resetEmployeeStates();
      fetchEmployee();
      setUpdateMode(false);
    } catch (error) {
      notify("Failed to create employee, try again later", "error");
    }
  };

  return (
    <div
      className={`modal ${showModal ? "d-block" : ""}`}
      role="dialog"
      tabIndex={-1}
      style={{ display: showModal ? "block" : "none" }}
    >
      <div className="modal-dialog" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5>{updateMode ? "Update Employee" : "Add Employee"}</h5>
            <button
              className="btn-close"
              type="button"
              onClick={() => {
                handleClose();
              }}
            ></button>
          </div>

          <div className="modal-body">
            <form
              onSubmit={(e) => {
                handleSubmit(e);
              }}
            >
              <div className="mb-3">
                <label className="form-label">Name</label>
                <input
                  type="text"
                  className="form-control"
                  name="name"
                  value={employee.name}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Email</label>
                <input
                  type="email"
                  className="form-control"
                  name="email"
                  value={employee.email}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Phone</label>
                <input
                  type="text"
                  className="form-control"
                  name="phone"
                  value={employee.phone}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Department</label>
                <input
                  type="text"
                  className="form-control"
                  name="department"
                  value={employee.department}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Salary</label>
                <input
                  type="text"
                  className="form-control"
                  name="salary"
                  value={employee.salary}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Profile Image</label>
                <input
                  type="file"
                  className="form-control"
                  name="profileImage"
                  onChange={handleFileChange}
                />
              </div>

              <button type="submit" className="btn btn-primary">
                {updateMode ? "Update" : "Save"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddEmployee;
