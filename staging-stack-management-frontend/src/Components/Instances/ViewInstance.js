import React, { Component } from 'react'
import InstanceServices from '../../Services/InstanceServices';

export class ViewInstance extends Component {
    constructor(props) {
        super(props);

        this.state = {
            instanceId: this.props.match.params.instanceId,
            instance: {},
            employee: {}
        }
    }

    componentDidMount() {
        InstanceServices.getInstance(this.state.instanceId).then(res => {
            this.setState({
                instance: res.data,
                employee: res.data.employee
            })
        }).catch(err => console.log(err));
    }

    render() {
        const { instance, employee } = this.state;
        return (
            <div>
                <br></br>
                <div className="card col-md-6 offset-md-3">
                    <h3 className="text-center">View Instance Details</h3>
                    <div className="card-body">
                        <div className="row">
                            <label> Instance ID: </label>
                            <div> {instance.instanceId}</div>
                        </div>
                        <div className="row">
                            <label> Instance Name: </label>
                            <div> {instance.instanceName}</div>
                        </div>
                        <div className="row">
                            <label> Instance Description: </label>
                            <div> {instance.instanceDescription}</div>
                        </div>
                        <div>
                            <h5>Employee Details:</h5>
                            <div className="row">
                                <label> Employee ID: </label>
                                <div> {employee.employeeId}</div>
                            </div>
                            <div className="row">
                                <label> Employee Name: </label>
                                <div> {employee.employeeFirstName + " " + employee.employeeLastName}</div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        )
    }
}

export default ViewInstance;