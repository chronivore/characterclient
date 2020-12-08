import React from "react";
import "./App.css";
import { LoggedOutRoutes } from "./LoggedOutRoutes";
import { LoggedInRoutes } from "./LoggedInRoutes";

export default class App extends React.Component {
  constructor(props) {
    super(props);
    const sessionToken = localStorage.getItem("token");
    this.state = {
      sessionToken,
    };
  }

  updateToken = (newToken) => {
    localStorage.setItem("token", newToken);
    this.setState({
      sessionToken: newToken,
    });
  };

  logout = () => {
    localStorage.removeItem("token");
    this.setState({
      sessionToken: undefined,
    });
  };

  render() {
    if (this.state.sessionToken) {
      return (
        <LoggedInRoutes sessionToken={this.state.sessionToken} updateToken={this.updateToken} logout={this.logout} />
      );
    } else {
      return <LoggedOutRoutes updateToken={this.updateToken} />;
    }
  }
}
