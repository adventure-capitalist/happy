import React, { Component } from "react";
import axios from "axios";

class Columns extends Component {
  state = {
    date: Date.now(),
    happy: [],
    sad: [],
    faking: []
  };
  // Lifecycle functions

  // I think this is a five minute interval 300000
  componentDidMount() {
    this.getDataFromDB();
    var intervalID = setInterval(this.getDataFromDB, 300000);
    console.log(intervalID);
  }

  // Functions for doing stuff

  getDataFromDB = () => {
    axios.get("http://localhost:3001/sites/check").then(result => {
      this.updateStatus(result.data);
    });
    var time = new Date();
    time = time.toTimeString().substr(0, 5);
    this.setState({ date: time });
  };

  updateStatus(status) {
    const result = Object.keys(status)
      .map(key => {
        const statuses = new Set(Object.values(status[key]));
        const state = statuses.has(200)
          ? statuses.size === 1
            ? "happy"
            : "sad"
          : "sad";
        return [key, state];
      })
      .reduce(
        (acc, [name, state]) => {
          acc[state].push(name);
          return acc;
        },
        { happy: [], sad: [], faking: [] }
      );
    this.setState(result);
    if (this.state.sad.length > 0) {
      var messenger = require("../messenger");
      messenger.sendMessage();
    }
  }

  render() {
    return (
      <React.Fragment>
        <h3>Last touched base at: {this.state.date}</h3>
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
              <li></li>
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
