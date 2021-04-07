import React, { Component } from 'react'
import TeamsServices from '../../Services/TeamsServices';

export default class AddTeam extends Component {
    constructor(props) {
        super(props);
        this.state = {
            teamName: "",
            teamDescription: ""
        }
        this.changeTeamNameHandler = this.changeTeamNameHandler.bind(this);
        this.teamDescriptionHandler = this.teamDescriptionHandler.bind(this);
        this.saveTeamHandler = this.saveTeamHandler.bind(this);
        this.cancelSaveTeam = this.cancelSaveTeam.bind(this);
    }

    changeTeamNameHandler = (event) => {
        this.setState({
            teamName: event.target.value
        });
    }

    teamDescriptionHandler = (event) => {
        this.setState({
            teamDescription: event.target.value
        });
    }

    saveTeamHandler = (event) => {
        event.preventDefault();

        const teamObject = {
            teamName: this.state.teamName,
            teamDescription: this.state.teamDescription
        }

        TeamsServices.addTeam(teamObject).then(res => {
            this.props.history.push("/teams");
        }).catch(err => {
            console.log("Error" + err)
        });
    }

    cancelSaveTeam = (_) => {
        this.props.history.push("/teams");
    }

    render() {
        return (
            <div>
                <div className="container">
                    <br></br>
                    <div className="row">
                        <div className="card col-md-6 offset-md-3 offset-md-3">
                            <h4 className="text-center">Add Team</h4>
                            <div className="card-body">
                                <form>
                                    <div className="form-group">
                                        <label>Team Name:</label>
                                        <input
                                            type="text"
                                            placeholder="Team Name"
                                            name="teamName"
                                            className="form-control"
                                            value={this.state.teamName}
                                            onChange={this.changeTeamNameHandler}>
                                        </input>
                                    </div>
                                    <div className="form-group">
                                        <label>Team Description:</label>
                                        <textarea
                                            type="text"
                                            placeholder="Team Name"
                                            name="teamName"
                                            className="form-control"
                                            value={this.state.teamDescription}
                                            onChange={this.teamDescriptionHandler}>
                                        </textarea>
                                    </div>
                                    <input type="button" className="btn btn-success" style={{ marginLeft: "30px" }} value="Create Team" onClick={this.saveTeamHandler}></input>
                                    <input type="button" className="btn btn-danger" style={{ marginLeft: "10px" }} value="Cancel" onClick={this.cancelSaveTeam}></input>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
