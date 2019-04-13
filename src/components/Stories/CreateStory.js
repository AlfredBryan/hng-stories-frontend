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
          <header className="header fixed-top clearfix">
            {/* logo start*/}
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
                {/*user login dropdown end */}
              </ul>
              {/*search & user info end */}
            </div>
          </header>
          {/*header end */}
          <aside>
            <div id="sidebar" className="nav-collapse">
              {/*sidebar menu start */}
              <ul className="sidebar-menu" id="nav-accordion">
                <li>
                  <a href="index.html">
                    <i className="fa fa-dashboard" />
                    <span>Dashboard</span>
                  </a>
                </li>
                <li className="sub-menu">
                  <Link to="/category">
                    <i className="fa fa-laptop" />
                    <span>Categories</span>
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
                  <Link to="/">
                    <i className="fa fa-user" />
                    <span>Log Out</span>
                  </Link>
                </li>
              </ul>
              {/* sidebar menu end*/}
            </div>
          </aside>
          {/*sidebar end */}
          {/*main content start */}
          <section id="main-content" className="">
            <section className="wrapper">
              {/*page start */}

              {/*start of header */}
              <div className="row">
                <div className="col-lg-12">
                  <section className="panel">
                    <header className="panel-heading new">Add Story</header>
                    <div className="panel-body">
                      <div className="position-center">
                        <form
                          encType="multipart/form-data"
                          onSubmit={this.submitHandler}
                        >
                          <div className="form-group">
                            <input
                              type="text"
                              className="form-control"
                              id="title"
                              name="title"
                              placeholder="Title"
                              value={this.state.title}
                              onChange={this.handleChange}
                              required
                            />
                          </div>
                          <div className="form-group">
                            <label htmlFor="category">Select Category</label>
                            <select
                              value={this.state.category}
                              className="form-control m-bot15"
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
                          <div className="form-group">
                            <label htmlFor="exampleInputFile">Add Image</label>
                            <input
                              type="file"
                              id="image"
                              name="image"
                              onChange={this.handleImageChange}
                            />
                            <p className="help-block">Format: PNG, JPG (1MB)</p>
                          </div>
                          <div className="form-group">
                            <label htmlFor="story">Story</label>
                            <textarea
                              className="form-control ckeditor"
                              name="story"
                              rows="6"
                              onChange={this.handleChange}
                              value={this.state.story}
                              required
                            />
                          </div>
                          <div className="form-group">
                            <button
                              style={{
                                fontFamily: "'Cute Font', cursive",
                                fontSize: "30px"
                              }}
                              onClick={this.submitHandler}
                              type="submit"
                              className="btn btn-info"
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
