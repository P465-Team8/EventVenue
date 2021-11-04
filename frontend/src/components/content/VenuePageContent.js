import React from "react";
import classNames from "classnames";
import { Container, Button } from "react-bootstrap";
import NavBar from "./Navbar";

class VenuePageContent extends React.Component {
  render() {
    return (
      <Container
        fluid
        className={classNames("content", { "is-open": this.props.isOpen })}
      >
        <NavBar toggle={this.props.toggle} />
        <div>Venue</div>
      </Container>
    );
  }
}

export default VenuePageContent;
