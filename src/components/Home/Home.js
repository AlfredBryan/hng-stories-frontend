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
        <nav class="navbar navbar-transparent navbar-black-links navbar-expand-lg">
          <div class="container">
           <div class="navbar-header">
            <div class="row mt-30px">
              <Link class="navbar-brand w-25 pl-4 pb-2" to="/">
                <img src={require("../../images/Kidslogo.png")} alt="logo" />
              </Link>
            </div>
            <button
              class="navbar-toggle"
              type="button"
              data-toggle="collapse"
              data-target="#main-navbar"
              aria-controls="main-navbar"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span class="fa fa-bars" />
            </button>
           </div>
            <div class="collapse navbar-collapse" id="main-navbar">
              <ul class="navbar-nav navbar-right ml-auto">
                <li class="nav-item">
                  <Link class="nav-link" to="/" data-scroll-nav="1">
                    Home
                  </Link>
                </li>
                <li class="nav-item log-in">
                  <Link
                    class="nav-link flex-center bg-blue radius-5px transition-3"
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
          class="welcome-area md-padding p-relative o-hidden"
          data-scroll-index="1"
        >
          <div class="container">
            <div class="row welcome-text sec-padding flex-center">
              <div class="col-md-6 mb-30px z-index-1">
                <h1 class="mb-15px padding-right-md mt-n5">
                  Get personalized Bedtime stories tailored just for your kids{" "}
                </h1>
                <p>
                  Read free bedtime stories, fairy tales, poems and short
                  stories for kids
                </p>
                <a class="main-btn btn-3 mt-30px" href="#" data-lity>
                  <i class="fa fa-google-play" /> Download Our App
                </a>
              </div>
              <div class="col-md-6 text-center main-img">
                <img alt="imghome" src={require("../../images/baby.png")} />
              </div>
            </div>
          </div>
          <div class="shape-1 bg-gray p-absolute" />
        </section>
      </div>
    );
  }
}

export default Home;
