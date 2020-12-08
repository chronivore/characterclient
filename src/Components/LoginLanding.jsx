import React from "react";
import Button from "@material-ui/core/Button"; 
import TextField from "@material-ui/core/TextField";
import { Link } from "react-router-dom";
import APIURL from "../Helpers/environment";
import { withRouter } from "react-router";

class LoginWithoutRouter extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: undefined,
      password: undefined
    };
  }

  handleEmailChange = (event) => {
    this.setState({
      email: event.target.value,
    });
  };

  handlePasswordChange = (event) => {
    this.setState({
      password: event.target.value,
    });
  };

  handleSubmit = (event) => {
      fetch(`${APIURL}/user/login/`, {
        method: "POST",
        body: JSON.stringify({
          user: {
            email: this.state.email,
            password: this.state.password,
          },
        }),
        headers: new Headers({
          "Content-Type": "application/json",
        }),
      })
        .then((res) => {
          if (res.status !== 200) {
            throw new Error("User does not exist");
          } else return res.json();
        })
        .then((data) => {
          this.props.updateToken(data.sessionToken);
          this.props.history.push('/userlanding');
        })
        .catch((err) => alert(err));
    
  };

  render() {
    return (
      <div>
        <form>
          <h1>Login</h1>
          <TextField
            required
            id="email"
            label="Email"
            value={this.state.email}
            onChange={this.handleEmailChange}
          />
          <br />
          <br />
          <TextField
            required
            id="password"
            label="Password"
            type="password"
            value={this.state.password}
            onChange={this.handlePasswordChange}
          />
          <br />
          <br />
          <Button
            variant="contained"
            color="primary"
            onClick={this.handleSubmit}
          >
            Login
          </Button>
          <Link to="/register">Register</Link>
        </form>
      </div>
    );
  }
}

export const Login = withRouter(LoginWithoutRouter);
