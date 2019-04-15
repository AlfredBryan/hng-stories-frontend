import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";
import axios from "axios";
import CustomNavBar from "../SideNav/CustomSideBar";

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
    axios({
      method: "put",
      url: `https://dragon-legend-5.herokuapp.com/api/v1/user/edit/${userId}`,
      data: formData,
      config: {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: token
        }
      }
    }).then(res => {
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
          <CustomNavBar />
          <section id="main-content">
            <section className="wrapper">
              <div className="row">
                <div className="col-md-12">
                  <section className="panel">
                    <div className="panel-body profile-information">
                      <div className="col-md-3">
                        <div className="profile-pic text-center">
                          <img src={user.image} alt="" />
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="profile-desk">
                          <h1>{user.name}</h1>
                          <span className="text-muted">
                            Email: {user.email}{" "}
                          </span>
                          <br />
                          <Link
                            style={{
                              fontFamily: "'Cute Font', cursive",
                              fontSize: "30px"
                            }}
                            to="/add_story"
                            className="btn btn-primary"
                          >
                            Add Story
                          </Link>
                        </div>
                      </div>
                      <div className="col-md-3">
                        <div className="profile-statistics">
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
              <div className="row">
                <div className="col-lg-12">
                  <section className="panel">
                    <header className="panel-heading new">Edit Profile</header>
                    <div className="panel-body">
                      <div className="position-center">
                        <form
                          encType="multipart/form-data"
                          onSubmit={this.updateInfo}
                        >
                          <div className="form-group">
                            <input
                              type="text"
                              className="form-control"
                              id="name"
                              name="name"
                              placeholder="Enter Full Name"
                              value={this.state.name}
                              onChange={this.handlTextChange}
                            />
                          </div>
                          <div className="form-group">
                            <label htmlFor="image">Change Profile Photo</label>
                            <input
                              type="file"
                              id="image"
                              name="image"
                              onChange={this.handleImageChange}
                            />
                            <p className="help-block">Format: PNG, JPG (1MB)</p>
                          </div>
                          <div className="form-group">
                            <button
                              onClick={this.updateInfo}
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
            </section>
          </section>
        </section>
      </div>
    );
  }
}

export default Profile;
