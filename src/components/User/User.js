import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";
import axios from "axios";

const token = localStorage.getItem("token");

class User extends Component {
  constructor(props) {
    super(props);
    this.state = {
      users: [],
      me: "",
      selectedUserId: null
    };
  }

  componentDidMount() {
    const token = localStorage.getItem("token");
    axios
      .get("https://dragon-legend-5.herokuapp.com/api/v1/user/all", {
        headers: { Authorization: token }
      })
      .then(res => {
        this.setState({ users: res.data.data });
      });
    this.getUser();
  }

  getUser = () => {
    let user = this.parseJwt(token);
    let userId = user._id;
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

  deleteUser = id => {
    axios
      .delete(
        `https://dragon-legend-5.herokuapp.com/api/v1/user/delete/${id}`,
        {
          headers: { Authorization: token }
        }
      )
      .then(res => {
        if (res.status === 200) {
          this.setState({
            message: "User Removed",
            selectedUserId: id
          });
          alert(`User removed ${id}`);
          window.location.reload();
        }
      });
  };

  logOut = () => {
    localStorage.clear("token");
    this.props.history.replace("/login");
  };

  render() {
    let { users, me } = this.state;
    return (
      <div>
        <Helmet>
          <meta charSet="utf-8" />
          <title>Users</title>
        </Helmet>
        <section id="container">
          <header className="header fixed-top clearfix">
            <div className="brand">
              <a href="index.html" className="logo">
                <img src={require("../../images/logo.png")} alt="" />
              </a>
              <div className="sidebar-toggle-box">
                <div className="fa fa-bars" />
              </div>
            </div>
            <div className="top-nav clearfix">
              <ul className="nav pull-right top-menu">
                <li className="dropdown">
                  <img alt="" src={me.image} />
                  <span
                    className="username"
                    style={{
                      fontFamily: "'Abril Fatface', cursive"
                    }}
                  >
                    {me.name}
                  </span>
                  <b className="caret" />
                </li>
              </ul>
            </div>
          </header>

          <aside>
            <div id="sidebar" className="nav-collapse">
              <ul className="sidebar-menu" id="nav-accordion">
                <li>
                  <Link to="/dashboard">
                    <i className="fa fa-dashboard" />
                    <span>Dashboard</span>
                  </Link>
                </li>
                <li className="sub-menu">
                  <Link to="/category">
                    <i className="fa fa-laptop" />
                    <span>Categories</span>
                  </Link>
                  <ul className="sub">
                    <li>
                      <Link to="/add_category">Create</Link>
                    </li>
                    <li>
                      <a href="#">View</a>
                    </li>
                  </ul>
                </li>
                <li className="sub-menu">
                  <Link to="/dashboard">
                    <i className="fa fa-book" />
                    <span>Stories</span>
                  </Link>
                  <ul className="sub">
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
                    <i className="fa fa-bullhorn" />
                    <span>Profile </span>
                  </Link>
                </li>
                <li>
                  <Link to="/user">
                    <i className="fa fa-users" />
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
                    <i className="fa fa-user" />
                    <span>Log Out</span>
                  </button>
                </li>
              </ul>
            </div>
          </aside>

          <section id="main-content">
            <section className="wrapper">
              <div className="row">
                <div className="col-sm-12">
                  <section className="panel">
                    <header className="panel-heading">
                      <h5 classNameName="new">All Users</h5>
                      <span className="tools pull-right">
                        <a href="javascript:;" className="fa fa-chevron-down" />
                      </span>
                    </header>
                    <div className="panel-body">
                      <div className="adv-table editable-table ">
                        <div className="space15" />
                        <table
                          className="table table-striped table-hover table-bordered"
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
                              <tr className="" key={user._id}>
                                <td
                                  style={{
                                    fontFamily: "'Abril Fatface', cursive"
                                  }}
                                >
                                  {user.name}
                                </td>
                                <td
                                  style={{
                                    fontFamily: "'Italiana', serif",
                                    fontWeight: "600"
                                  }}
                                >
                                  {user.email}
                                </td>
                                <td>{user.phone} </td>

                                <td>
                                  <button
                                    style={{
                                      backgroundColor: "white",
                                      color: "red",
                                      fontFamily: "'Cute Font', cursive"
                                    }}
                                    onClick={() => {
                                      this.deleteUser(user._id);
                                    }}
                                  >
                                    Delete
                                  </button>
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
