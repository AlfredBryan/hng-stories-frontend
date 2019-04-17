import React from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";
import swal from "sweetalert";
import axios from "axios";
import CustomNavBar from "../SideNav/CustomSideBar";

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
          swal({
            icon: "success",
            title: "Category Added"
          });
        }
      })
      .catch(err => {
        if (err) {
          swal({
            icon: "warning",
            title: "Category Already Exists"
          });
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
          <CustomNavBar />
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
                              <h5
                                style={{
                                  color: "white",
                                  fontSize: "30px",
                                  fontFamily: "'Abril Fatface', cursive"
                                }}
                              >
                                Add a new Category
                              </h5>
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
