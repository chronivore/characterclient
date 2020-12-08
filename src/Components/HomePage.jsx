import React from "react";
import Button from "@material-ui/core/Button";
import Container from "@material-ui/core/Container";

export class HomePage extends React.Component {
  render() {
    return (
      <div className="wrapper">
        <Container maxWidth="sm">
          <h5>Welcome, Stranger!</h5>
          <br />
          <br />
          <h1>Character Creative</h1>
          <Button
              variant="contained"
              color="primary"
              onClick={this.handleSubmit}
            >
              Register
            </Button>
            <br />
            <br />
            <Button
              variant="contained"
              color="primary"
              onClick={this.handleSubmit}
            >
              Login
            </Button>

        </Container>
      </div>
    );
  }
}
