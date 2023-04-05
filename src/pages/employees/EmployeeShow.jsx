
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getEmployeeById } from "../../services/EmployeeService";

function EmployeeShow() {
  const { id } = useParams();
  
  const employeeId = parseInt(id, 10);
  const [employee, setEmployee] = useState({});

  const [employeeError, setEmployeeError] = useState();

  useEffect(() => {
    // Verify that employeeId is a valid number
    if (isNaN(employeeId)) {
      setEmployeeError("Invalid employee ID");
      return;
    }

    reloadEmployee(employeeId);
  }, [employeeId]);
  const reloadEmployee = async (id) => {
    try {
      const employee = await getEmployeeById(id);
      setEmployee(employee);
    } catch (error) {
      console.error(error);
      setEmployeeError(error);
    }
  };

  const navigation = useNavigate();

  return (
    <div className="card">
      <div className="card-body">
        {employeeError ? (
          <div>
            <h2>Something is wrong, notify your System Administrator</h2>
          </div>
        ) : (
          <div className="row p-2">
            <div className="col-md-4 px-4 py-2">
              <button
                className="btn btn-outline-light border pl-5"
                onClick={() => navigation(-1)}
              >
                &nbsp;&nbsp;Voltar&nbsp;&nbsp;
              </button>
              <div className="card-body">
                <img
                  src="https://png.pngtree.com/png-vector/20190710/ourmid/pngtree-user-vector-avatar-png-image_1541962.jpg"
                  alt=""
                  width="100"
                  height="100"
                />
              </div>
            </div>
            <div className="col-md-4 py-2">
              <div className="card bg-primary text-white">
                <div className="card-header text-center">
                  <h4 className="card-text">Employee</h4>
                </div>
                <div className="card-body">
                  <form>
                    <div className="form-group">
                      <label
                        htmlFor="name"
                        className="form-control-label"
                      >
                        Name
                      </label>
                      <span className="form-control" name="name">
                        {employee?.name}
                      </span>
                    </div>
                    <div className="form-group">
                      <label
                        htmlFor="name"
                        className="form-control-label"
                      >
                        Position
                      </label>
                      <span className="form-control" name="name">
                        {employee?.position}
                      </span>
                    </div>
                  </form>
                </div>
              </div>
            </div>
            <div className="col-md-4 py-2"></div>
          </div>
        )}
      </div>
    </div>
  );
}





export default EmployeeShow;