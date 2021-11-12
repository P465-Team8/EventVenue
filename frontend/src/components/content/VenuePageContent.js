import React, { useEffect } from "react";
import classNames from "classnames";
import { Container, Button } from "react-bootstrap";
import axios from "axios";
import NavBar from "./Navbar";

class VenuePageContent extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      name: "",
      city: "",
      state: "",
      street_address: "",
      zipcode: 0,
      description: "",
      owner: "",
      pictures: [],
      isBookmarked: false
    }

  }
  getBookmarkStatus() {
    var self = this;
    axios
      .get(`http://localhost:5000/api/venue/${self.props.vid}`, {
        headers: {
          Authorization: `${localStorage.getItem("token")}`,
        },
      })
      .then(function (response) {
       self.state.isBookmarked = (response.data.status === 'true');
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  toggleBookmark() {
    var self = this;
    axios
      .post(`http://localhost:5000/api/bookmarkvenue/${self.props.vid}`, {}, {
        headers: {
          Authorization: `${localStorage.getItem("token")}`
        },
      })
      .then(function (response) {
        if (response.data.message === "Venue bookmarked") {
          self.state.isBookmarked = true
        }
        else if (response.data.message === "Venue unbookmarked"){
          self.state.isBookmarked = false
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  componentDidMount() {
    var self = this;
    axios
      .get(`http://localhost:5000/api/bookmarkvenue/${this.props.vid}`, {
        headers: {
          Authorization: `${localStorage.getItem("token")}`,
        },
      })
      .then(function (response) {
        console.log(response.data.venue);
        self.setState({
          name: response.data.venue.name,
          city: response.data.venue.city,
          state: response.data.venue.state,
          street_address: response.data.venue.street_address,
          zipcode: response.data.venue.zipcode,
          description: response.data.venue.description,
          owner: response.data.venue.owner,
          pictures: response.data.venue.pictures,
          isBookmarked: false
        })
      })
      .catch(function (error) {
        console.log(error);
      });
    this.getBookmarkStatus()
  }
  render() {
    return (
      <Container
        fluid
        className={classNames("content", { "is-open": this.props.isOpen })}
      >
        <NavBar toggle={this.props.toggle} />
        <h2>{ this.state.name }</h2>
        <div style={{float: "right;"}} >
          <Button 
            variant="primary" 
            onClick={this.toggleBookmark()}>
            {this.isBookmarked ? 'Unbookmark' : 'Bookmark'}
          </Button>
        </div>
        <div>{ this.state.description }</div>
        <div>Located at { this.state.street_address } { this.state.city }, { this.state.state} { this.state.zipcode } </div>
      </Container>
    );
  }
}

export default VenuePageContent;
