import React from "react";
import Form from "react-bootstrap/Form";
import classNames from "classnames";
import { Container, Button } from "react-bootstrap";
import NavBar from "./Navbar";

class HomePageContent extends React.Component {
  render() {
    return (
      <Container
        fluid
        className={classNames("content", { "is-open": this.props.isOpen })}
      >
        <NavBar toggle={this.props.toggle} />
        <div>Home Page</div>
      </Container>
    );
  }
}

export default HomePageContent;
