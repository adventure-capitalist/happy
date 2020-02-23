import React, { Component } from "react";
import axios from "axios";

class Columns extends Component {
  state = {
    happy: [],
    sad: [], // not a state
    faking: [] // not a state
  };
  componentDidMount() {
    this.getDataFromDb();
    // this.parseData(this.state.data);  - data will be updated after request
  }

  getDataFromDb = () => {
    axios.get("/sites/check").then(result => {
      console.log("data", result.data, "done");
      this.checkStatus(result.data);
      // this.setState({ data: variable });
    });
  };

  // parseData = data => {
  //   data.map(site => {
  //     this.checkStatus(site);
  //   });
  // };

  checkStatus(status) {
    const result = Object.keys(status).map(key => {
      const statuses = new Set(Object.values(status[key]));
      // is happy if it's always 200, sad if there is no 200, faking if it's mix
      const state = statuses.has(200)?(statuses.size===1?"happy":"faking"):"sad";
      return [key, state]
    }).reduce((acc, [name, state]) => {
      acc[state].push(name);
      return acc;
    }, {happy: [], sad: [], faking: []});
    this.setState(result);

    // not sure what "app is happy mean - all urls are correct,

    // it's not possible to check status code of site from react (CORS)
    // site.urls.map(url =>
    //   axios.get(url).then(response => {
    //     console.log(`get: ${url}:`, response);
    //     if (response.status !== 200) {
    //       arrsad.push(site.name);
    //       console.log(site);
    //     } else {
    //       arrhappy.push(site.name);
    //       console.log(site);
    //     }
    //   })
    // );

    ///this.update();
  }

  // update() {
  //   this.setState({ happy: arrhappy });
  // }

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
