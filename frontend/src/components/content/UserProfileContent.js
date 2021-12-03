import React from "react";
import { Container } from "react-bootstrap";
import axios from "axios";
import NavBar from "./Navbar";
import classNames from "classnames";


//var backendRoot = "https://lonelyweddings.herokuapp.com";
var backendRoot = "http://localhost:5000"

class UserProfile extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            user: {firstName: "", lastName: ""},
            venueReservations: [],
            venueBookmarks: []
        };
    }

    componentDidMount() {
        this.getUserProfile();
        this.getVenueReservations();
        this.getVenueBookmarks();
    }

    getUserProfile() {
        var self = this;
        axios
        .get(backendRoot + `/api/myprofile`, {
            headers: {
            Authorization: `${localStorage.getItem("token")}`,
            },
        })
        .then(function (response) {
            self.setState({
                user: {firstName: response.data["first_name"], lastName: response.data["last_name"]},
                venueReservations: self.state.venueReservations,
                venueBookmarks: self.state.venueBookmarks
            });
            console.log(self.state.user)
        })
        .catch(function (error) {
            console.log(error);
        });
    }

    getVenueReservations() {
        var self = this;
        axios
        .get(backendRoot + `/api/user/reservations?mode=future`, {
            headers: {
            Authorization: `${localStorage.getItem("token")}`,
            },
        })
        .then(function (response) {
            self.setState({
                user: self.state.user,
                venueReservations: JSON.stringify(response.data),
                venueBookmarks: self.state.venueBookmarks
            });
        })
        .catch(function (error) {
            console.log(error);
        });
    }

    getVenueBookmarks() {
        var self = this;
        axios
        .get(backendRoot + `/api/user/venuebookmarks`, {
            headers: {
            Authorization: `${localStorage.getItem("token")}`,
            },
        })
        .then(function (response) {
            self.setState({
                user: self.state.user,
                venueReservations: self.state.venueReservations,
                venueBookmarks: JSON.stringify(response.data)
            });
        })
        .catch(function (error) {
            console.log(error);
        });
    }

    render() {
        return (
        <Container
            fluid
            className={classNames("content", { "is-open": this.props.isOpen })}
        >
            <NavBar toggle={this.props.toggle} />
            <div>
                <h1>{this.state.user.firstName} {this.state.user.lastName}</h1>
                
            </div>
            <div>
                <h2>Venue Reservations</h2>
                {this.state.venueReservations}
            </div>
            <div>
                <h2>Venue Bookmarks</h2>
                {this.state.venueBookmarks}
            </div>
        </Container>
        );
    }
}

export default UserProfile;
