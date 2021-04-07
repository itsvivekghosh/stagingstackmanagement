import React, { Component } from 'react'
import EmployeeServices from '../../Services/EmployeeServices';
import TeamsServices from '../../Services/TeamsServices';

export class UpdateEmployee extends Component {

    constructor(props) {
        super(props);

        this.state = {
            employeeId: this.props.match.params.employeeId,
            employee: {},
            team: {},
            teams: [],
            selectedTeamId: 0,
            employeeFirstName: "",
            employeeLastName: "",
            employeeMobileNumber: ""
        }

        this.updateEmployee = this.updateEmployee.bind(this);
        this.employeeMobileNumberHandler = this.employeeMobileNumberHandler.bind(this);
        this.employeeFirstNameHandler = this.employeeFirstNameHandler.bind(this);
        this.employeeLastNameHandler = this.employeeLastNameHandler.bind(this);
        this.teamSelectHandler = this.teamSelectHandler.bind(this);
    }

    componentDidMount() {
        EmployeeServices.getEmployeeById(this.state.employeeId).then(res => {
            let emp = res.data;
            let t = res.data.team;
            this.setState({
                employeeFirstName: emp.employeeFirstName,
                employeeLastName: emp.employeeLastName,
                employeeMobileNumber: emp.employeeMobileNumber,
                team: t,
                selectedTeamId: t.teamId
            })
        }
        ).catch(err =>
            console.log(err)
        );

        TeamsServices.getTeams().then(res => {
            this.setState({
                teams: res.data
            })
        }
        ).catch(err =>
            console.log(err)
        );
    }

    employeeFirstNameHandler = (event) => {
        this.setState({
            employeeFirstName: event.target.value
        })
    }

    employeeLastNameHandler = (event) => {
        this.setState({
            employeeLastName: event.target.value
        })
    }

    employeeMobileNumberHandler = (event) => {
        this.setState({
            employeeMobileNumber: event.target.value
        })
    }

    cancel() {
        this.props.history.push('/employees');
    }

    updateEmployee(event) {
        event.preventDefault();
        let teamsList = this.state.teams;
        const finalTeam = teamsList.find(team => team.teamId.toString() === this.state.selectedTeamId.toString());

        const employeeObject = {
            employeeFirstName: this.state.employeeFirstName,
            employeeLastName: this.state.employeeLastName,
            employeeMobileNumber: this.state.employeeMobileNumber,
            team: finalTeam
        };

        console.log(employeeObject)

        EmployeeServices.updateEmployee(this.state.employeeId, employeeObject).then(_ => {
            console.log(`Successfully Updated ${this.state.employeeId} EmployeeID`)
            this.props.history.push('/employees');
        }
        ).catch(err => console.log(err));
    }

    teamSelectHandler = (e) => {
        this.setState({
            selectedTeamId: e.target.value
        })
    }

    render() {
        let teams = this.state.teams;
        return (
            <div>
                <br></br>
                <div className="container">
                    <div className="row">
                        <div className="card col-md-6 offset-md-3 offset-md-3">
                            <h3 className="text-center">Update Employee</h3>
                            <div className="card-body">
                                <form>
                                    <div className="form-group">
                                        <label> Employee FirstName: </label>
                                        <input placeholder="Employee First Name" name="employeeFirstName" className="form-control"
                                            value={this.state.employeeFirstName} onChange={this.employeeFirstNameHandler} />
                                    </div>
                                    <div className="form-group">
                                        <label> Employee LastName: </label>
                                        <input placeholder="Employee Last Name" name="employeeLastName" className="form-control"
                                            value={this.state.employeeLastName} onChange={this.employeeLastNameHandler} />
                                    </div>
                                    <div className="form-group">
                                        <label> Employee Mobile Number: </label>
                                        <input placeholder="Employee Mobile Number" name="employeeMobileNumber" className="form-control"
                                            value={this.state.employeeMobileNumber} onChange={this.employeeMobileNumberHandler} />
                                    </div>
                                    <br />
                                    <div>
                                        <h6 className="text-center">Team</h6>
                                    </div>
                                    <div>
                                        <label>Assign Team:</label>
                                        <select
                                            className="form-control" onChange={this.teamSelectHandler}
                                            value={this.state.selectedTeamId}
                                            defaultValue={this.state.selectedTeamId}
                                            required>
                                            <option key={0}>-------select employee--------</option>
                                            {
                                                teams && teams.map(team => {
                                                    return <option key={team.teamId} value={team.teamId}>{team.teamName}</option>
                                                })
                                            }
                                        </select>
                                    </div>
                                    <br />
                                    <button className="btn btn-success" onClick={this.updateEmployee}>Update</button>
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

export default UpdateEmployee;