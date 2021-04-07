import React, { Component } from "react";
import EmployeeServices from "../../Services/EmployeeServices";
import InstanceServices from "../../Services/InstanceServices";

export class FreeInstance extends Component {
  constructor(props) {
    super(props);

    this.state = {
      instanceId: this.props.match.params.instanceId,
      employees: [],
      selectedEmployeeId: 0,
      employee: {},
      instance: {},
    };

    this.employeeSelectorHandler = this.employeeSelectorHandler.bind(this);
  }

  componentDidMount() {
    EmployeeServices.getEmployees()
      .then((res) => {
        this.setState({
          employees: res.data,
        });
      })
      .catch((err) => console.log(err));

    InstanceServices.getInstance(this.state.instanceId).then((res) => {
      this.setState({
        instance: res.data,
      });
    });
  }

  employeeSelectorHandler = (event) => {
    this.setState({
      selectedEmployeeId: event.target.value,
    });
  };

  cancel() {
    this.props.history.push("/instances");
  }

  freeInstanceHandler = (event) => {
    event.preventDefault();
    let employeesList = this.state.employees;
    let employee = employeesList.find(
      (employee) =>
        employee.employeeId.toString() ===
        this.state.selectedEmployeeId.toString()
    );

    InstanceServices.freeInstance(this.state.instanceId, employee)
      .then((_) => {
        console.log("Success!");
        this.props.history.push("/instances");
      })
      .catch((err) => console.log(err));
  };

  render() {
    const { employees, instance } = this.state;
    return (
      <div className="container row">
        <h6 className="mainHeading text-center">Free Instance</h6>
        <div className="card col-md-6 offset-md-3">
          <div className="card-body">
            <form>
              <div className="form-group">
                <div style={{ paddingTop: "12px" }}>
                  <label>Select Your Name</label>
                  <select
                    className="form-control"
                    onChange={this.employeeSelectorHandler}
                    value={this.state.selectedEmployeeId}
                    required
                  >
                    <option key={0}>------- SELECT YOUR NAME --------</option>
                    {employees &&
                      employees
                        .filter(function (el) {
                          return el.employeeId === instance.employee.employeeId;
                        })
                        .map((employee) => {
                          return (
                            <option
                              key={employee.employeeId}
                              value={employee.employeeId}
                            >
                              {employee.employeeFirstName +
                                " " +
                                employee.employeeLastName}
                            </option>
                          );
                        })}
                  </select>
                </div>
              </div>
              <br />
              <button
                className="btn btn-success"
                onClick={this.freeInstanceHandler.bind(this)}
              >
                Free Instance
              </button>
              <button
                className="btn btn-danger"
                style={{ marginLeft: "12px" }}
                onClick={this.cancel.bind(this)}
              >
                Cancel
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default FreeInstance;
