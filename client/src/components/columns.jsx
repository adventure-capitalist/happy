import React, { Component } from "react";
import axios from "axios";

class Columns extends Component {
  state = {
    happy: [],
    sad: [],
    faking: []
  };
  componentDidMount() {
    this.getDataFromDb();
  }

  getDataFromDb = () => {
    axios.get("/sites/check").then(result => {
      this.updateStatus(result.data);
    });
  };


  updateStatus(status) {
    const result = Object.keys(status).map(key => {
      const statuses = new Set(Object.values(status[key]));
      // is happy if it's always 200, sad if there is no 200, faking if it's mix
      const state = statuses.has(200)?(statuses.size===1?"happy":"faking"):"sad";
      return [key, state]
    }).reduce((acc, [name, state]) => {
      // group names in happy, sad, faking categories
      acc[state].push(name);
      return acc;
    }, {happy: [], sad: [], faking: []});
    this.setState(result);
  }



  render() {
    return (
      <React.Fragment>
        <div className="overview">
          <p className="green">
            <strong className="stat">{this.state.happy.length}</strong>
            apps are happy
          </p>
          <p className="red">
            <strong className="stat">{this.state.sad.length}</strong>
            apps are sad
          </p>
          <p className="grey">
            <strong className="stat">{this.state.faking.length}</strong>
            apps are fakers
          </p>
        </div>
        <div className="columns">
          <div className="happy">
            <h2>Hooray! These apps are happy:</h2>
            <ul>
              {this.state.happy.map(item => {
                return <li>{item}</li>;
              })}
            </ul>
          </div>
          <div className="sad">
            <h2>Oh no! These apps are sad:</h2>
            <ul>
              {this.state.sad.map(item => {
                return <li>{item}</li>;
              })}
            </ul>
          </div>
          <div className="fakers">
            <h2>Pfft! These apps are faking:</h2>
            <ul>
              {this.state.faking.map(item => {
                return <li>{item}</li>;
              })}
            </ul>
          </div>
        </div>
      </React.Fragment>
    );
  }
}
export default Columns;
