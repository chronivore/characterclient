import React from "react";
import "./App.css";
import { CharacterFormWithRouter } from "./Components/CharacterForm";
import APIURL from "./Helpers/environment";
import { CharacterList } from "./Components/CharacterList";
import { UserLanding } from "./Components/UserLanding";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { LocationFormWithRouter } from "./Components/LocationForm";
import { LocationList } from "./Components/LocationList";


export class LoggedInRoutes extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true, // find loading gif
    };
  }

  componentDidMount = () => {
    this.fetchCharacters();
  }

  fetchCharacters = () => {
    fetch(`${APIURL}/character/`, {
      method: "GET",
      headers: new Headers({
        "Content-Type": "application/json",
        "Authorization": this.props.sessionToken
      }),
    })
      .then((res) => res.json())
      .then((characters) => {
        console.log(characters);
        this.setState({
          isLoading: false,
          characters,
        });
      })
      .catch((err) => console.log(err));
  };

  fetchLocations = () => {
    fetch(`${APIURL}/location/`, {
      method: "GET",
      headers: new Headers({
        "Content-Type": "application/json",
         "Authorization": this.props.sessionToken
      }),
    })
      .then((res) => res.json())
      .then((locations) => {
        console.log(locations);
        this.setState({
          isLoading: false,
          locations,
        });
      })
      .catch((err) => console.log(err));
  };

  setSelectedCharacter = (selectedCharacter) => {
    this.setState({
      selectedCharacter,
    });
  };

  setSelectedLocation = (selectedLocation) => {
    this.setState({
      selectedLocation,
    });
  };

  render() {
    if (this.state.isLoading) {
      return <h1>Loading!</h1>;
    } else {
      return (
        <Router>
          <div>
            <nav>
              <ul>
                <li>
                  <Link to="/userlanding">Home</Link>
                </li>
                <li>
                  <Link onClick={this.props.logout} to="/logout">Logout</Link>  
                </li>
              </ul>
            </nav>

            <Switch>
              <Route path="/userlanding">
                <UserLanding />
              </Route>
              <Route path="/editcharacter">
                <CharacterFormWithRouter
                  fetchCharacters={this.fetchCharacters}
                  characters={this.state.characters}
                  selectedCharacter={this.state.selectedCharacter}
                  setSelectedCharacter={this.setSelectedCharacter}
                  sessionToken={this.props.sessionToken}
                />
              </Route>
              <Route path="/newcharacter">
                <CharacterFormWithRouter
                  fetchCharacters={this.fetchCharacters}
                  characters={this.state.characters}
                  sessionToken={this.props.sessionToken}
                />
              </Route>
              <Route path="/characterlist">
                <CharacterList
                  setSelectedCharacter={this.setSelectedCharacter}
                  fetchCharacters={this.fetchCharacters}
                  characters={this.state.characters}
                  sessionToken={this.props.sessionToken}
                />
              </Route>
              <Route path="/editlocation">
                <LocationFormWithRouter
                  fetchLocations={this.fetchLocations}
                  locations={this.state.locations}
                  selectedLocation={this.state.selectedLocation}
                  setSelectedLocation={this.setSelectedLocation}
                  sessionToken={this.props.sessionToken}
                />
                </Route>
                <Route path="newlocation">
                  <LocationFormWithRouter
                  fetchLocations={this.fetchLocations}
                  locations={this.state.locations}
                  sessionToken={this.props.sessionToken}
                  />
                </Route>
              <Route path="/locationlist">
                <LocationList
                  setSelectedLocation={this.setSelectedLocation}
                  fetchLocations={this.fetchLocations}
                  locations={this.state.locations}
                  sessionToken={this.props.sessionToken}
                />
              </Route>
            </Switch>
          </div>
        </Router>
      );
    }
  }
}
