import React from "react";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Container from "@material-ui/core/Container";
import APIURL from "../Helpers/environment";
import { withRouter } from "react-router";

 class CharacterForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  handleSubmit = (event) => {
    if (this.props.selectedCharacter) {
      this.updateCharacter();
    } else {
    this.createCharacter();
    }
  };


  handleNameChange = (event) => {
    this.setState({
      name: event.target.value,
    });
  };

  handleGenderChange = (event) => {
    this.setState({
      gender: event.target.value,
    });
  };

  handleAgeChange = (event) => {
    this.setState({
      age: event.target.value,
    });
  };

  handleRaceChange = (event) => {
    this.setState({
      race: event.target.value,
    });
  };

  handleOccupationChange = (event) => {
    this.setState({
      occupation: event.target.value,
    });
  };

  handleSkillsChange = (event) => {
    this.setState({
      skills: event.target.value,
    });
  };

  handleMiscellaneousChange = (event) => {
    this.setState({
      miscellaneous: event.target.value,
    });
  };

  handleLocationChange = (event) => {
    this.setState({
      location: event.target.value,
    });
  };

  componentDidMount() {
    this.setState(this.props.selectedCharacter);
  }

  createCharacter = () => {
    fetch(`${APIURL}/character/`, {
      method: "POST",
      body: JSON.stringify({
        character: this.state,
      }),
      headers: new Headers({
        "Content-Type": "application/json",
        'Authorization': this.props.sessionToken
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        this.props.history.push('/CharacterList')
        this.props.fetchCharacters();
      })
      .catch((err) => console.log(err));
  };

  updateCharacter = () => {
    const id = this.props.selectedCharacter.id;
    fetch(`${APIURL}/character/${id}`, {
      method: "PUT",
      body: JSON.stringify({
        character: this.state,
      }),
      headers: new Headers({
        "Content-Type": "application/json",
        'Authorization': this.props.sessionToken
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        this.props.history.push('/CharacterList')
        this.props.fetchCharacters();
      })
      .catch((err) => console.log(err));
  };

  render() {
    return (
      <div className="wrapper">
        <Container maxWidth="sm">
          <form>
            <h1>Create your Character</h1>
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
              id="gender"
              label="gender"
              value={this.state.gender}
              onChange={this.handleGenderChange}
            />
            <br />
            <TextField
              required
              id="race"
              label="race"
              value={this.state.race}
              onChange={this.handleRaceChange}
            />
            <br />
            <TextField
              required
              id="occupation"
              label="occupation"
              value={this.state.occupation}
              onChange={this.handleOccupationChange}
            />
            <br />
            <TextField
              required
              id="age"
              label="age"
              value={this.state.age}
              onChange={this.handleAgeChange}
            />
            <br />
            <TextField
              required
              id="skills"
              label="skills"
              defaultValue={this.state.skills}
              onChange={this.handleSkillsChange}
            />
            <br />
            <TextField
              id="location"
              label="location"
              vValue={this.state.location}
              onChange={this.handleLocationChange}
            />
            <br />
            <TextField
              id="miscellaneous"
              label="miscellaneous"
              value={this.state.miscellaneous}
              onChange={this.handleMiscellaneousChange}
            />
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

export const CharacterFormWithRouter = withRouter(CharacterForm);