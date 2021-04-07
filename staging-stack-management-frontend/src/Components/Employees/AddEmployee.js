import React, { Component } from 'react'
import EmployeeServices from '../../Services/EmployeeServices';
import TeamsServices from '../../Services/TeamsServices';

export default class AddEmployee extends Component {

    constructor(props) {
        super(props);

        this.state = {
            teams: [],
            teamIdSelected: 0,
            employeeFirstName: "",
            employeeLastName: "",
            employeeMobileNumber: 0
        }

        this.changeFirstNameHandler = this.changeFirstNameHandler.bind(this);
        this.changeLastNameHandler = this.changeLastNameHandler.bind(this);
        this.saveEmployeeHandler = this.saveEmployeeHandler.bind(this);
        this.changeMobileNumberHandler = this.changeMobileNumberHandler.bind(this);
    }

    changeFirstNameHandler = (event) => {
        this.setState({
            employeeFirstName: event.target.value
        })
    }

    changeLastNameHandler = (event) => {
        this.setState({
            employeeLastName: event.target.value
        })
    }

    changeMobileNumberHandler = (event) => {
        this.setState({
            employeeMobileNumber: event.target.value
        })
    }

    componentDidMount() {
        TeamsServices.getTeams().then(res => {
            this.setState({
                teams: res.data
            })
        }).catch(err =>
            console.log(err)
        );
        this.teamSelectHandler = this.teamSelectHandler.bind(this);
    }

    saveEmployeeHandler = (event) => {
        event.preventDefault();
        let teamsList = this.state.teams;

        const finalTeam = teamsList.find(team => team.teamId.toString() === this.state.teamIdSelected.toString());
        const employeeObject = {
            employeeFirstName: this.state.employeeFirstName,
            employeeLastName: this.state.employeeLastName,
            employeeMobileNumber: this.state.employeeMobileNumber,
            team: finalTeam
        };

        EmployeeServices.addEmployee(employeeObject).then(res => {
            this.props.history.push("/employees")
        }).catch(err => {
            console.log(err)
        });
    }

    teamSelectHandler = (event) => {
        this.setState({ teamIdSelected: event.target.value });
    }

    cancelSaveEmployee = (_) => {
        this.props.history.push("/employees");
    }

    render() {
        return (
            <div>
                <div>
                    <div className="container">
                        <div className="row">
                            <div className="card col-md-6 offset-md-3 offset-md-3">
                                <h4 className="text-center">Add Employee</h4>
                                <div className="card-body">
                                    <form>
                                        <div className="form-group">
                                            <label>Employee First Name:</label>
                                            <input
                                                required
                                                type="text"
                                                placeholder="Employee First Name"
                                                name="employeeFirstName"
                                                className="form-control"
                                                value={this.state.employeeFirstName}
                                                onChange={this.changeFirstNameHandler}>
                                            </input>
                                        </div>
                                        <div className="form-group">
                                            <label>Employee Last Name:</label>
                                            <input
                                                required
                                                type="text"
                                                placeholder="Employee Last Name"
                                                name="employeeLastName"
                                                className="form-control"
                                                value={this.state.employeeLastName}
                                                onChange={this.changeLastNameHandler}>
                                            </input>
                                        </div>
                                        <div className="form-group">
                                            <label>Employee Mobile Number:</label>
                                            <input
                                                required
                                                type="text"
                                                placeholder="Team Name"
                                                name="employeeMobileNumber"
                                                className="form-control"
                                                value={this.state.employeeMobileNumber}
                                                onChange={this.changeMobileNumberHandler}>
                                            </input>
                                        </div>
                                        <div>
                                            <label>Team Description:</label>
                                            <select className="form-control" onChange={this.teamSelectHandler} value={this.state.teamIdSelected} required>
                                                <option key={0}>-------select--------</option>
                                                {
                                                    this.state.teams && this.state.teams.map((team) => {
                                                        return <option key={team.teamId} value={team.teamId}>{team.teamName}</option>
                                                    })
                                                }
                                            </select>
                                        </div>
                                        <br></br>
                                        <input type="button" className="btn btn-success" value="Create Employee" onClick={this.saveEmployeeHandler}></input>
                                        <input type="button" className="btn btn-danger" style={{ marginLeft: "10px" }} value="Cancel" onClick={this.cancelSaveEmployee}></input>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
