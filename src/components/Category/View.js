import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

class View extends Component {
  constructor(props) {
    super(props);
    this.state = {
      stories: []
    };
  }

  componentDidMount() {
    axios
      .get("https://dragon-legend-5.herokuapp.com/api/v1/story")
      .then(res => {
        console.log(res.data.data.stories);
        this.setState({ stories: res.data.data.stories });
      });
  }

  render() {
    let { stories } = this.state;
    return (
      <div>
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
                <li>
                  <input
                    type="text"
                    className="form-control search"
                    placeholder=" Search"
                  />
                </li>
                <li className="dropdown">
                  <a
                    data-toggle="dropdown"
                    className="dropdown-toggle"
                    href="#"
                  >
                    <img
                      alt=""
                      src={require("../../images/avatar1_small.jpg")}
                    />
                    <span className="username">John Doe</span>
                    <b className="caret" />
                  </a>
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
                  <a href="javascript:;">
                    <i className="fa fa-laptop" />
                    <span>Categories</span>
                  </a>
                  <ul className="sub">
                    <li>
                      <a href="#">Create</a>
                    </li>
                    <li>
                      <a href="view.php">View</a>
                    </li>
                  </ul>
                </li>
                <li className="sub-menu">
                  <a href="javascript:;">
                    <i className="fa fa-book" />
                    <span>Stories</span>
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
                <li>
                  <Link to="/profile">
                    <i className="fa fa-bullhorn" />
                    <span>Profile </span>
                  </Link>
                </li>

                <li>
                  <Link to="/">
                    <i className="fa fa-user" />
                    <span>Log Out</span>
                  </Link>
                </li>
              </ul>
            </div>
          </aside>
          <section id="main-content" className="">
            <section className="wrapper">
              <div className="row">
                <div className="col-sm-12">
                  <section className="panel">
                    <header className="panel-heading">
                      All Categories
                      <span className="tools pull-right">
                        <a href="javascript:;" className="fa fa-chevron-down" />
                      </span>
                    </header>
                    <div className="panel-body">
                      <table
                        className="table table-striped table-hover table-bordered"
                        id="editable-sample"
                      >
                        <thead>
                          <tr>
                            <th>Story Title</th>
                            <th>Likes</th>
                            <th>Delete</th>
                          </tr>
                        </thead>
                        <tbody>
                          {stories.map(story => (
                            <tr className="">
                              <td>{story.title}</td>
                              <td>new</td>

                              <td>
                                <button
                                  onClick={() => {
                                    this.deleteUser();
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

export default View;
