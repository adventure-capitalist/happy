import React, { Component } from "react";
import axios from "axios";
let arrhappy = [];
let arrsad = [];
const api = "http://localhost:3001/sites";

class Columns extends Component {
  state = {
    data: [{ id: 0, name: "", urls: ["", ""] }],
    happy: [],
    sad: [],
    faking: []
  };
  componentDidMount() {
    this.getDataFromDb();
    this.parseData(this.state.data);
  }

  getDataFromDb = () => {
    axios.get(api).then(result => {
      console.log(result.data);
      let variable = [];
      variable = result.data;
      this.setState({ data: variable });
    });
  };

  parseData = data => {
    data.map(site => {
      this.checkStatus(site);
    });
  };

  checkStatus(site) {
    site.urls.map(url =>
      axios.get(url).then(response => {
        console.log(response);
        if (response.status !== 200) {
          arrsad.push(site.name);
          console.log(site);
        } else {
          arrhappy.push(site.name);
          console.log(site);
        }
      })
    );
    this.update();
  }

  update() {
    this.setState({ happy: arrhappy });
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
