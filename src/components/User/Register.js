import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";
import axios from "axios";

class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      email: "",
      designation: "",
      password: "",
      is_admin: true,
      is_premium: true,
      errorMessage: null
    };
  }

  //Admin Registration function
  handleSubmit = e => {
    e.preventDefault();
    let {
      name,
      email,
      designation,
      password,
      is_admin,
      is_premium
    } = this.state;
    axios
      .post("https://dragon-legend-5.herokuapp.com/api/v1/user/register", {
        name,
        email,
        designation,
        password,
        is_admin,
        is_premium
      })
      .then(res => {
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
        <Helmet>
          <meta charSet="utf-8" />
          <title>Register</title>
        </Helmet>
        <div>
          <div class="container">
            <form class="form-signin" onSubmit={this.handleSubmit}>
              <h2 class="form-signin-heading">Sign Up now</h2>
              <div class="login-wrap">
                <div class="user-login-info">
                  <input
                    type="text"
                    class="form-control"
                    placeholder="Enter fullname"
                    name="name"
                    value={this.state.name}
                    onChange={this.handleChange}
                  />
                  <input
                    type="email"
                    class="form-control"
                    placeholder="Enter email"
                    name="email"
                    value={this.state.email}
                    onChange={this.handleChange}
                  />
                  <input
                    type="text"
                    class="form-control"
                    placeholder="Enter designation"
                    name="designation"
                    value={this.state.designation}
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
                  Register
                </button>

                <div class="registration">
                  Already have an account?
                  <Link to="/">Login</Link>
                </div>
              </div>

              <div
                aria-hidden="true"
                aria-labelledby="myModalLabel"
                role="dialog"
                tabindex="-1"
                id="myModal"
                class="modal fade"
              >
                <div class="modal-dialog">
                  <div class="modal-content">
                    <div class="modal-header">
                      <button
                        type="button"
                        class="close"
                        data-dismiss="modal"
                        aria-hidden="true"
                      >
                        &times;
                      </button>
                      <h4 class="modal-title">Forgot Password ?</h4>
                    </div>
                    <div class="modal-body">
                      <p>
                        Enter your e-mail address below to reset your password.
                      </p>
                      <input
                        type="text"
                        name="email"
                        placeholder="Email"
                        autocomplete="off"
                        class="form-control placeholder-no-fix"
                      />
                    </div>
                    <div class="modal-footer">
                      <button
                        data-dismiss="modal"
                        class="btn btn-default"
                        type="button"
                      >
                        Cancel
                      </button>
                      <button class="btn btn-success" type="button">
                        Submit
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default Register;
