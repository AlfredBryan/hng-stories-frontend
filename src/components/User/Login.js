import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";
import swal from "sweetalert";
import axios from "axios";

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      errorMessage: ""
    };
  }
  //Admin login function
  handleSubmit = e => {
    e.preventDefault();
    let { email, password } = this.state;
    axios
      .post("https:dragon-legend-5.herokuapp.com/api/v1/user/login", {
        email,
        password
      })
      .then(res => {
        if (res.data.data.admin === true) {
          localStorage.setItem("token", res.data.data.token);
          this.props.history.replace("/profile");
        } else {
          swal({
            icon: "warning",
            title: "You need to be admin to login Here"
          });
        }
      })
      .catch(error => {
        if (error) {
          this.setState({
            errorMessage: "Error: Confirm details and try again"
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
        <Helmet>
          <meta charSet="utf-8" />
          <title>Login</title>
        </Helmet>
        <div className="container">
          <form className="form-signin" onSubmit={this.handleSubmit}>
            <h2 className="form-signin-heading">sign in now</h2>
            <div className="login-wrap">
              <div className="user-login-info">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Email"
                  name="email"
                  value={this.state.email}
                  onChange={this.handleChange}
                />
                <input
                  type="password"
                  className="form-control"
                  placeholder="Password"
                  name="password"
                  value={this.state.password}
                  onChange={this.handleChange}
                />
                <p
                  style={{
                    marginRight: "5px",
                    fontWeight: "700",
                    marginTop: "10px",
                    color: "red",
                    fontFamily: "'Italianno', cursive"
                  }}
                >
                  {this.state.errorMessage}
                </p>
              </div>
              <button
                onClick={this.handleSubmit}
                className="btn btn-lg btn-login btn-block"
                type="submit"
              >
                Sign in
              </button>
              <div className="registration">
                Don't have an account yet?
                <Link to="/register">Register</Link>
              </div>
            </div>
          </form>
        </div>
      </div>
    );
  }
}
export default Login;
