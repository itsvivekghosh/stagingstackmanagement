import React, { Component } from "react";
import InstanceHistoryService from "../../Services/InstanceHistoryService";
import Pagination from "../OtherComponents/Pagination";

export class InstancesHistory extends Component {
  constructor(props) {
    super(props);

    this.state = {
      histories: [],
      currentPage: 1,
      postsPerPage: 10,
      sortBy: "createdOn",
    };
  }

  componentDidMount() {
    InstanceHistoryService.getInstancesHistory()
      .then((res) => {
        this.setState({
          histories: res.data,
        });
      })
      .catch();
  }
  render() {
    const { histories } = this.state;
    const { currentPage, postsPerPage } = this.state;
    const indexOfLastPost = currentPage * postsPerPage;
    const indexOfFirstPost = indexOfLastPost - postsPerPage;
    const currentInstances = histories.slice(indexOfFirstPost, indexOfLastPost);

    const paginate = (pageNumber) => {
      this.setState({
        currentPage: pageNumber,
      });
    };
    return (
      <div>
        <h2 className="text-center mainHeading">Instances History</h2>
        <div className="row">
          <table className="table table-stripped table-bordered">
            <thead>
              <tr>
                <th className="text-center">Instance ID</th>
                <th className="text-center">Instance Label</th>
                <th className="text-center">Instance Reason</th>
                <th className="text-center">Instance Created On</th>
                <th className="text-center">Employee Name</th>
                <th className="text-center">Team Name</th>
              </tr>
            </thead>
            <tbody>
              {currentInstances.map((i) => {
                return (
                  <tr key={i.historyId}>
                    <td>{i.historyId}</td>
                    <td>{i.historyLabel}</td>
                    <td className="text-center">
                      {i.historyReason === null ? "-" : i.historyReason}
                    </td>
                    <td>{i.historyTime}</td>
                    <td className="text-center">
                      {i.employee !== null
                        ? i.employee.employeeFirstName +
                          " " +
                          i.employee.employeeLastName
                        : "-"}
                    </td>
                    <td className="text-center">{i.employee.team.teamName}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        <div style={{ bottom: "0" }}>
          <Pagination
            postsPerPage={postsPerPage}
            totalPosts={this.state.histories.length}
            paginate={paginate}
          />
        </div>
      </div>
    );
  }
}

export default InstancesHistory;
