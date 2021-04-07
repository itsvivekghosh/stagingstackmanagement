import React, { Component } from 'react'
import TeamsServices from '../../Services/TeamsServices';

export class UpdateTeam extends Component {

    constructor(props) {
        super(props)

        this.state = {
            id: this.props.match.params.teamId,
            teamName: "",
            teamDescription: ""
        }
        this.changeTeamNameHandler = this.changeTeamNameHandler.bind(this);
        this.changeTeamDescriptionHandler = this.changeTeamDescriptionHandler.bind(this);
        this.updateTeam = this.updateTeam.bind(this);
    }

    componentDidMount() {
        TeamsServices.getTeamById(this.state.id).then((res) => {
            let team = res.data;
            this.setState({
                teamName: team.teamName,
                teamDescription: team.teamDescription
            });
        });
    }

    updateTeam = (e) => {
        e.preventDefault();
        const team = {
            teamName: this.state.teamName,
            teamDescription: this.state.teamDescription
        };

        TeamsServices.updateTeam(team, this.state.id).then(res => {
            this.props.history.push('/teams');
        });
    }

    changeTeamNameHandler = (event) => {
        this.setState({
            teamName: event.target.value
        })
    }

    changeTeamDescriptionHandler = (event) => {
        this.setState({
            teamDescription: event.target.value
        })
    }

    cancel() {
        this.props.history.push('/teams');
    }
    render() {
        return (
            <div>
                <br></br>
                <div className="container">
                    <div className="row">
                        <div className="card col-md-6 offset-md-3 offset-md-3">
                            <h3 className="text-center">Update Team</h3>
                            <div className="card-body">
                                <form>
                                    <div className="form-group">
                                        <label> Team Name: </label>
                                        <input placeholder="Team Name" name="teamName" className="form-control"
                                            value={this.state.teamName} onChange={this.changeTeamNameHandler} />
                                    </div>
                                    <div className="form-group">
                                        <label> Team Description: </label>
                                        <input placeholder="Team Description" name="teamDescription" className="form-control"
                                            value={this.state.teamDescription} onChange={this.changeTeamDescriptionHandler} />
                                    </div>

                                    <button className="btn btn-success" onClick={this.updateTeam}>Update</button>
                                    <button className="btn btn-danger" onClick={this.cancel.bind(this)} style={{ marginLeft: "10px" }}>Cancel</button>
                                </form>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        )
    }
}

export default UpdateTeam
