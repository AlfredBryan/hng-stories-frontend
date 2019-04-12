import React, { Component } from "react";
import "./App.css";
import User from "./components/User/User";
import Profile from "./components/Profile/Profile";
import CreateStory from "./components/Stories/CreateStory";
import Dashboard from "./components/Dashboard/Dashboard";
import Login from "./components/User/Login";
import { Switch, Route } from "react-router-dom";
import Register from "./components/User/Register";
import Category2 from "./components/Category/Category2";
import Authenticate from "./components/hoc/ProtectedRoute";
import Category from "./components/Category/Category";
import Home from "./components/Home/Home";
import View from "./components/Category/View";

class App extends Component {
  render() {
    return (
      <div>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/register" component={Register} />
          <Authenticate>
            <Route exact path="/profile" component={Profile} />
            <Route exact path="/view_stories" component={View} />
            <Route exact path="/add_story" component={CreateStory} />
            <Route exact path="/dashboard" component={Dashboard} />
            <Route exact path="/user" component={User} />
            <Route exact path="/add_category" component={Category2} />
            <Route exact path="/category" component={Category} />
          </Authenticate>
        </Switch>
      </div>
    );
  }
}

export default App;
