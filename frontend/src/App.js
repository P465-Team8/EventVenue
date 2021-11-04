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

function App() {
  const [getMessage, setGetMessage] = useState({});
  const isAuthenticated = localStorage.getItem("token");

  useEffect(() => {
    //var backend = "http://localhost:5000/flask/hello";
    var backend =  "https://lonelyweddings.herokuapp.com/flask/hello"
    axios
      .get(backend)
      .then((response) => {
        console.log("SUCCESS", response);
        setGetMessage(response);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <Router>
      <Switch>
        <Route path="/login" component={Login} />
        <Route path="/signup" component={Signup} />
        <Route path="/forgot-password" component={ForgotPassword} />
        <PrivateRoute path="/HomePage" component={HomePage} />
        <PrivateRoute path="/AddVenue" component={AddVenuePage} />
        <PrivateRoute path="/venue" component={VenuePage} />
      </Switch>
    </Router>
  );
}

export default App;
