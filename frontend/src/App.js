import "./App.css";
import React, { useEffect, useState } from "react";
import axios from "axios";

import Signup from "./Signup";
import { Container } from "react-bootstrap";
import { HashRouter as Router, Switch, Route } from "react-router-dom";
import Login from "./Login";
import ForgotPassword from "./ForgotPassword";
import HomePage from "./HomePage";
import AddVenuePage from "./AddVenuePage";
import PrivateRoute from "./PrivateRoute";
import VenuePage from "./VenuePage";

var backendRoot = "https://lonelyweddings.herokuapp.com";
//var backendRoot = "http://localhost:5000"

function App() {
  const [getMessage, setGetMessage] = useState({});
  const isAuthenticated = localStorage.getItem("token");


  return (
    <Router>
      <Switch>
        <Route path="/login" component={Login} />
        <Route path="/signup" component={Signup} />
        <Route path="/forgot-password" component={ForgotPassword} />
        <PrivateRoute path="/HomePage" component={HomePage} />
        <PrivateRoute path="/AddVenue" component={AddVenuePage} />
        <PrivateRoute path="/venue/:vid" component={VenuePage} />
      </Switch>
    </Router>
  );
}

export default App;
