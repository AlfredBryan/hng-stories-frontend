import React, { Component } from "react";
import { Link } from "react-router-dom";

class CreateStory extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  logOut = () => {
    localStorage.clear("token");
    this.props.history.replace("/login");
  };

  render() {
    return (
      <div>
        <section id="container">
          {/*header start */}
          <header class="header fixed-top clearfix">
            {/* logo start*/}
            <div class="brand">
              <a href="index.html" class="logo">
                <img src={require("../../images/logo.png")} alt="" />
              </a>
              <div class="sidebar-toggle-box">
                <div class="fa fa-bars" />
              </div>
            </div>
            {/*logo end */}

            <div class="top-nav clearfix">
              {/*search & user info start */}
              <ul class="nav pull-right top-menu">
                {/*user login dropdown start */}
                <li class="dropdown">
                  <a data-toggle="dropdown" class="dropdown-toggle" href="/">
                    <img
                      alt=""
                      src={require("../../images/avatar1_small.jpg")}
                    />
                    <span class="username">John Doe</span>
                    <b class="caret" />
                  </a>
                </li>
                {/*user login dropdown end */}
              </ul>
              {/*search & user info end */}
            </div>
          </header>
          {/*header end */}
          <aside>
            <div id="sidebar" class="nav-collapse">
              {/*sidebar menu start */}
              <ul class="sidebar-menu" id="nav-accordion">
                <li>
                  <a href="index.html">
                    <i class="fa fa-dashboard" />
                    <span>Dashboard</span>
                  </a>
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
                      <a href="#">View</a>
                    </li>
                  </ul>
                </li>
                <li class="sub-menu">
                  <Link to="dashboard/">
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
              {/* sidebar menu end*/}
            </div>
          </aside>
          {/*sidebar end */}
          {/*main content start */}
          <section id="main-content" class="">
            <section class="wrapper">
              {/*page start */}

              {/*start of header */}
              <div class="row">
                <div class="col-lg-12">
                  <section class="panel">
                    <header class="panel-heading">Add Story</header>
                    <div class="panel-body">
                      <div class="position-center">
                        <form>
                          <div class="form-group">
                            <label for="exampleInputEmail1">Title</label>
                            <input
                              type="text"
                              class="form-control"
                              id="exampleInputEmail1"
                              placeholder="Enter email"
                            />
                          </div>
                          <div class="form-group">
                            <label for="exampleInputEmail1">
                              Select Category
                            </label>
                            <select class="form-control m-bot15">
                              <option>Fairy Tale</option>
                            </select>
                          </div>
                          <div class="form-group">
                            <label for="exampleInputFile">Add Image</label>
                            <input type="file" id="exampleInputFile" />
                            <p class="help-block">Format: PNG, JPG (1MB)</p>
                          </div>
                          <div class="form-group">
                            <label for="exampleInputEmail1">Description</label>
                            <textarea
                              class="form-control ckeditor"
                              name="editor1"
                              rows="6"
                            />
                          </div>
                          <div class="form-group">
                            <label for="exampleInputEmail1">Age Filter</label>
                            <select class="form-control m-bot15">
                              <option>0 - 3</option>
                              <option>4 - 7</option>
                              <option>10 - 11</option>
                            </select>
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
              {/* page end*/}
            </section>
          </section>
          {/*main content end */}
        </section>
      </div>
    );
  }
}

export default CreateStory;
