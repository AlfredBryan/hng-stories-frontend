import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";
import swal from "sweetalert";
import axios from "axios";
import CustomNavBar from "../SideNav/CustomSideBar";

const token = localStorage.getItem("token");

class Category extends Component {
  constructor(props) {
    super(props);
    this.state = {
      me: "",
      category: [],
      selectedCatId: ""
    };
  }

  componentDidMount() {
    axios
      .get("https://dragon-legend-5.herokuapp.com/api/v1/category/all")
      .then(res => {
        this.setState({ category: res.data.data });
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

  deleteCategory = id => {
    axios
      .delete(
        `https://dragon-legend-5.herokuapp.com/api/v1/category/delete/${id}`,
        {
          headers: { Authorization: token }
        }
      )
      .then(res => {
        console.log(res);
        if (res.status === 200) {
          this.setState({
            message: "Category Removed",
            selectedCatId: id
          });
          swal({
            icon: "success",
            title: `Category Removed with id  ${id}`
          }).then(res => {
            window.location.reload();
          });
        }
      })
      .catch(error => {
        if (error) {
          swal({
            icon: "warning",
            title: `Error: This category has stories ${id}`
          });
        }
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

  logOut = () => {
    localStorage.clear("token");
    this.props.history.replace("/login");
  };

  render() {
    let { me, category } = this.state;
    return (
      <div>
        <Helmet>
          <meta charSet="utf-8" />
          <title>Category</title>
        </Helmet>
        <section id="container" className="container-fluid">
          {/* header start*/}
          <CustomNavBar />
          {/* main content start*/}
          <section id="main-content">
            <section className="wrapper">
              <div className="row">
                <div className="col-sm-12">
                  <section className="panel">
                    <header className="panel-heading">
                      <div className="btn-group btn-add">
                        <Link to="/add_category">
                          <button
                            id="editable-sample_new"
                            className="btn btn-primary "
                          >
                            Add New Category <i className="fa fa-plus" />
                          </button>
                        </Link>
                      </div>
                      <h5
                        style={{
                          color: "white",
                          fontSize: "30px",
                          fontFamily: "'Abril Fatface', cursive"
                        }}
                        classNameName="new"
                      >
                        All Categories
                      </h5>
                    </header>
                    <div className="panel-body">
                      <div className="adv-table editable-table ">
                        <div className="clearfix" />
                        <div className="space15" />
                        <table
                          className="table table-striped table-hover table-bordered"
                          id="editable-sample"
                        >
                          <thead>
                            <tr>
                              <th>Categories</th>
                              <th>Remove</th>
                            </tr>
                          </thead>
                          <tbody>
                            {category.map(cat => (
                              <tr className="" key={cat._id}>
                                <td>{cat.name}</td>
                                <td>
                                  <button
                                    className="btn btn-danger btn-small"
                                    onClick={() => {
                                      this.deleteCategory(cat._id);
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
                    </div>
                  </section>
                </div>
              </div>
            </section>
          </section>
          {/*main content end */}
        </section>
      </div>
    );
  }
}

export default Category;
