import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";
import axios from "axios";
import swal from "sweetalert";
import CustomNavBar from "../SideNav/CustomSideBar";

const token = localStorage.getItem("token");

class User extends Component {
  constructor(props) {
    super(props);
    this.state = {
      users: [],
      me: "",
      selectedUserId: null
    };
  }

  componentDidMount() {
    const token = localStorage.getItem("token");
    axios
      .get("https://dragon-legend-5.herokuapp.com/api/v1/user/all", {
        headers: { Authorization: token }
      })
      .then(res => {
        this.setState({ users: res.data.data });
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

  deleteUser = id => {
    axios
      .delete(
        `https://dragon-legend-5.herokuapp.com/api/v1/user/delete/${id}`,
        {
          headers: { Authorization: token }
        }
      )
      .then(res => {
        if (res.status === 200) {
          this.setState({
            message: "User Removed",
            selectedUserId: id
          });
          alert(`User removed ${id}`);
          window.location.reload();
        }
      })
      .catch(error => {
        if (error) {
          swal({
            icon: "warning",
            title: "Error removing user"
          });
        }
      });
  };

  logOut = () => {
    localStorage.clear("token");
    this.props.history.replace("/login");
  };

  render() {
    let { users, me } = this.state;
    return (
      <div>
        <Helmet>
          <meta charSet="utf-8" />
          <title>Users</title>
        </Helmet>
        <section id="container">
          <CustomNavBar />
          <section id="main-content">
            <section className="wrapper">
              <div className="row">
                <div className="col-sm-12">
                  <section className="panel">
                    <header className="panel-heading">
                      <h5 classNameName="new">All Users</h5>
                      <span className="tools pull-right">
                        <a href="javascript:;" className="fa fa-chevron-down" />
                      </span>
                    </header>
                    <div className="panel-body">
                      <div className="adv-table editable-table ">
                        <div className="space15" />
                        <table
                          className="table table-striped table-hover table-bordered"
                          id="editable-sample"
                        >
                          <thead>
                            <tr>
                              <th>Full Name</th>
                              <th>Email</th>
                              <th>Phone</th>

                              <th>Delete</th>
                            </tr>
                          </thead>
                          <tbody>
                            {users.map(user => (
                              <tr className="" key={user._id}>
                                <td
                                  
                                >
                                  {user.name}
                                </td>
                                <td
                                  
                                >
                                  {user.email}
                                </td>
                                <td>{user.phone} </td>

                                <td>
                                  <button className="btn btn-danger"
                                    onClick={() => {
                                      this.deleteUser(user._id);
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
        </section>
      </div>
    );
  }
}

export default User;
