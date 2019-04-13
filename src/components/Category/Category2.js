import React from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";
import swal from "sweetalert";
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
        if (res.status === 200) {
          swal("Category Added");
        }
      })
      .catch(err => {
        if (err) {
          swal("Category Aready exists");
        }
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
        <Helmet>
          <meta charSet="utf-8" />
          <title>Category</title>
        </Helmet>
        <section id="container">
          {/*header start*/}
          <header className="header fixed-top clearfix">
            {/*logo start*/}
            <div className="brand">
              <a href="index.html" className="logo">
                <img src={require("../../images/logo.png")} alt="" />
              </a>
              <div className="sidebar-toggle-box">
                <div className="fa fa-bars" />
              </div>
            </div>
            {/*logo end*/}

            <div className="top-nav clearfix">
              {/*search & user info start*/}
              <ul className="nav pull-right top-menu">
                {/*user login dropdown start*/}
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
            <div id="sidebar" className="nav-collapse">
              {/*sidebar menu start*/}
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
              {/*sidebar menu end*/}
            </div>
          </aside>
          {/*sidebar end*/}
          {/*main content start*/}
          <section id="main-content">
            <section className="wrapper">
              <div className="row">
                <div className="col-md-12">
                  <section className="panel" />
                </div>
              </div>{" "}
              {/* End*/}
              {/*start of header*/}
              <div className="row">
                <div className="col-lg-12">
                  <section className="panel">
                    <header className="panel-heading">Add Categories</header>
                    <div className="panel-body">
                      <div className="position-center">
                        <form onSubmit={this.handleSubmit}>
                          <div className="form-group">
                            <label htmlFor="createCategoryText">
                              <h5 className="new">Add a new Category</h5>
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
                              style={{
                                fontFamily: "'Cute Font', cursive",
                                fontSize: "20px"
                              }}
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
