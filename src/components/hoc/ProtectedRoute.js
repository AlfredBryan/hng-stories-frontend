import React, { Component } from "react";
import axios from "axios";
import { withRouter } from "react-router-dom";
import Spinner from "./Spinner";

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
      this.props.history.push("/login");
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
        this.props.history.push("/login");
      });
  }

  render() {
    if (this.state.user === undefined) {
      return (
        <div>
          <Spinner />
        </div>
      );
    }
    return <div>{this.props.children}</div>;
  }
}

export default withRouter(Authenticate);
