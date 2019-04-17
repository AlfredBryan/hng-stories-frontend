import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem
} from "reactstrap";
import "../../index.css";
import React, { Component } from "react";
import { Link } from "react-router-dom";
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
        <Navbar color="transparent" light expand="md" fixed="top" 
          style={{
                background: "rgba(0,0,0,0.009) !important",
                color: "#fff !important"
          }}
          >
          <NavbarBrand href="/"
          >
            <img src={require("../../images/Kidslogo.png")} alt="" />
          </NavbarBrand>
          <NavbarToggler onClick={this.toggle} />
          <Collapse isOpen={this.state.isOpen} navbar>
            <Nav className="ml-auto" navbar>
              <NavItem>
                <NavLink href="/" className="nav-link flex-center bg-gray radius-5px transition-3">
                  <span style={{ padding: "15px 30px", color: "#fff" }}><b>Home</b></span>
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink href="/login" className="nav-link flex-center bg-blue radius-5px transition-3">
                  <span style={{ padding: "15px 25px", color: "#fff" }}><b>Login</b></span>
                </NavLink>
              </NavItem>
            </Nav>
          </Collapse>
        </Navbar>

        <section
          className="welcome-area md-padding p-relative o-hidden"
          data-scroll-index="1"
        >
          <div className="container">
            <div className="row welcome-text sec-padding flex-center">
              <div className="col-md-6 mb-30px z-index-1 lead-text">
                <h1 className="mb-15px padding-right-md mt-n5 ">
                  Get personalized Bedtime stories tailored just for your kids{" "}
                </h1>
                <p>
                  Read free bedtime stories, fairy tales, poems and short
                  stories for kids
                </p>
                <a className="main-btn btn-3 mt-30px" href="#" data-lity>
                  <i className="fa fa-google-play" /> Download Our App
                </a>
              </div>
              <div className="col-md-6 text-right mr-n3 mt-n5 main-img">
                <img alt="imghome" src={require("../../images/baby.png")} />
              </div>
            </div>
          </div>
          <div className="shape-1 bg-gray p-absolute" />
        </section>
      </div>
    );
  }
}

export default Home;
