import React, { Component } from "react";
import InstanceServices from "../../Services/InstanceServices";
import Pagination from "../OtherComponents/Pagination";

export default class ListInstances extends Component {
  constructor(props) {
    super(props);

    this.state = {
      instances: [],
      currentPage: 1,
      postsPerPage: 5,
      sortBy: "createdOn",
    };
    this.addInstanceHandler = this.addInstanceHandler.bind(this);
    this.handleEmployeeUpdate = this.handleEmployeeUpdate.bind(this);
    this.handleEmployeeDelete = this.handleEmployeeDelete.bind(this);
    this.handleEmployeeView = this.handleEmployeeView.bind(this);
    this.instanceHandler = this.instanceHandler.bind(this);
  }

  componentDidMount() {
    InstanceServices.getInstances()
      .then((res) =>
        this.setState({
          instances: res.data,
        })
      )
      .catch((err) => console.log(err));
  }

  addInstanceHandler() {
    this.props.history.push(`/instances/add`);
  }

  handleEmployeeView = (id) => {
    this.props.history.push(`/instances/${id}`);
  };

  handleEmployeeUpdate = (id) => {
    this.props.history.push(`/instances/${id}/update`);
  };

  handleEmployeeDelete = (id, name) => {
    var res = window.confirm(
      `Are you sure you want to delete this ${name} Instance?`
    );
    if (res === true) {
      InstanceServices.deleteInstance(id)
        .then((res) => {
          this.props.history.push(`/instances`);
        })
        .catch();
    } else {
      // todo Code
    }
    window.location.reload(false);
  };

  instanceHandler = (instanceId, isInstanceAvailable) => {
    if (isInstanceAvailable === true) {
      // occupying instance
      this.props.history.push("/occupy-instance/" + instanceId);
    } else {
      // freeing instance
      this.props.history.push("/free-instance/" + instanceId);
    }
  };
  render() {
    const { currentPage, postsPerPage } = this.state;
    const indexOfLastPost = currentPage * postsPerPage;
    const indexOfFirstPost = indexOfLastPost - postsPerPage;
    const currentInstances = this.state.instances.slice(
      indexOfFirstPost,
      indexOfLastPost
    );

    const paginate = (pageNumber) => {
      this.setState({
        currentPage: pageNumber,
      });
    };

    const getButtonView = (view, status) => {
      if (status === false) {
        return `btn btn-${view}`;
      } else {
        return `btn btn-${view} disabled`;
      }
    };

    return (
      <div>
        <h2 className="text-center mainHeading">Instances List</h2>
        <div className="row">
          <button className="btn btn-primary" onClick={this.addInstanceHandler}>
            Add Instance
          </button>
        </div>
        <div className="row" style={{ marginTop: "20px" }}>
          <table className="table table-stripped table-bordered">
            <thead>
              <tr>
                <th className="text-center">Instance ID</th>
                <th className="text-center">Instance Name</th>
                <th className="text-center">Instance Created On</th>
                <th className="text-center">Instance Status</th>
                <th className="text-center">Taken By</th>
                <th className="text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {currentInstances.map((i) => {
                return (
                  <tr key={i.instanceId}>
                    <td>{i.instanceId}</td>
                    <td>{i.instanceName}</td>
                    <td>{i.createdOn}</td>
                    <td>
                      {i.isInstanceAvailable === false
                        ? "Instance In Use"
                        : "Instance Free"}
                    </td>
                    <td className="text-center">
                      {i.employee
                        ? i.employee.employeeFirstName +
                          " " +
                          i.employee.employeeLastName
                        : "-"}
                    </td>
                    <td className="text-center">
                      <button
                        className={getButtonView(
                          "primary",
                          i.isInstanceAvailable
                        )}
                        onClick={() => this.handleEmployeeView(i.instanceId)}
                      >
                        View
                      </button>
                      <button
                        className={getButtonView(
                          "warning",
                          i.isInstanceAvailable
                        )}
                        onClick={() => this.handleEmployeeUpdate(i.instanceId)}
                        style={{ marginLeft: "30px" }}
                      >
                        Update
                      </button>
                      <button
                        className={getButtonView(
                          "danger",
                          i.isInstanceAvailable
                        )}
                        onClick={() =>
                          this.handleEmployeeDelete(
                            i.instanceId,
                            i.instanceName
                          )
                        }
                        style={{ marginLeft: "30px" }}
                      >
                        Delete
                      </button>
                      <button
                        className={"btn btn-outline-success"}
                        onClick={() =>
                          this.instanceHandler(
                            i.instanceId,
                            i.isInstanceAvailable
                          )
                        }
                        style={{ marginLeft: "30px" }}
                      >
                        {!i.isInstanceAvailable
                          ? "Free Instance"
                          : "Occupy Instance"}
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        <div style={{ position: "absolute", bottom: "-200px", left: "800px" }}>
          <Pagination
            postsPerPage={postsPerPage}
            totalPosts={this.state.instances.length}
            paginate={paginate}
          />
        </div>
      </div>
    );
  }
}
