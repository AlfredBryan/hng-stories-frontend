import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const token = localStorage.getItem("token");

class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: ""
    };
  }

  componentDidMount() {
    let user = this.parseJwt(token);
    let userId = user._id;
    console.log(userId);
    axios
      .get(
        `https://dragon-legend-5.herokuapp.com/api/v1/user/profile/${userId}`,
        { headers: { Authorization: token } }
      )
      .then(res => {
        console.log(res.data.data);
        this.setState({ user: res.data.data });
      });
  }

  parseJwt = token => {
    if (!token) {
      return;
    }
    const base64Url = token.split(".")[1];
    const base64 = base64Url.replace("-", "+").replace("_", "/");
    return JSON.parse(window.atob(base64));
  };

  logOut = () => {
    localStorage.clear("token");
    this.props.history.replace("/login");
  };
  render() {
    let { user } = this.state;
    console.log();
    return (
      <div>
        <section id="container">
          {/*header start*/}
          <header class="header fixed-top clearfix">
            {/*logo start*/}
            <div class="brand">
              <a href="index.html" class="logo">
                <img src={require("../../images/logo.png")} alt="" />
              </a>
              <div class="sidebar-toggle-box">
                <div class="fa fa-bars" />
              </div>
            </div>
            {/*logo end*/}

            <div class="top-nav clearfix">
              {/*search & user info start*/}
              <ul class="nav pull-right top-menu">
                {/*user login dropdown start*/}
                <li class="dropdown">
                  <a data-toggle="dropdown" class="dropdown-toggle" href="/">
                    <img alt="" src={user.image} />
                    <span class="username">{user.name}</span>
                    <b class="caret" />
                  </a>
                </li>
                {/*user login dropdown end*/}
              </ul>
              {/*search & user info end*/}
            </div>
          </header>
          {/*header end*/}
          {/*sidebar start*/}
          <aside>
            <div id="sidebar" class="nav-collapse">
              {/*sidebar menu start*/}
              <ul class="sidebar-menu" id="nav-accordion">
                <li>
                  <Link to="/dashboard">
                    <i class="fa fa-dashboard" />
                    <span>Dashboard</span>
                  </Link>
                </li>
                <li class="sub-menu">
                  <Link to="/category">
                    <i class="fa fa-laptop" />
                    <span>Categories</span>
                  </Link>
                  <ul class="sub">
                    <li>
                      <a href="#">Create</a>
                    </li>
                    <li>
                      <a href="#">View</a>
                    </li>
                  </ul>
                </li>
                <li class="sub-menu">
                  <Link to="/dashboard">
                    <i class="fa fa-book" />
                    <span>Stories</span>
                  </Link>
                  <ul class="sub">
                    <li>
                      <a href="#">Create</a>
                    </li>
                    <li>
                      <a href="#">View</a>
                    </li>
                  </ul>
                </li>
                <li>
                  <Link to="/profile">
                    <i class="fa fa-bullhorn" />
                    <span>Profile </span>
                  </Link>
                </li>
                <li>
                  <Link to="/user">
                    <i class="fa fa-users" />
                    <span>Users </span>
                  </Link>
                </li>

                <li>
                  <button
                    style={{
                      marginLeft: "15px",
                      backgroundColor: "black",
                      color: "white"
                    }}
                    onClick={this.logOut}
                  >
                    <i class="fa fa-user" />
                    <span>Log Out</span>
                  </button>
                </li>
              </ul>
              {/*sidebar menu end*/}
            </div>
          </aside>
          {/*sidebar end*/}
          {/*main content start*/}
          <section id="main-content">
            <section class="wrapper">
              <div class="row">
                <div class="col-md-12">
                  <section class="panel">
                    <div class="panel-body profile-information">
                      <div class="col-md-3">
                        <div class="profile-pic text-center">
                          <img src={user.image} alt="" />
                        </div>
                      </div>
                      <div class="col-md-6">
                        <div class="profile-desk">
                          <h1>{user.name}</h1>
                          <span class="text-muted">Email: {user.email} </span>
                          <br />
                          <Link to="/add_story" class="btn btn-primary">
                            Add Story
                          </Link>
                        </div>
                      </div>
                      <div class="col-md-3">
                        <div class="profile-statistics">
                          <h1>1240</h1>
                          <p>Stories</p>
                          <h1>50</h1>
                          <p>BookMarks</p>
                        </div>
                      </div>
                    </div>
                  </section>
                </div>
              </div>{" "}
              {/* End*/}
              {/*start of header*/}
              <div class="row">
                <div class="col-lg-12">
                  <section class="panel">
                    <header class="panel-heading">Edit Profile</header>
                    <div class="panel-body">
                      <div class="position-center">
                        <form>
                          <div class="form-group">
                            <label for="exampleInputEmail1">First Name</label>
                            <input
                              type="text"
                              class="form-control"
                              id="exampleInputEmail1"
                              placeholder="Enter email"
                            />
                          </div>
                          <div class="form-group">
                            <label for="exampleInputEmail1">Last Name</label>
                            <input
                              type="text"
                              class="form-control"
                              id="exampleInputEmail1"
                              placeholder="Enter email"
                            />
                          </div>
                          <div class="form-group">
                            <label for="exampleInputEmail1">Email</label>
                            <input
                              type="Email"
                              class="form-control"
                              id="exampleInputEmail1"
                              placeholder="Enter email"
                            />
                          </div>
                          <div class="form-group">
                            <label for="exampleInputEmail1">Phone Number</label>
                            <input
                              type="text"
                              class="form-control"
                              id="exampleInputEmail1"
                              placeholder="Enter email"
                            />
                          </div>

                          <div class="form-group">
                            <label for="exampleInputFile">
                              Change Profile Photo
                            </label>
                            <input type="file" id="exampleInputFile" />
                            <p class="help-block">Format: PNG, JPG (1MB)</p>
                          </div>
                          <div class="form-group">
                            <button type="submit" class="btn btn-info">
                              Submit
                            </button>
                          </div>
                        </form>
                      </div>
                    </div>
                  </section>
                </div>
              </div>
            </section>
          </section>
        </section>
      </div>
    );
  }
}

export default Profile;
