import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";
import axios from "axios";

const token = localStorage.getItem("token");

class CreateStory extends Component {
  state = {
    categories: [],
    story: "",
    image: null,
    title: "",
    category: "",
    me: ""
  };

  componentDidMount() {
    axios
      .get(`https://dragon-legend-5.herokuapp.com/api/v1/category/all`, {
        headers: { Authorization: token }
      })
      .then(res => {
        this.setState({ categories: res.data.data });
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

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleImageChange = e => {
    e.preventDefault();
    let imageFile = e.target.files[0];
    this.setState({ [e.target.name]: imageFile });
  };

  submitHandler = e => {
    e.preventDefault();
    const { story, image, title, category } = this.state;
    const formData = new FormData();
    formData.set("title", title);
    formData.set("category", category);
    formData.set("story", story);
    formData.append("image", image);
    axios({
      method: "post",
      url: "https://dragon-legend-5.herokuapp.com/api/v1/story/create",
      data: formData,
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: token
      }
    }).then(res => {
      console.log(res);
      alert(`Successfully posted your story`);
    });
  };

  render() {
    let { me } = this.state;
    return (
      <div>
        <Helmet>
          <meta charSet="utf-8" />
          <title>Create Story</title>
        </Helmet>
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
                    <img alt="" src={me.image} />
                    <span class="username">{me.name}</span>
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
                  <Link to="/">
                    <i class="fa fa-user" />
                    <span>Log Out</span>
                  </Link>
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
                    <header class="panel-heading new">Add Story</header>
                    <div class="panel-body">
                      <div class="position-center">
                        <form
                          encType="multipart/form-data"
                          onSubmit={this.submitHandler}
                        >
                          <div class="form-group">
                            <label for="title">Title</label>
                            <input
                              type="text"
                              class="form-control"
                              id="title"
                              name="title"
                              placeholder="Title"
                              value={this.state.title}
                              onChange={this.handleChange}
                              required
                            />
                          </div>
                          <div class="form-group">
                            <label for="category">Select Category</label>
                            <select
                              value={this.state.category}
                              class="form-control m-bot15"
                              onChange={this.handleChange}
                              required
                            >
                              {this.state.categories.map(category => {
                                return (
                                  <option key={category._id}>
                                    {category.name}
                                  </option>
                                );
                              })}
                            </select>
                          </div>
                          <div class="form-group">
                            <label for="exampleInputFile">Add Image</label>
                            <input
                              type="file"
                              id="image"
                              name="image"
                              onChange={this.handleImageChange}
                            />
                            <p class="help-block">Format: PNG, JPG (1MB)</p>
                          </div>
                          <div class="form-group">
                            <label for="story">Story</label>
                            <textarea
                              class="form-control ckeditor"
                              name="story"
                              rows="6"
                              onChange={this.handleChange}
                              value={this.state.story}
                              required
                            />
                          </div>
                          <div class="form-group">
                            <button
                              onClick={this.submitHandler}
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
