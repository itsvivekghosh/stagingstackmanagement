import React, { Component } from "react";
import EmployeeServices from "../../Services/EmployeeServices";
import Pagination from "../OtherComponents/Pagination";

export default class ListEmployees extends Component {
  constructor(props) {
    super(props);

    this.state = {
      employees: [],
      currentPage: 1,
      postsPerPage: 10,
      sortBy: "createdOn",
    };
  }

  componentDidMount() {
    EmployeeServices.getEmployees()
      .then((res) => {
        this.setState({
          employees: res.data,
        });
      })
      .catch((err) => {
        console.log(err);
      });

    this.addEmployeeHandler = this.addEmployeeHandler.bind(this);
    this.handleEmployeeView = this.handleEmployeeView.bind(this);
    this.handleEmployeeUpdate = this.handleEmployeeUpdate.bind(this);
  }

  addEmployeeHandler() {
    console.log();
    this.props.history.push("/employees/add");
  }

  handleEmployeeView(id) {
    this.props.history.push(`/employees/${id}`);
  }

  handleEmployeeUpdate(id) {
    this.props.history.push(`/employees/${id}/update`);
  }

  handleEmployeeDelete(id, name) {
    var res = window.confirm(
      `Are you sure you want to delete this ${name} Employee?`
    );
    if (res === true) {
      EmployeeServices.deleteEmployee(id)
        .then((res) => {
          this.props.history.push("/employees");
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      // some code
    }
    window.location.reload(false);
  }

  render() {
    const { currentPage, postsPerPage } = this.state;
    const indexOfLastPost = currentPage * postsPerPage;
    const indexOfFirstPost = indexOfLastPost - postsPerPage;
    const currentInstances = this.state.employees.slice(
      indexOfFirstPost,
      indexOfLastPost
    );

    const paginate = (pageNumber) => {
      this.setState({
        currentPage: pageNumber,
      });
    };
    return (
      <div>
        <h2 className="text-center">Employees List</h2>
        <div className="row">
          <button className="btn btn-primary" onClick={this.addEmployeeHandler}>
            Add Employee
          </button>
        </div>
        <div className="row" style={{ marginTop: "20px" }}>
          <table className="table table-stripped table-bordered">
            <thead>
              <tr>
                <th>Employee ID</th>
                <th>Employee First Name</th>
                <th>Employee Last Name</th>
                <th>Employee Mobile Number</th>
                <th>Team Name</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {currentInstances.map((employee) => {
                return (
                  <tr key={employee.employeeId}>
                    <td>{employee.employeeId}</td>
                    <td>{employee.employeeFirstName}</td>
                    <td>{employee.employeeLastName}</td>
                    <td>{employee.employeeMobileNumber}</td>
                    <td>{employee.team.teamName}</td>
                    <td className="text-center">
                      <button
                        className="btn btn-primary"
                        onClick={() =>
                          this.handleEmployeeView(employee.employeeId)
                        }
                      >
                        View
                      </button>
                      <button
                        className="btn btn-warning"
                        onClick={() =>
                          this.handleEmployeeUpdate(employee.employeeId)
                        }
                        style={{ marginLeft: "30px" }}
                      >
                        Update
                      </button>
                      <button
                        className="btn btn-danger"
                        onClick={() =>
                          this.handleEmployeeDelete(
                            employee.employeeId,
                            employee.employeeFirstName
                          )
                        }
                        style={{ marginLeft: "30px" }}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          <div
            style={{ position: "absolute", bottom: "-200px", right: "50px" }}
          >
            <Pagination
              postsPerPage={postsPerPage}
              totalPosts={this.state.employees.length}
              paginate={paginate}
            />
          </div>
        </div>
      </div>
    );
  }
}
