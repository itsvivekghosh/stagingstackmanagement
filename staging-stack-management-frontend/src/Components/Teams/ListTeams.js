import React, { Component } from "react";
import TeamsServices from "../../Services/TeamsServices";

export default class ListTeams extends Component {
  constructor(props) {
    super(props);

    this.state = {
      teams: [],
    };
    this.addTeamHandler = this.addTeamHandler.bind(this);
    this.viewTeamHandler = this.viewTeamHandler.bind(this);
    this.updateTeamHandler = this.updateTeamHandler.bind(this);
    this.deleteTeamHandler = this.deleteTeamHandler.bind(this);
  }

  componentDidMount() {
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

  addTeamHandler() {
    this.props.history.push("/teams/add");
  }

  viewTeamHandler(id) {
    this.props.history.push(`/teams/${id}`);
  }

  updateTeamHandler(id) {
    this.props.history.push(`/teams/${id}/update`);
  }

  deleteTeamHandler(id, name) {
    var res = window.confirm(
      `Are you sure you want to delete this ${name} Team?`
    );
    if (res === true) {
      TeamsServices.deleteTeam(id)
        .then((res) => {
          this.props.history.push("/teams");
        })
        .catch((err) => {
          console.log(err);
        });
      window.location.reload(false);
    } else {
      // some code
    }
  }

  render() {
    return (
      <div>
        <h2 className="text-center mainHeading">Teams List</h2>
        <div className="row">
          <button className="btn btn-primary" onClick={this.addTeamHandler}>
            Add Team
          </button>
        </div>
        <div className="row" style={{ marginTop: "20px" }}>
          <table className="table table-stripped table-bordered">
            <thead>
              <tr>
                <th>Team ID</th>
                <th>Team Name</th>
                <th>Team Description</th>
                <th className="text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {this.state.teams.map((team) => {
                return (
                  <tr key={team.teamId}>
                    <td>{team.teamId}</td>
                    <td>{team.teamName}</td>
                    <td>{team.teamDescription}</td>
                    <td className="text-center">
                      <button
                        className="btn btn-primary"
                        onClick={() => this.viewTeamHandler(team.teamId)}
                      >
                        View
                      </button>
                      <button
                        className="btn btn-warning"
                        onClick={() => this.updateTeamHandler(team.teamId)}
                        style={{ marginLeft: "30px" }}
                      >
                        Update
                      </button>
                      <button
                        className="btn btn-danger"
                        onClick={() =>
                          this.deleteTeamHandler(team.teamId, team.teamName)
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
        </div>
      </div>
    );
  }
}
