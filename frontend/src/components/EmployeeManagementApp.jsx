import { useEffect, useState } from "react";
import { ToastContainer } from "react-toastify";
import { deleteEmployeeById, getAllEmployees } from "../api";
import { notify } from "../utils";
import AddEmployee from "./AddEmployee";
import EmployeeTable from "./EmployeeTable";

const EmployeeManagementApp = () => {
  const [showModal, setShowModal] = useState(false);
  const [updateEmpObj, setUpdateEmpObj] = useState(null);
  const [employeeData, setEmployeeData] = useState({
    employee: [],
    pagination: {
      totalEmployee: 0,
      currentPage: 1,
      totalPages: 3,
      pageSize: 5,
    },
  });

  const fetchEmployee = async (search = "", page = 1, limit = 5) => {
    try {
      const { data } = await getAllEmployees(search, page, limit);
      setEmployeeData(data);
    } catch (error) {
      console.log("Error ", error);
    }
  };

  useEffect(() => {
    fetchEmployee();
  }, []);

  const handleAddEmployee = () => {
    setShowModal(true);
  };

  const handleUpdateEmployee = (empObj) => {
    setUpdateEmpObj(empObj);
    setShowModal(true);
  };

  const handleDeleteEmployee = async (emp) => {
    try {
      const { success, message } = await deleteEmployeeById(emp._id);
      if (success) {
        notify(message, "success");
      } else {
        notify(message, "error");
      }
      fetchEmployee();
    } catch (error) {
      notify("Employee Delete Fail", "error");
    }
  };

  const handleSearch = (e) => {
    const term = e.target.value;
    fetchEmployee(term);
  };

  return (
    <div className="d-flex flex-column justify-content-center align-items-center w-100 p-3">
      <h1 className="mb-4">Employee Management App</h1>

      <div className="w-100 d-flex justify-content-center">
        <div
          className="w-80 border rounded bg-light p-3"
          style={{ width: "80%" }}
        >
          <div className="d-flex justify-content-between mb-3">
            <button
              className="btn btn-primary"
              onClick={() => {
                handleAddEmployee();
              }}
            >
              Add
            </button>
            <input
              onChange={handleSearch}
              type="text"
              placeholder="Search Employee..."
              className="form-control w-50"
            />
          </div>

          <EmployeeTable
            handleUpdateEmployee={handleUpdateEmployee}
            handleDeleteEmployee={handleDeleteEmployee}
            fetchEmployee={fetchEmployee}
            employee={employeeData.employee}
            pagination={employeeData.pagination}
          />

          <AddEmployee
            updateEmpObj={updateEmpObj}
            fetchEmployee={fetchEmployee}
            showModal={showModal}
            setShowModal={setShowModal}
          />

          <ToastContainer
            position="top-right"
            autoClose={3000}
            hideProgressBar={false}
          />
        </div>
      </div>
    </div>
  );
};

export default EmployeeManagementApp;
