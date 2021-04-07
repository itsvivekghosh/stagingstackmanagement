import React, { Component } from 'react'
import TeamsServices from '../../Services/TeamsServices';

export default class ViewTeam extends Component {
    constructor(props) {
        super(props)

        this.state = {
            id: this.props.match.params.teamId,
            team: {}
        }
    }

    componentDidMount(){
        TeamsServices.getTeamById(this.state.id).then(res => {
            this.setState({
                    team: res.data
                });
            }).catch(err => {
            console.log(err);
        }); 
    }

    render() {
        return (
            <div>
                <br></br>
                <div className = "card col-md-6 offset-md-3">
                    <h3 className = "text-center"> View Team Details</h3>
                    <div className = "card-body">
                        <div className = "row">
                            <label> Team ID: </label>
                            <div> { this.state.team.teamId }</div>
                        </div>
                        <div className = "row">
                            <label> Team Name: </label>
                            <div> { this.state.team.teamName }</div>
                        </div>
                        <div className = "row">
                            <label> Team Description: </label>
                            <div> { this.state.team.teamDescription }</div>
                        </div>
                    </div>

                </div>
            </div>
        )
    }
}
