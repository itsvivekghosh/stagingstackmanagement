/* eslint-disable */
import React, { Component } from "react";
import EmployeeServices from "../../Services/EmployeeServices";
import InstanceServices from "../../Services/InstanceServices";
import TeamsServices from "../../Services/TeamsServices";

function getQueryVariable(variable) {
  var query = window.location.search.substring(1);
  var vars = query.split("&");

  for (var i = 0; i < vars.length; i++) {
    var pair = vars[i].split("=");
    if (pair[0] === variable) {
      return pair[1];
    }
  }
  return null;
}

export class OccupyInstance extends Component {
  constructor(props) {
    super(props);
    this.state = {
      instanceId: this.props.match.params.instanceId,
      instanceReason: "",
      instance: {},
      teams: [],
      selectedEmployeeId: 0,
      selectedTeamId: 0,
      isTeamSeleted: false,
      isEmployeeSelected: false,
      employees: [],
    };

    this.employeeSelectorHandler = this.employeeSelectorHandler.bind(this);
    this.teamSelectionHandler = this.teamSelectionHandler.bind(this);
  }

  componentDidMount() {
    InstanceServices.getInstance(this.state.instanceId)
      .then((res) => {
        this.setState({
          instance: res.data,
        });
      })
      .catch((err) => console.log(err));

    TeamsServices.getTeams()
      .then((res) => {
        this.setState({
          teams: res.data,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  instanceReasonChangeHandler = (event) => {
    this.setState({
      instanceReason: event.target.value,
    });
  };

  teamSelectionHandler = (event) => {
    this.setState({
      selectedTeamId: event.target.value,
      isTeamSeleted: event.target.value === 0 ? false : true,
    });

    if (event.target.value !== 0) {
      EmployeeServices.getEmployees()
        .then((res) => {
          this.setState({
            employees: res.data,
          });
        })
        .catch((err) => console.log(err));
    } else {
      // todo
    }
  };

  employeeSelectorHandler = (event) => {
    this.setState({
      selectedEmployeeId: event.target.value,
      isEmployeeSelected:
        event.target.value === 0 || this.state.isTeamSeleted === 0
          ? false
          : true,
    });
  };

  cancel() {
    this.props.history.push("/instances");
  }

  updateOccupyInstanceHandler = (event) => {
    event.preventDefault();
    let employeesList = this.state.employees;
    let employee = employeesList.find(
      (employee) =>
        employee.employeeId.toString() ===
        this.state.selectedEmployeeId.toString()
    );

    let teamsList = this.state.teams;
    let team = teamsList.find(
      (team) => team.teamId.toString() === this.state.selectedTeamId.toString()
    );

    let finalObject = {
      employeeId: employee.employeeId,
      employeeLastName: employee.employeeLastName,
      employeeFirstName: employee.employeeFirstName,
      employeeMobileNumber: employee.employeeMobileNumber,
      team: {
        teamId: team.teamId,
        teamName: team.teamName,
        teamDescription: team.teamDescription,
      },
    };

    InstanceServices.occupyInstance(
      finalObject,
      this.state.instanceId,
      this.state.instanceReason
    )
      .then((_) => {
        console.log("Success!");
        this.props.history.push("/instances");
      })
      .catch((err) => console.log(err));
  };

  render() {
    const { teams, employees, instance, selectedTeamId } = this.state;
    return (
      <div className="container">
        {instance.isInstanceAvailable === false ? (
          <div className="text-center">Instance is already in use!</div>
        ) : (
          <div className="row">
            <div className="card col-md-6 offset-md-3 offset-md-3">
              <h3 className="text-center">Occupy Instance</h3>
              <div className="card-body">
                <form>
                  <div className="form-group">
                    <label>Instance Name:</label>
                    <input
                      placeholder="Instance Reason"
                      name="instanceReason"
                      className="form-control"
                      value={this.state.instanceReason}
                      onChange={this.instanceReasonChangeHandler}
                    ></input>
                  </div>
                  <div style={{ paddingTop: "12px" }}>
                    <label>Which Team are you in?</label>
                    <select
                      className="form-control"
                      onChange={this.teamSelectionHandler}
                      value={this.state.selectedTeamId}
                      required
                    >
                      <option key={0} value={0}>
                        ------- SELECT YOUR TEAM --------
                      </option>
                      {teams &&
                        teams.map((team) => {
                          return (
                            <option key={team.teamId} value={team.teamId}>
                              {team.teamName}
                            </option>
                          );
                        })}
                    </select>
                  </div>
                  {this.state.isTeamSeleted ? (
                    <div>
                      <div style={{ paddingTop: "12px" }}>
                        <label>Select Your Name</label>
                        <select
                          className="form-control"
                          onChange={this.employeeSelectorHandler}
                          value={this.state.selectedEmployeeId}
                          required
                        >
                          <option key={0}>
                            ------- SELECT YOUR NAME --------
                          </option>
                          {employees &&
                            employees
                              .filter(function (el) {
                                return el.team.teamId == selectedTeamId;
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
                  ) : (
                    <div></div>
                  )}
                  <div style={{ paddingTop: "10px" }}>
                    <button
                      className={
                        this.state.isEmployeeSelected
                          ? `btn btn-success`
                          : "btn btn-success disabled"
                      }
                      onClick={this.updateOccupyInstanceHandler}
                    >
                      Occupy Instance
                    </button>
                    <button
                      className={
                        this.state.isEmployeeSelected
                          ? `btn btn-danger`
                          : "btn btn-danger disabled"
                      }
                      onClick={this.cancel.bind(this)}
                      style={{ marginLeft: "10px" }}
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        )}
      </div>
      //   select * from employee JOIN team ON team.team_id = employee.team_team_id where team.team_id = 1;
    );
  }
}

export default OccupyInstance;
