import React, { Component } from "react";
import EmployeeServices from "../../Services/EmployeeServices";
import InstanceServices from "../../Services/InstanceServices";

export default class AddInstance extends Component {
  constructor(props) {
    super(props);

    this.state = {
      instanceName: "",
      instanceDescription: "",
      instanceReason: "",
      employee: {},
      employees: [],
      employeeIdSelect: 0,
    };

    this.instanceNameHandler = this.instanceNameHandler.bind(this);
    this.instanceDescriptionHandler = this.instanceDescriptionHandler.bind(
      this
    );
    this.instanceReasonHandler = this.instanceReasonHandler.bind(this);
    this.employeeSelectHandler = this.employeeSelectHandler.bind(this);
  }

  componentDidMount() {
    EmployeeServices.getEmployees()
      .then((res) => {
        this.setState({
          employees: res.data,
        });
      })
      .catch((err) => console.log(err));
  }

  employeeSelectHandler = (event) => {
    this.setState({ employeeIdSelect: event.target.value });
  };

  instanceNameHandler = (event) => {
    this.setState({
      instanceName: event.target.value,
    });
  };
  instanceDescriptionHandler = (event) => {
    this.setState({
      instanceDescription: event.target.value,
    });
  };
  instanceReasonHandler = (event) => {
    this.setState({
      instanceReason: event.target.value,
    });
  };
  cancel = (_) => {
    this.props.history.push("/instances");
  };
  saveInstanceHandler = (event) => {
    event.preventDefault();
    let employeesList = this.state.employees;

    const finalEmployee = employeesList.find(
      (employee) =>
        employee.employeeId.toString() ===
        this.state.employeeIdSelect.toString()
    );

    const instanceObject = {
      instanceName: this.state.instanceName,
      instanceDescription: this.state.instanceDescription,
      instanceReason: this.state.instanceReason,
      employee: finalEmployee,
    };

    InstanceServices.addInstance(instanceObject)
      .then((_) => this.props.history.push(`/instances`))
      .catch((err) => console.log(err));
  };
  render() {
    return (
      <div>
        <div>
          <div className="container">
            <div className="row">
              <div className="card col-md-6 offset-md-3 offset-md-3">
                <h4 className="text-center" style={{ marginTop: "30px" }}>
                  Add Instance
                </h4>
                <div className="card-body">
                  <form>
                    <div className="form-group" style={{ marginTop: "10px" }}>
                      <label>Instance Name:</label>
                      <input
                        required
                        type="text"
                        placeholder="Instance Name"
                        name="instanceName"
                        className="form-control"
                        value={this.state.instanceName}
                        onChange={this.instanceNameHandler}
                      ></input>
                    </div>
                    <div className="form-group" style={{ marginTop: "10px" }}>
                      <label>Instance Description:</label>
                      <input
                        required
                        type="text"
                        placeholder="Instance Description"
                        name="instanceDescription"
                        className="form-control"
                        value={this.state.instanceDescription}
                        onChange={this.instanceDescriptionHandler}
                      ></input>
                    </div>
                    <div className="form-group" style={{ marginTop: "10px" }}>
                      <label>Instance Reason:</label>
                      <input
                        required
                        type="text"
                        placeholder="Instance Reason"
                        name="instanceReason"
                        className="form-control"
                        value={this.state.instanceReason}
                        onChange={this.instanceReasonHandler}
                      ></input>
                    </div>
                    <div style={{ marginTop: "20px" }}>
                      <label>Employee Description:</label>
                      <select
                        className="form-control"
                        onChange={this.employeeSelectHandler}
                        value={this.state.employeeIdSelect}
                        required
                      >
                        <option key={0}>-------select--------</option>
                        {this.state.employees &&
                          this.state.employees.map((employee) => {
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
                    <br />
                    <input
                      type="button"
                      className="btn btn-success"
                      value="Create Instance"
                      onClick={this.saveInstanceHandler}
                    ></input>
                    <input
                      type="button"
                      className="btn btn-danger"
                      style={{ marginLeft: "10px" }}
                      value="Cancel"
                      onClick={this.cancel}
                    ></input>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
