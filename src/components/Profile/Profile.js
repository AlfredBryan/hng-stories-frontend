import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";
import axios from "axios";

const token = localStorage.getItem("token");

class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: "",
      name: "",
      image: ""
    };
  }

  componentDidMount() {
    let user = this.parseJwt(token);
    let userId = user._id;
    axios
      .get(
        `https://dragon-legend-5.herokuapp.com/api/v1/user/profile/${userId}`,
        { headers: { Authorization: token } }
      )
      .then(res => {
        console.log(res.data);
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

  handleImageChange = e => {
    e.preventDefault();
    let imageFile = e.target.files[0];
    this.setState({ [e.target.name]: imageFile });
  };

  handlTextChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  updateInfo = e => {
    e.preventDefault();
    let user = this.parseJwt(token);
    let userId = user._id;
    const { name, image } = this.state;
    const formData = new FormData();
    formData.set("name", name);
    formData.append("image", image);
    axios(
      {
        method: "put",
        url: `https://dragon-legend-5.herokuapp.com/api/v1/user/edit/${userId}`,
        data: formData,
        config: {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: token
          }
        }
      },
      this.setState({ loading: true })
    ).then(res => {
      console.log(res);
      if (res.status === 200) {
      }
    });
  };

  logOut = () => {
    localStorage.clear("token");
    this.props.history.replace("/login");
  };
  render() {
    let { user } = this.state;
    return (
      <div>
        <Helmet>
          <meta charSet="utf-8" />
          <title>DASHBOARD</title>
        </Helmet>
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
                  <img alt="" src={user.image} />
                  <span
                    class="username"
                    style={{
                      fontFamily: "'Abril Fatface', cursive"
                    }}
                  >
                    {user.name}
                  </span>
                  <b class="caret" />
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
                          <Link
                            style={{
                              fontFamily: "'Cute Font', cursive",
                              fontSize: "30px"
                            }}
                            to="/add_story"
                            class="btn btn-primary"
                          >
                            Add Story
                          </Link>
                        </div>
                      </div>
                      <div class="col-md-3">
                        <div class="profile-statistics">
                          <h1>{user.bookmark_count}</h1>
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
                    <header class="panel-heading new">Edit Profile</header>
                    <div class="panel-body">
                      <div class="position-center">
                        <form
                          encType="multipart/form-data"
                          onSubmit={this.updateInfo}
                        >
                          <div class="form-group">
                            <input
                              type="text"
                              class="form-control"
                              id="name"
                              name="name"
                              placeholder="Enter Full Name"
                              value={this.state.name}
                              onChange={this.handlTextChange}
                            />
                          </div>
                          <div class="form-group">
                            <label htmlFor="image">Change Profile Photo</label>
                            <input
                              type="file"
                              id="image"
                              name="image"
                              onChange={this.handleImageChange}
                            />
                            <p class="help-block">Format: PNG, JPG (1MB)</p>
                          </div>
                          <div class="form-group">
                            <button
                              onClick={this.updateInfo}
                              type="submit"
                              class="btn btn-info"
                            >
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
