import React from "react";
import { Container } from "react-bootstrap";
import axios from "axios";
import NavBar from "./Navbar";
import classNames from "classnames";
import BookmarkItem from "../BookmarkItem";
import "./UserProfileContent.css";


//var backendRoot = "https://lonelyweddings.herokuapp.com";
var backendRoot = "http://localhost:5000"

class UserProfile extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            user: {firstName: "", lastName: ""},
            venueReservations: [],
            venueBookmarks: [],
            weddingBookmarks: [],
            weddingReservations: [],
            upcomingWeddings: []
        };
    }

    componentDidMount() {
        this.getUserProfile();
        this.getVenueReservations();
        this.getVenueBookmarks();
        this.getWeddingBookmarks();
        this.getUpcomingWeddings();
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
            let newState = Object.assign({}, self.state);
            newState.user = {firstName: response.data["first_name"], lastName: response.data["last_name"]};
            self.setState(newState);
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
            let newState = Object.assign({}, self.state);
            newState.venueReservations = response.data.reservations;
            self.setState(newState);
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
            let newState = Object.assign({}, self.state);
            newState.venueBookmarks = response.data.venue_bookmarks;
            self.setState(newState);
        })
        .catch(function (error) {
            console.log(error);
        });
    }

    getWeddingBookmarks() {
        var self = this;
        axios
        .get(backendRoot + `/api/user/weddingbookmarks`, {
            headers: {
            Authorization: `${localStorage.getItem("token")}`,
            },
        })
        .then(function (response) {
            let newState = Object.assign({}, self.state);
            newState.weddingBookmarks = response.data.wedding_bookmarks;
            self.setState(newState);
        })
        .catch(function (error) {
            console.log(error);
        });
    }

    getUpcomingWeddings() {
        var self = this;
        axios
        .get(backendRoot + `/api/user/weddings`, {
            headers: {
            Authorization: `${localStorage.getItem("token")}`,
            },
        })
        .then(function (response) {
            let newState = Object.assign({}, self.state);
            if (response.data.message != "none"){
                newState.upcomingWeddings = response.data.weddings;
            }
            self.setState(newState);
        })
        .catch(function (error) {
            console.log(error);
        });
        console.log(self.state);
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
                {JSON.stringify(this.state.venueReservations)}
            </div>
            <div>
                <h2>Upcoming Weddings</h2>
                {JSON.stringify(this.state.upcomingWeddings)}
            </div>
            <div>
                <h2>Wedding Bookmarks</h2>
                <div className="bRow">
                    {this.state.weddingBookmarks.map((bm) => (
                        <BookmarkItem name={bm.first_name + "\'s Wedding"} id={bm.wid} type="wedding"
                        />
                    ))}
                </div>
            </div>
            <div>
                <h2>Venue Bookmarks</h2>
                <div className="bRow">
                    {this.state.venueBookmarks.map((bm) => (
                        <BookmarkItem name={bm.name} city={bm.city} state={bm.state} id={bm.vid} type="venue"
                        />
                    ))}
                </div>
            </div>
        </Container>
        );
    }
}

export default UserProfile;

// very important comment