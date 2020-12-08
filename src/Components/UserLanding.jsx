import React from "react";
import Button from "@material-ui/core/Button";
import { Link } from "react-router-dom";

export class UserLanding extends React.Component {
  constructor(props) {
    super(props)
    
  }
  render() {
    return (
      <div>
        <Link to="/newcharacter">
          <Button
            variant="contained"
            color="primary"
            onClick={this.handleSubmit}
          >
            New Character
          </Button>
        </Link>{" "}
        <Link to="/newlocation">
          <Button
            variant="contained"
            color="primary"
            onClick={this.handleSubmit}
          >
            New Location
          </Button>
        </Link>{" "}
        <Link to="/characterlist">
          <Button
            variant="contained"
            color="primary"
            onClick={this.handleSubmit}
          >
            My Characters
          </Button>
        </Link>{" "}
        <Link to="/locationlist">
          <Button
            variant="contained"
            color="primary"
            onClick={this.handleSubmit}
          >
            My Locations
          </Button>
        </Link>{" "}
      </div>
    );
  }
}
