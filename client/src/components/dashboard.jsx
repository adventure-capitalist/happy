import React, { Component } from "react";
import Columns from "./columns";

class Dashboard extends Component {
  render() {
    return (
      <React.Fragment>
        <main>
          <h1>Don't worry, be happy.</h1>
          <div className="container">
            <Columns />
          </div>
        </main>
      </React.Fragment>
    );
  }
}

export default Dashboard;
