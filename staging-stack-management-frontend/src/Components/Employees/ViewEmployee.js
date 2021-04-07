import React, { Component } from 'react'
import EmployeeServices from '../../Services/EmployeeServices';

export class ViewEmployee extends Component {
    constructor(props) {
        super(props)

        this.state = {
            employeeId: this.props.match.params.employeeId,
            employee: {},
            team: {}
        }
    }

    componentDidMount() {
        EmployeeServices.getEmployeeById(this.state.employeeId).then(res => {
            this.setState({
                employee: res.data,
                team: res.data.team
            })
        }
        ).catch(err => console.log(err));
    }

    render() {
        return (
            <div>
                <br></br>
                <div className="card col-md-6 offset-md-3">
                    <h3 className="text-center">View Employee Details</h3>
                    <div className="card-body">
                        <div className="row">
                            <label> Employee ID: </label>
                            <div> {this.state.employee.employeeId}</div>
                        </div>
                        <div className="row">
                            <label> Employee First Name: </label>
                            <div> {this.state.employee.employeeFirstName}</div>
                        </div>
                        <div className="row">
                            <label> Employee Last Name: </label>
                            <div> {this.state.employee.employeeLastName}</div>
                        </div>
                        <div className="row">
                            <label> Employee Mobile Number: </label>
                            <div> {this.state.employee.employeeMobileNumber}</div>
                        </div>
                        <div>
                            <h5>Team Details:</h5>
                            <div className="row">
                                <label> Team Name: </label>
                                <div> {this.state.team.teamName}</div>
                            </div>
                            <div className="row">
                                <label> Team Description: </label>
                                <div> {this.state.team.teamDescription}</div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        )
    }
}

export default ViewEmployee;
