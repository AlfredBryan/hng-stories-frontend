import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const token = localStorage.getItem("token");

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      me: ""
    };
  }

  componentDidMount() {
    this.getUser();
  }

  getUser = () => {
    let user = this.parseJwt(token);
    let userId = user._id;
    console.log(user);
    axios
      .get(
        `https://dragon-legend-5.herokuapp.com/api/v1/user/profile/${userId}`
      )
      .then(res => {
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

  logOut = () => {
    localStorage.clear("token");
    this.props.history.replace("/login");
  };
  render() {
    let { me } = this.state;
    return (
      <div>
        <section id="container">
          {/* header start*/}
          <header className="header fixed-top clearfix">
            {/*logo start */}
            <div className="brand">
              <a href="index.html" className="logo">
                <img src={require("../../images/logo.png")} alt="" />
              </a>
              <div className="sidebar-toggle-box">
                <div className="fa fa-bars" />
              </div>
            </div>
            {/*logo end */}

            <div className="top-nav clearfix">
              {/*search & user info start */}
              <ul className="nav pull-right top-menu">
                {/*user login dropdown start */}
                <li className="dropdown">
                  <a
                    data-toggle="dropdown"
                    className="dropdown-toggle"
                    href="/"
                  >
                    <img alt="" src={me.image} />
                    <span className="username">{me.name}</span>
                    <b className="caret" />
                  </a>
                </li>
                {/*user login dropdown end */}
              </ul>
              {/*search & user and info end */}
            </div>
          </header>
          {/* header end*/}
          {/*sidebar start */}
          <aside>
            <div id="sidebar" className="nav-collapse">
              {/* sidebar menu start*/}
              <ul className="sidebar-menu" id="nav-accordion">
                <li>
                  <a href="index.html">
                    <i className="fa fa-dashboard" />
                    <span>Dashboard</span>
                  </a>
                </li>
                <li className="sub-menu">
                  <a href="javascript:;">
                    <i className="fa fa-laptop" />
                    <span>Categories</span>
                  </a>
                  <ul className="sub">
                    <li>
                      <a href="#">Create</a>
                    </li>
                    <li>
                      <a href="#">View</a>
                    </li>
                  </ul>
                </li>
                <li className="sub-menu">
                  <Link to="/dashboard">
                    <i class="fa fa-book" />
                    <span>Stories</span>
                  </Link>
                  <ul class="sub">
                    <li>
                      <a href="/add_story">Create</a>
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
              {/*sidebar menu end */}
            </div>
          </aside>
          {/*sidebar end */}
          {/* main content start*/}
          <section id="main-content">
            <section class="wrapper">
              <div class="row">
                <div class="col-sm-12">
                  <section class="panel">
                    <header class="panel-heading">
                      All Stories
                      <span class="tools pull-right">
                        <a href="javascript:;" class="fa fa-chevron-down" />
                      </span>
                    </header>
                    <div class="panel-body">
                      <div class="adv-table editable-table ">
                        <div class="clearfix">
                          <div class="btn-group">
                            <Link to="/add_story">
                              <button
                                id="editable-sample_new"
                                class="btn btn-primary"
                              >
                                Add New Story <i class="fa fa-plus" />
                              </button>
                            </Link>
                          </div>
                        </div>
                        <div class="space15" />
                        <table
                          class="table table-striped table-hover table-bordered"
                          id="editable-sample"
                        >
                          <thead>
                            <tr>
                              <th>Book titles</th>
                              <th>Genre</th>
                              <th>Age Limit</th>
                              <th>Edit</th>
                              <th>Delete</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr class="">
                              <td>
                                <a href="#">Alice in wonderland</a>{" "}
                              </td>
                              <td>Thriller </td>
                              <td>0 - 3 </td>
                              <td>
                                <a class="edit" href="javascript:;">
                                  Edit
                                </a>
                              </td>
                              <td>
                                <a class="delete" href="javascript:;">
                                  Delete
                                </a>
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </section>
                </div>
              </div>
            </section>
          </section>
          {/*main content end */}
        </section>
      </div>
    );
  }
}
export default Dashboard;
