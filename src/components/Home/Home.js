import "../../index.css";
import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";

class Home extends Component {
  render() {
    return (
      <div>
        <Helmet>
          <meta charSet="utf-8" />
          <title>HNG Admin Panel</title>
        </Helmet>
        <nav className="navbar navbar-transparent navbar-black-links navbar-expand-lg">
          <div className="container">
            <div className="navbar-header">
              <div className="row mt-30px">
                <Link className="navbar-brand w-25 pl-4 pb-2" to="/">
                  <img src={require("../../images/Kidslogo.png")} alt="logo" />
                </Link>
              </div>
              <button
                className="navbar-toggler"
                type="button"
                data-toggle="collapse"
                data-target="#main-navbar"
                aria-controls="main-navbar"
                aria-expanded="false"
                aria-label="Toggle navigation"
              >
                <span className="fa fa-bars" />
              </button>
            </div>
            <div className="collapse navbar-collapse" id="main-navbar">
              <ul className="navbar-nav navbar-right ml-auto">
                <li className="nav-item">
                  <Link
                    style={{
                      fontFamily: "'Cute Font', cursive",
                      fontSize: "30px"
                    }}
                    className="nav-link"
                    to="/"
                    data-scroll-nav="1"
                  >
                    Home
                  </Link>
                </li>
                <li className="nav-item log-in">
                  <Link
                    style={{
                      fontFamily: "'Cute Font', cursive",
                      fontSize: "30px"
                    }}
                    className="nav-link flex-center bg-blue radius-5px transition-3"
                    to="/login"
                  >
                    Log In
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </nav>

        <section
          className="welcome-area md-padding p-relative o-hidden"
          data-scroll-index="1"
        >
          <div className="container">
            <div className="row welcome-text sec-padding flex-center">
              <div className="col-md-6 mb-30px z-index-1">
                <h1 className="mb-15px padding-right-md mt-n5">
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
              <div className="col-md-6 text-center main-img">
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
