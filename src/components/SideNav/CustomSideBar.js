import "../../App.css";
import React from "react";
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

export default class CustomNavBar extends React.Component {
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
        <Navbar color="light" light expand="md" fixed="top">
          <NavbarBrand href="/dashboard">
            <img src={require("../../images/logo.png")} alt="" />
          </NavbarBrand>
          <NavbarToggler onClick={this.toggle} />
          <Collapse isOpen={this.state.isOpen} navbar>
            <Nav className="ml-auto" navbar>
              <NavItem>
                <NavLink href="/dashboard/">
                  <i style={{ fontSize: "20px" }} class="fa fa-dashboard" />
                  <span style={{ padding: "5px" }}>Dashboard</span>
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink href="/category">
                  <i style={{ fontSize: "20px" }} class="fa fa-laptop" />
                  <span style={{ padding: "5px" }}>Categories</span>{" "}
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink href="/story">
                  <i style={{ fontSize: "20px" }} class="fa fa-book" />
                  <span style={{ padding: "5px" }}>Stories</span>{" "}
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink href="/user">
                  <i style={{ fontSize: "20px" }} class="fa fa-users" />
                  <span style={{ padding: "5px" }}>Users</span>{" "}
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink href="/profile">
                  <i style={{ fontSize: "20px" }} class="fa fa-user" />
                  <span style={{ padding: "5px" }}>Profile </span>
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink href="/logout">
                  <i style={{ fontSize: "20px" }} class="fa fa-sign-out" />
                  <span style={{ padding: "5px" }}>Logout </span>
                </NavLink>
              </NavItem>
            </Nav>
          </Collapse>
        </Navbar>
      </div>
    );
  }
}
