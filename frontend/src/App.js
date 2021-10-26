import "./App.css";
import React, { useEffect, useState } from "react";
import axios from "axios";

import Signup from "./Signup";
import { Container } from "react-bootstrap";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Login from "./Login";
import ForgotPassword from "./ForgotPassword";
import HomePage from "./HomePage";
import AddVenuePage from "./AddVenuePage";

function App() {
  const [getMessage, setGetMessage] = useState({});

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
        <Route path="/HomePage" component={HomePage} />
        <Route path="/AddVenue" component={AddVenuePage} />
      </Switch>
    </Router>
  );
}

export default App;
