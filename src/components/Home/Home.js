import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink
} from "reactstrap";
import "../../index.css";
import React, { Component } from "react";
import { Helmet } from "react-helmet";

class Home extends Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      isOpen: false
    };
  }
  toggle() {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }
  render() {
    return (
      <div>
        <Helmet>
          <meta charSet="utf-8" />
          <title>HNG Admin Panel</title>
        </Helmet>
        <div id="home-section">
          <Navbar
            color="light"
            light
            expand="md"
            fixed="top"
            style={{
              background: "rgba(0,0,0,0.009) !important",
              color: "#fff !important"
            }}
          >
            <NavbarBrand href="/">
              <img src={require("../../images/Kidslogo.png")} alt="" />
            </NavbarBrand>
            <NavbarToggler onClick={this.toggle} />
            <Collapse isOpen={this.state.isOpen} navbar>
              <Nav className="ml-auto" navbar>
                <NavItem>
                  <NavLink
                    href="/"
                    className="nav-link flex-center bg-gray radius-5px transition-3"
                  >
                    <span style={{ padding: "15px 30px", color: "#fff" }}>
                      <b>Home</b>
                    </span>
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink
                    href="/login"
                    className="nav-link flex-center bg-blue radius-5px transition-3"
                  >
                    <span style={{ padding: "15px 25px", color: "#fff" }}>
                      <b>Login</b>
                    </span>
                  </NavLink>
                </NavItem>
              </Nav>
            </Collapse>
          </Navbar>

          <section class="main-header main-2">
            <div class="container">
              <div class="row">
                <div class="col-12 col-lg-5">
                  <div class="header-content">
                    <h1 class="title">
                      Get personalized Bedtime Stories
                      <br />
                      Tailored just for your kids{" "}
                    </h1>

                    <p class="text">
                      Read free bedtime stories, fairy tales, poems and short
                      stories for kids
                    </p>

                    <a
                      href="https://play.google.com/store/apps/details?id=com.dragonlegend.kidstories"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="google-button"
                    >
                      <img src={require("../../img/play.svg")} alt="" />
                      <span>Get it on</span> Google Play
                    </a>
                  </div>
                </div>

                <div class="col-12 col-lg-7 d-none d-lg-block">
                  <div class="image">
                    <img
                      class="img-fluid"
                      src={require("../../img/shape-3.svg")}
                      alt="header"
                    />
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section class="features">
            <div class="container">
              <div class="section-header text-center">
                <h4 class="section-text">
                  Some Of Our
                  <br />
                  Amazing <span>features</span>
                </h4>
              </div>

              <div class="row">
                <div class="col-12 col-sm-12 col-md-6 col-lg-4">
                  <div class="item">
                    <img
                      class="img-fluid"
                      src={require("../../img/source/feature-1.png")}
                      alt="BedTime Stories"
                    />

                    <h4 class="title">Amazing Stories</h4>

                    <p class="text">
                      Read amazing stories from different categories all over
                      the world
                    </p>
                  </div>
                </div>

                <div class="col-12 col-sm-12 col-md-6 col-lg-4">
                  <div class="item">
                    <img
                      class="img-fluid"
                      src={require("../../img/source/feature-2.png")}
                      alt="BedTime Stories"
                    />

                    <h4 class="title">Create your own stories</h4>

                    <p class="text">
                      Contribute to stories read by millions of people
                    </p>
                  </div>
                </div>

                <div class="col-12 col-sm-12 col-md-6 col-lg-4">
                  <div class="item">
                    <img
                      class="img-fluid"
                      src={require("../../img/source/feature-1.png")}
                      alt="BedTime Stories"
                    />

                    <h4 class="title">Modern And Creative</h4>

                    <p class="text">
                      Easily access stories for your kids wherever you are.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section class="mt-30">
            <div class="container">
              <div class="row">
                <div class="col-12 col-lg-5 m-auto">
                  <div class="section-header text-left">
                    <p class="section-title">Who Are We</p>

                    <h4 class="section-text">
                      Bedtime
                      <br />
                      <span>Stories</span>
                    </h4>

                    <p class="section-description">
                      Bedtime Stories is an app that gives parents a plethora of
                      stories from around the world and from a wide range of
                      categories. Through the app, parents can read stories to
                      their kids, create their own stories and bookmark their
                      favorite stories for future reading.
                    </p>
                  </div>
                </div>
                <div class="col-12 col-lg-7">
                  <div class="mb-5">
                    <img
                      class="img-fluid"
                      src={require("../../img/source/about.png")}
                      alt="Work"
                    />
                  </div>
                </div>
              </div>
            </div>
          </section>

          <footer class="footer pt-4">
            <div class="container">
              <div class="row">
                <div class="col-12 mt-3">
                  <p class="copyright">
                    &copy; 2019 BedTime Stories. All Rights Reversed.
                  </p>
                </div>
              </div>
            </div>
          </footer>
        </div>
      </div>
    );
  }
}

export default Home;
