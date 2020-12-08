import React from "react";
import APIURL from "../Helpers/environment";
import { DataGrid } from "@material-ui/data-grid";
import Button from "@material-ui/core/Button";
import { Link } from "react-router-dom";

export class LocationList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  handleSelectionChange = (event) => {
    const id = event.rowIds[0]
    this.setState({
      selectedRowId: id,
    });
    const locations = this.props.locations;
    const selectedLocation = locations.find(location => location.id === id)
    this.props.setSelectedLocation(selectedLocation);
  };

  handleDeleteClick = (event) => {
    this.deleteLocation();
  };

  deleteLocation = () => {
    const id = this.state.selectedRowId;
    fetch(`${APIURL}/location/${id}`, {
      method: "DELETE",
      headers: new Headers({
        "Content-Type": "application/json",
        Authorization: this.props.sessionToken,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        this.props.fetchLocations();
      })
      .catch((err) => console.log(err));
  };
  render() {
    const columns = [
      { field: "id", headerName: "ID", width: 70 },
      { field: "name", headerName: "Name", width: 150 },
      { field: "climate", headerName: "Climate", width: 100 },
      { field: "technology", headerName: "Technology", width: 130 },
      { field: "miscellaneous", headerName: "Miscellaneous", width: 200 },
    ];

    return (
      <div>
        <div id="locationList" style={{ height: 600, width: "100%" }}>
          <DataGrid
            rows={this.props.locations}
            columns={columns}
            pageSize={20}
            onSelectionChange={this.handleSelectionChange}
          />
        </div>
        {this.state.selectedRowId ? (
          <div id="buttonDiv">
            <Link to="/editlocation">
              <Button variant="contained" color="primary">
                Update Location!{" "}
              </Button>
            </Link>{" "}
            <Button
              variant="contained"
              color="primary"
              onClick={this.handleDeleteClick}
            >
              Delete Location!
            </Button>{" "}
          </div>
        ) : (
          <div></div>
        )}
      </div>
    );
  }
}
