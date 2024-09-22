import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getEmployeeById } from "../api";
import { notify } from "../utils";

const EmployeeDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [empDetails, setEmpDetails] = useState({});

  const fetchEmpById = async () => {
    try {
      const { data } = await getEmployeeById(id);
      setEmpDetails(data);
    } catch (error) {
      notify("Failed to fetch employee, try again later", "error");
    }
  };

  useEffect(() => {
    fetchEmpById();
  }, [id]);

  return (
    <div className="container mt-5">
      <div className="card">
        <div className="card-header">
          <h2>Employee Details</h2>
        </div>

        <div className="card-body">
          <div className="row">
            <div className="col-md-4">
              <img
                src={empDetails["profileImage"]}
                alt={empDetails["name"]}
                className="img-fluid rounded"
              />
            </div>

            <div className="col-md-8">
              <h4>{empDetails["name"]}</h4>
              <p>
                Email: <strong>{empDetails["email"]}</strong>
              </p>
              <p>
                Phone: <strong>{empDetails["phone"]}</strong>
              </p>
              <p>
                Department: <strong>{empDetails["department"]}</strong>
              </p>
              <p>
                Salary: <strong>{empDetails["salary"]}</strong>
              </p>
            </div>
          </div>

          <button
            type="button"
            className="btn btn-primary"
            onClick={() => navigate("/employee")}
          >
            Back
          </button>
        </div>
      </div>
    </div>
  );
};

export default EmployeeDetails;
