import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";
import swal from "sweetalert";
import axios from "axios";
import CustomNavBar from "../SideNav/CustomSideBar";

const token = localStorage.getItem("token");

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      me: "",
      stories: [],
      selectedStoryId: null
    };
  }

  componentDidMount() {
    axios
      .get("https://dragon-legend-5.herokuapp.com/api/v1/story")
      .then(res => {
        this.setState({ stories: res.data.data.stories });
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

  deleteStory = id => {
    axios
      .delete(
        `https://dragon-legend-5.herokuapp.com/api/v1/story/delete/${id}`,
        {
          headers: { Authorization: token }
        }
      )
      .then(res => {
        if (res.status === 200) {
          this.setState({
            message: "Story Removed",
            selectedStoryId: id
          });
          swal({
            icon: "success",
            title: `Story Removed with id ${id}`
          }).then(res => {
            window.location.reload();
          });
        }
      });
  };

  logOut = () => {
    localStorage.clear("token");
    this.props.history.replace("/login");
  };
  render() {
    let { me, stories } = this.state;
    return (
      <div>
        <Helmet>
          <meta charSet="utf-8" />
          <title>Stories</title>
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
                        <Link to="/add_story">
                          <button
                            id="editable-sample_new"
                            className="btn btn-primary "
                          >
                            Add New Story <i className="fa fa-plus" />
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
                        All Stories
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
                              <th>Story titles</th>
                              <th>Likes</th>
                              <th>Delete</th>
                            </tr>
                          </thead>
                          <tbody>
                            {stories.map(story => (
                              <tr key={story._id}>
                                <td>{story.title}</td>
                                <td
                                  style={{
                                    fontFamily: "'Italiana', serif",
                                    fontWeight: "600"
                                  }}
                                >
                                  {story.likes.length}
                                </td>
                                <td>
                                  <button
                                    className="btn btn-danger"
                                    onClick={() => {
                                      this.deleteStory(story._id);
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
export default Dashboard;
