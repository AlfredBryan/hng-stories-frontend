import React from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const token = localStorage.getItem("token");

class Category2 extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      me: ""
    };
  }

  componentDidMount() {
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

  handleChange = event => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
    console.log("Working");
  };

  handleSubmit = event => {
    event.preventDefault();
    const token = localStorage.getItem("token");
    let { name } = this.state;
    axios
      .post(
        "https://dragon-legend-5.herokuapp.com/api/v1/category/create",
        {
          name
        },
        {
          headers: { Authorization: token }
        }
      )
      .then(res => {
        console.log(res);
        if (res.status === 200) {
          console.log("Working");
        }
      })
      .catch(err => {
        console.log(err);
      });
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
                    <img alt="" src={me.image} />
                    <span class="username">{me.name}</span>
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
                  <section class="panel" />
                </div>
              </div>{" "}
              {/* End*/}
              {/*start of header*/}
              <div class="row">
                <div class="col-lg-12">
                  <section class="panel">
                    <header class="panel-heading">Add Categories</header>
                    <div class="panel-body">
                      <div class="position-center">
                        <form onSubmit={this.handleSubmit}>
                          <div className="form-group">
                            <label for="createCategoryText">
                              Add a new Category
                            </label>
                            <input
                              onChange={this.handleChange}
                              value={this.state.name}
                              name="name"
                              type="text"
                              className="form-control"
                              id="name"
                              placeholder="Enter new category"
                            />
                          </div>
                          <div className="form-group">
                            <button
                              onClick={this.handleSubmit}
                              type="submit"
                              className="btn btn-primary"
                            >
                              submit
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

export default Category2;
