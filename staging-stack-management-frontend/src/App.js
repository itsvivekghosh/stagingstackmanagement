/* eslint-disable */
import "./App.css";
import React from "react";

import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Footer from "./Components/OtherComponents/Footer";
import Header from "./Components/OtherComponents/Header";
import ListTeams from "./Components/Teams/ListTeams";
import AddTeam from "./Components/Teams/AddTeam";
import ViewTeam from "./Components/Teams/ViewTeam";
import UpdateTeam from "./Components/Teams/UpdateTeam";
import ListEmployees from "./Components/Employees/ListEmployees";
import AddEmployee from "./Components/Employees/AddEmployee";
import ViewEmployee from "./Components/Employees/ViewEmployee";
import UpdateEmployee from "./Components/Employees/UpdateEmployee";
import ListInstances from "./Components/Instances/ListInstances";
import AddInstance from "./Components/Instances/AddInstance";
import ViewInstance from "./Components/Instances/ViewInstance";
import UpdateInstance from "./Components/Instances/UpdateInstance";
import FreeInstance from "./Components/InstanceHistory/FreeInstance";
import OccupyInstance from "./Components/InstanceHistory/OccupyInstance";
import InstancesHistory from "./Components/InstanceHistory/InstancesHistory";

export class App extends React.Component {
  render = () => {
    return (
      <div>
        <Router>
          <Header />
          <div className="container">
            <Switch>
              {/* Team Routes */}
              <Route path="/" exact component={ListTeams} />
              <Route path="/teams" exact component={ListTeams} />
              <Route path="/teams/add" exact component={AddTeam} />
              <Route path="/teams/:teamId" exact component={ViewTeam} />
              <Route
                path="/teams/:teamId/update"
                exact
                component={UpdateTeam}
              />

              {/* Employee Routes */}
              <Route path="/employees" exact component={ListEmployees}></Route>
              <Route
                path="/employees/add"
                exact
                component={AddEmployee}
              ></Route>
              <Route
                path="/employees/:employeeId"
                exact
                component={ViewEmployee}
              ></Route>
              <Route
                path="/employees/:employeeId/update"
                exact
                component={UpdateEmployee}
              ></Route>

              {/* Instances Routes */}
              <Route path="/instances" exact component={ListInstances}></Route>
              <Route
                path="/instances/add"
                exact
                component={AddInstance}
              ></Route>
              <Route
                path="/instances/:instanceId"
                exact
                component={ViewInstance}
              ></Route>
              <Route
                path="/instances/:instanceId/update"
                exact
                component={UpdateInstance}
              ></Route>

              {/* Instances History Routes */}
              <Route
                path="/free-instance/:instanceId"
                exact
                component={FreeInstance}
              ></Route>
              <Route
                path="/occupy-instance/:instanceId"
                exact
                component={OccupyInstance}
              ></Route>
              <Route
                path="/instances-history"
                exact
                component={InstancesHistory}
              ></Route>
            </Switch>
          </div>
        </Router>
        {/* <Footer /> */}
      </div>
    );
  };
}

export default App;
