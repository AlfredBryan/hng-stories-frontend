import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";
import swal from "sweetalert";
import axios from "axios";
import CustomNavBar from "../SideNav/CustomSideBar";

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
    })
      .then(res => {
        swal({
          icon: "success",
          title: "Story Added Successfully"
        });
      })
      .catch(error => {
        if (error) {
          swal({
            icon: "warning",
            title: "Error Adding story"
          });
        }
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
        <section id="container" className="container-fluid">
          {/*header start */}
          <CustomNavBar />
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
                              name="category"
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
                              style={{
                                fontFamily: "'Cute Font'",
                              }}
                              onClick={this.submitHandler}
                              type="submit"
                              class="btn btn-primary btn-sm"
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
