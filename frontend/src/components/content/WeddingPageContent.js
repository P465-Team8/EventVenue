import React, { useEffect } from "react";
import classNames from "classnames";
import { Container, Button } from "react-bootstrap";
import axios from "axios";
import NavBar from "./Navbar";

//var backendRoot = "https://lonelyweddings.herokuapp.com";
var backendRoot = "http://localhost:5000"


class WeddingPageContent extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      bookmarkButton: "Bookmark"
    }
    this.getBookmarkStatus = this.getBookmarkStatus.bind(this);
    this.toggleBookmark = this.toggleBookmark.bind(this);

  }
  getBookmarkStatus() {
    var self = this;
    axios
      .get(backendRoot + `/api/bookmarkwedding/${self.props.wid}`, {
        headers: {
          Authorization: `${localStorage.getItem("token")}`,
        },
      })
      .then(function (response) {
       if (response.data.status === 'true'){
         let newState = Object.assign({}, self.state)
         newState.bookmarkButton = "Unbookmark"
         self.setState(newState)
       }
       else{
        let newState = Object.assign({}, self.state)
        newState.bookmarkButton = "Bookmark"
        self.setState(newState)
       };
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  toggleBookmark() {
    var self = this;
    axios
      .post(backendRoot + `/api/bookmarkwedding/${self.props.wid}`, {}, {
        headers: {
          Authorization: `${localStorage.getItem("token")}`
        },
      })
      .then(function (response) {
        if (response.data.message === "Wedding bookmarked") {
          let newState = Object.assign({}, self.state)
         newState.bookmarkButton = "Unbookmark"
         self.setState(newState)
        }
        else if (response.data.message === "Wedding unbookmarked"){
          let newState = Object.assign({}, self.state)
         newState.bookmarkButton = "Bookmark"
         self.setState(newState)
        }
        //console.log("Button text: " + self.state.bookmarkButton)
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  componentDidMount() {
    var self = this;
    axios
      .get(backendRoot + `/api/wedding/${this.props.wid}`, {
        headers: {
          Authorization: `${localStorage.getItem("token")}`,
        },
      })
      .then(function (response) {
        console.log(response.data)
        self.setState({
          description: response.data.wedding.description,
          bookmarkButton: self.state.bookmarkButton
        })
      })
      .catch(function (error) {
        console.log(error);
      });
    this.getBookmarkStatus()
  }

  maps() {

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
            onClick={this.toggleBookmark}>
            {this.state.bookmarkButton}
          </Button>
        </div>
        <div>{ this.state.description }</div>

      </Container>
    );
  }
}

export default WeddingPageContent;