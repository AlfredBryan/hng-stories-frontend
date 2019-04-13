import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: ""
    };
  }
  //Admin login function
  handleSubmit = e => {
    e.preventDefault();
    let { email, password } = this.state;
    axios
      .post("https://dragon-legend-5.herokuapp.com/api/v1/user/login", {
        email,
        password
      })
      .then(res => {
        console.log(res);
        if (res.status === 200) {
          localStorage.setItem("token", res.data.data.token);
          this.props.history.replace("/profile");
        }
      })
      .catch(error => {
        if (error) {
          this.setState({
            errorMessage: "Error: confirm details and try again"
          });
        }
      });
  };

  //text change handler
  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };
  render() {
    return (
      <div>
        <div class="container">
          <form class="form-signin" onSubmit={this.handleSubmit}>
            <h2 class="form-signin-heading">sign in now</h2>
            <div class="login-wrap">
              <div class="user-login-info">
                <input
                  type="text"
                  class="form-control"
                  placeholder="Email"
                  name="email"
                  value={this.state.email}
                  onChange={this.handleChange}
                />
                <input
                  type="password"
                  class="form-control"
                  placeholder="Password"
                  name="password"
                  value={this.state.password}
                  onChange={this.handleChange}
                />
              </div>
              <button
                onClick={this.handleSubmit}
                class="btn btn-lg btn-login btn-block"
                type="submit"
              >
                Sign in
              </button>
              <div class="registration">
                Don't have an account yet?
                <Link to="/register"> Register </Link>
              </div>
            </div>
          </form>
        </div>
      </div>
    );
  }
}
export default Login;
