import React from "react";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Container from "@material-ui/core/Container";
import APIURL from "../Helpers/environment";
import { withRouter } from "react-router";

class LocationForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

  
  handleSubmitLocation = (event) => {
    if (this.props.selectedLocation) {
    this.updateLocation();
  } else {
      this.createLocation();
  }
};

  handleNameChange = (event) => {
    this.setState({
      name: event.target.value,
    });
  };

  handleClimateChange = (event) => {
    this.setState({
      climate: event.target.value,
    });
  };

  handleTechnologyChange = (event) => {
    this.setState({
      technology: event.target.value,
    });
  };

  handleMiscellaneousChange = (event) => {
    this.setState({
      miscellaneous: event.target.value,
    });
  };

  createLocation = () => {
    fetch(`${APIURL}/location/`, {
      method: "POST",
      body: JSON.stringify({
        location: this.state,
      }),
      headers: new Headers({
        "Content-Type": "application/json",
        'Authorization': this.props.sessionToken
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        this.props.history.push('/LocationList')
        this.props.fetchLocations();
      })
      .catch((err) => console.log(err));
  };

  updateLocation = () => {
    const id = this.props.selectedLocation.id;
    fetch(`${APIURL}/location/${id}`, {
      method: "PUT",
      body: JSON.stringify({
        location: this.state,
      }),
      headers: new Headers({
        "Content-Type": "application/json",
        'Authorization': this.props.sessionToken
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        this.props.history.push('/LocationList')
        this.props.fetchLocation();
      })
      .catch((err) => console.log(err));
  };

  render() {
    return (
      <div className="wrapper">
        <Container maxWidth="sm">
          <form>
            <h1>New Location</h1>
            <TextField
              required
              id="name"
              label="Name"
              value={this.state.name}
              onChange={this.handleNameChange}
            />
            <br />
            <TextField
              required
              id="climate"
              label="Climate"
              value={this.state.climate}
              onChange={this.handleClimateChange}
            />
            <br />
            <TextField
              required
              id="technology"
              label="Technology"
              value={this.state.technology}
              onChange={this.handleTechnologyChange}
            />
            <br />
            <TextField
              required
              id="miscellaneous"
              label="Miscellaneous"
              value={this.state.miscellaneous}
              onChange={this.handleMiscellaneousChange}
            />
            <br />
            <br />
            <br />
            <Button
              variant="contained"
              color="primary"
              onClick={this.handleSubmit}
            >
              Submit
            </Button>{" "}
          </form>
        </Container>
      </div>
    );
  }
}

export const LocationFormWithRouter = withRouter(LocationForm);
