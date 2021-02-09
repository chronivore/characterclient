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
      isLoading: true, 
    };
  }

  componentDidMount = () => {
    this.fetchLocations();
  }

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
    console.log(selectedCharacter)
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
                  <Link to="/">Home</Link>
                </li>
                <li>
                  <Link onClick={this.props.logout} to="/logout">Logout</Link>  
                </li>
              </ul>
            </nav>

            <Switch>
              <Route path="/editcharacter">
                <CharacterFormWithRouter
                  selectedCharacter={this.state.selectedCharacter}
                  sessionToken={this.props.sessionToken}
                />
              </Route>
              <Route path="/newcharacter">
                <CharacterFormWithRouter
                  sessionToken={this.props.sessionToken}
                />
              </Route>
              <Route path="/characterlist">
                <CharacterList
                  setSelectedCharacter={this.setSelectedCharacter}
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
                <Route path="/newlocation">
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
              <Route path="/">
                <UserLanding />
              </Route>
            </Switch>
          </div>
        </Router>
      );
    }
  }
}
