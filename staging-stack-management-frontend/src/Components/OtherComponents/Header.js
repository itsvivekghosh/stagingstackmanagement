/* eslint-disable */
import React, { Component } from "react";

export default class Header extends Component {
  render() {
    return (
      <header style={{ paddingBottom: "75px" }}>
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark sticky-top">
          <a className="navbar-brand" href="/" style={{ paddingLeft: "30px" }}>
            Staging Stack Management
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarText"
            aria-controls="navbarText"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarText">
            <ul className="navbar-nav mr-auto">
              <li className="nav-item active">
                <a className="nav-link" href="/teams">
                  Teams
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="/employees">
                  Employees
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="/instances">
                  Instances
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="/instances-history">
                  History
                </a>
              </li>
            </ul>
          </div>
          <div className="navbar-text">
            <a className="nav-link" href="/instances-history">
              Employee SignIn
            </a>
          </div>
          <div className="navbar-text" style={{ paddingRight: "40px" }}>
            <a className="nav-link" href="/instances-history">
              Admin SignIn
            </a>
          </div>
        </nav>
      </header>
    );
  }
}
