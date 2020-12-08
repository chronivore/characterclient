import React from "react";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Container from "@material-ui/core/Container";
import APIURL from "../Helpers/environment";
import { withRouter } from "react-router";

class RegisterFormWithoutRouter extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: undefined,
            password: undefined
        };
    }

    handleSubmit = (event) => {
        this.createUser();
    };

    createUser = () => {
        fetch(`${APIURL}/user/signup/`, {
            method: "POST",
            body: JSON.stringify({
                user: this.state,
            }),
            headers: new Headers({
                "Content-Type": "application/json",
              }),
            })
              .then((response) => response.json())
              .then((data) => {
                this.props.updateToken(data.sessionToken);
          this.props.history.push('/userlanding');
              })
              .catch((err) => console.log(err));
          };
            
    handlePasswordChange = (event) => {
        this.setState({
            password: event.target.value
        });
    };    

    handleEmailChange = (event) => {
        this.setState({
            email: event.target.value
        });
    };

    render() {
        return ( 
            <div className="wrapper">
        <Container maxWidth="sm">
          <form>
              <h1>Register</h1>
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
              Submit
            </Button>



          </form>
          </Container>
        </div>)
    }
}

export const RegisterForm = withRouter(RegisterFormWithoutRouter);