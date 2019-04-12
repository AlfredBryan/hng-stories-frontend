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
                <li>
                  <input
                    type="text"
                    class="form-control search"
                    placeholder=" Search"
                  />
                </li>
                <li class="dropdown">
                  <a data-toggle="dropdown" class="dropdown-toggle" href="#">
                    <img
                      alt=""
                      src={require("../../images/avatar1_small.jpg")}
                    />
                    <span class="username">John Doe</span>
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
                  <a href="javascript:;">
                    <i class="fa fa-laptop" />
                    <span>Categories</span>
                  </a>
                  <ul class="sub">
                    <li>
                      <a href="#">Create</a>
                    </li>
                    <li>
                      <a href="view.php">View</a>
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
                  <Link to="/">
                    <i class="fa fa-user" />
                    <span>Log Out</span>
                  </Link>
                </li>
              </ul>
            </div>
          </aside>
          <section id="main-content" class="">
            <section class="wrapper">
              <div class="row">
                <div class="col-sm-12">
                  <section class="panel">
                    <header class="panel-heading">
                      All Categories
                      <span class="tools pull-right">
                        <a href="javascript:;" class="fa fa-chevron-down" />
                      </span>
                    </header>
                    <div class="panel-body">
                      <table
                        class="table table-striped table-hover table-bordered"
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
                            <tr class="">
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
