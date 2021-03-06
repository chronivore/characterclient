import React from "react";
import { DataGrid } from "@material-ui/data-grid";
import Button from "@material-ui/core/Button";
import { Link } from "react-router-dom";
import { fetchCharacters, deleteCharacter } from "../API/characters";

export class CharacterList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      characters: [],
    };
  }

  componentDidMount = () => {
    this.refreshCharacterList()
  };

  refreshCharacterList = () => {
    fetchCharacters(this.props.sessionToken).then((characters) => {
      this.setState({
        isLoading: false,
        characters: characters,
      });
    });
  };

  handleSelectionChange = (event) => {
    const id = event.rowIds[0];
    this.setState({
      selectedRowId: id,
    });
    const characters = this.state.characters;
    const selectedCharacter = characters.find(
      (character) => character.id == id
    );
    console.log(id, characters);
    this.props.setSelectedCharacter(selectedCharacter);
  };

  handleDeleteClick = (event) => {
    deleteCharacter(this.props.sessionToken, this.state.selectedRowId)
    .then(this.refreshCharacterList)
  };

  render() {
    const columns = [
      { field: "id", headerName: "ID", width: 70 },
      { field: "name", headerName: "Name", width: 150 },
      { field: "gender", headerName: "Gender", width: 100 },
      {
        field: "age",
        headerName: "Age",
        type: "number",
        width: 70,
      },
      { field: "race", headerName: "Race", width: 130 },
      { field: "occupation", headerName: "Occupation", width: 130 },
      { field: "skills", headerName: "Skills", width: 180 },
      { field: "location", headerName: "Location", width: 130 },
      { field: "miscellaneous", headerName: "Miscellaneous", width: 200 },
    ];

    return (
      <div>
        <div id="characterList" style={{ height: 600, width: "100%" }}>
          <DataGrid
            rows={this.state.characters}
            columns={columns}
            pageSize={20}
            onSelectionChange={this.handleSelectionChange}
          />
        </div>
        {this.state.selectedRowId ? (
          <div id="buttonDiv">
            <Link to="/editcharacter">
              <Button variant="contained" color="primary">
                Update Character!{" "}
              </Button>
            </Link>{" "}
            <Button
              variant="contained"
              color="primary"
              onClick={this.handleDeleteClick}
            >
              Delete Character!
            </Button>{" "}
          </div>
        ) : (
          <div></div>
        )}
      </div>
    );
  }
}
