import React from "react";
import "./App.css";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { Login } from "./Components/LoginLanding";
import { RegisterForm } from "./Components/Register";

export class LoggedOutRoutes extends React.Component {

  render() {
      return (
        <Router>
          <div>

            <Switch>
              <Route  path="/register">
                <RegisterForm updateToken={this.props.updateToken}/>
              </Route>
              <Route  path="/">
                <Login updateToken={this.props.updateToken}/>
              </Route>
            </Switch>
          </div>
        </Router>
      );
  }
}
