import React, { Component } from "react";
import axios from "axios";
import { withRouter } from "react-router-dom";

class Authenticate extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: undefined
    };
  }

  componentDidMount() {
    const jwt = localStorage.getItem("token");
    if (!jwt) {
      this.props.history.push("/");
    }
    axios
      .get("https://dragon-legend-5.herokuapp.com/api/v1/user/token", {
        headers: { Authorization: jwt }
      })
      .then(res => {
        this.setState({
          user: res.data
        });
      })
      .catch(error => {
        this.props.history.push("/");
      });
  }

  render() {
    if (this.state.user === undefined) {
      return (
        <div>
          <h1>Loading.....</h1>
        </div>
      );
    }
    return <div>{this.props.children}</div>;
  }
}

export default withRouter(Authenticate);
