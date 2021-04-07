import React, { Component } from "react";
import EmployeeServices from "../../Services/EmployeeServices";
import InstanceServices from "../../Services/InstanceServices";

export class UpdateInstance extends Component {
  constructor(props) {
    super(props);

    this.state = {
      instanceId: this.props.match.params.instanceId,
      employee: {},
      instance: {},
      employees: [],
      instanceName: "",
      instanceDescription: "",
      instanceReason: "",
      selectedEmployeeId: 0,
    };

    this.instanceNameHandler = this.instanceNameHandler.bind(this);
    this.instanceDescriptionHandler = this.instanceDescriptionHandler.bind(
      this
    );
    this.instanceReasonHandler = this.instanceReasonHandler.bind(this);
  }

  componentDidMount() {
    InstanceServices.getInstance(this.state.instanceId)
      .then((res) => {
        let data = res.data;
        let t = data.employee;
        this.setState({
          instance: data,
          employee: data.employee,
          instanceName: data.instanceName,
          instanceDescription: data.instanceDescription,
          instanceReason: data.instanceReason,
          selectedEmployeeId: t.employeeId,
        });
      })
      .catch((err) => console.log(err));

    EmployeeServices.getEmployees()
      .then((res) => {
        this.setState({
          employees: res.data,
        });
      })
      .catch((err) => console.log(err));
  }

  instanceDescriptionHandler = (event) => {
    this.setState({
      instanceDescription: event.target.value,
    });
  };

  instanceNameHandler = (event) => {
    this.setState({
      instanceName: event.target.value,
    });
  };

  instanceReasonHandler = (event) => {
    this.setState({
      instanceReason: event.target.value,
    });
  };

  updateInstanceHandler = (event) => {
    event.preventDefault();
    let employeesList = this.state.employees;
    let finalEmployee = employeesList.find(
      (employee) =>
        employee.employeeId.toString() ===
        this.state.selectedEmployeeId.toString()
    );

    let data = this.state;
    let instanceObject = {
      instanceName: data.instanceName,
      instanceDescription: data.instanceDescription,
      instanceReason: data.instanceReason,
      employee: finalEmployee,
    };

    InstanceServices.updateInstance(this.state.instanceId, instanceObject)
      .then((_) => {
        this.props.history.push("/instances");
      })
      .catch((err) => console.log(err));
  };

  employeeSelectHandler = (event) => {
    this.setState({
      selectedEmployeeId: event.target.value,
    });
  };
  cancel() {
    this.props.history.push("/instances");
  }

  render() {
    let emps = this.state.employees;
    return (
      <div className="container">
        <div className="row">
          <div className="card col-md-6 offset-md-3 offset-md-3">
            <h3 className="text-center">Update Instance</h3>
            <div className="card-body">
              <form>
                <div className="form-group">
                  <label> Instance Name: </label>
                  <input
                    placeholder="Instance Name"
                    name="instanceName"
                    className="form-control"
                    value={this.state.instanceName}
                    onChange={this.instanceNameHandler}
                  />
                </div>
                <div className="form-group">
                  <label> Instance Description: </label>
                  <input
                    placeholder="Instance Description"
                    name="instanceDescription"
                    className="form-control"
                    value={this.state.instanceDescription}
                    onChange={this.instanceDescriptionHandler}
                  />
                </div>
                <div className="form-group">
                  <label> Instance Reason: </label>
                  <input
                    placeholder="Instance Reason"
                    name="instanceReason"
                    className="form-control"
                    value={this.state.instanceReason}
                    onChange={this.instanceReasonHandler}
                  />
                </div>
                <br />
                <div>
                  <h6 className="text-center">Employee</h6>
                </div>
                <div>
                  <label>Assign Employee:</label>
                  <select
                    className="form-control"
                    onChange={this.employeeSelectHandler}
                    value={this.state.selectedEmployeeId}
                    required
                  >
                    <option key={0}>-------SELECT INSTANCE--------</option>
                    {emps &&
                      emps.map((emp) => {
                        return (
                          <option key={emp.employeeId} value={emp.employeeId}>
                            {emp.employeeFirstName + " " + emp.employeeLastName}
                          </option>
                        );
                      })}
                  </select>
                </div>
                <br />
                <button
                  className="btn btn-success"
                  onClick={this.updateInstanceHandler}
                >
                  Update
                </button>
                <button
                  className="btn btn-danger"
                  onClick={this.cancel.bind(this)}
                  style={{ marginLeft: "10px" }}
                >
                  Cancel
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default UpdateInstance;
