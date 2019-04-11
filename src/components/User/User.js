import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const token = localStorage.getItem("token");

class User extends Component {
  constructor(props) {
    super(props);
    this.state = {
      users: [],
      me: ""
    };
  }

  componentDidMount() {
    const token = localStorage.getItem("token");
    axios
      .get("https://dragon-legend-5.herokuapp.com/api/v1/user/all", {
        headers: { Authorization: token }
      })
      .then(res => {
        console.log(res.data.data);
        this.setState({ users: res.data.data });
      });
    this.getUser();
  }

  getUser = () => {
    let user = this.parseJwt(token);
    let userId = user._id;
    console.log(userId);
    axios
      .get(
        `https://dragon-legend-5.herokuapp.com/api/v1/user/profile/${userId}`
      )
      .then(res => {
        console.log(res.data.data);
        this.setState({ me: res.data.data });
      });
  };

  parseJwt = token => {
    if (!token) {
      return;
    }
    const base64Url = token.split(".")[1];
    const base64 = base64Url.replace("-", "+").replace("_", "/");
    return JSON.parse(window.atob(base64));
  };

  render() {
    let { users, me } = this.state;
    return (
      <div>
        <section id="container">
          <header class="header fixed-top clearfix">
            <div class="brand">
              <a href="index.html" class="logo">
                <img src={require("../../images/logo.png")} alt="" />
              </a>
              <div class="sidebar-toggle-box">
                <div class="fa fa-bars" />
              </div>
            </div>

            <div class="top-nav clearfix">
              <ul class="nav pull-right top-menu">
                <li class="dropdown">
                  <a data-toggle="dropdown" class="dropdown-toggle" href="#">
                    <img
                      alt=""
                      src={require("../../images/avatar1_small.jpg")}
                    />
                    <span class="username">{me.name}</span>
                    <b class="caret" />
                  </a>
                </li>
              </ul>
            </div>
          </header>

          <aside>
            <div id="sidebar" class="nav-collapse">
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
                      <Link to="/add_category">Create</Link>
                    </li>
                    <li>
                      <a href="#">View</a>
                    </li>
                  </ul>
                </li>
                <li class="sub-menu">
                  <a href="javascript:;">
                    <i class="fa fa-book" />
                    <span>Stories</span>
                  </a>
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
                  <Link to="/">
                    <i class="fa fa-user" />
                    <span>Log Out</span>
                  </Link>
                </li>
              </ul>
            </div>
          </aside>

          <section id="main-content">
            <section class="wrapper">
              <div class="row">
                <div class="col-sm-12">
                  <section class="panel">
                    <header class="panel-heading">
                      All Users
                      <span class="tools pull-right">
                        <a href="javascript:;" class="fa fa-chevron-down" />
                      </span>
                    </header>
                    <div class="panel-body">
                      <div class="adv-table editable-table ">
                        <div class="space15" />
                        <table
                          class="table table-striped table-hover table-bordered"
                          id="editable-sample"
                        >
                          <thead>
                            <tr>
                              <th>Full Name</th>
                              <th>Email</th>
                              <th>Phone</th>

                              <th>Delete</th>
                            </tr>
                          </thead>
                          <tbody>
                            {users.map(user => (
                              <tr class="" key={user._id}>
                                <td>
                                  <a href="#">{user.name}</a>{" "}
                                </td>
                                <td>{user.email}</td>
                                <td>2347031239123 </td>

                                <td>
                                  <a class="delete" href="javascript:;">
                                    Delete
                                  </a>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
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

export default User;
