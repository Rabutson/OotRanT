import React from 'react';
import LocData from '../TEST_LOCATIONS.json';

export class LocationList extends React.Component {
  constructor(props) {
    super();
    this.state={
      currentLoc: 0,
      locationInfo: LocData,
    };
  }

  setCurrentLocation(index){
    this.setState({
      currentLoc: index,
    });
  }

  addLocation(name){
    let newLoc = {
      name: name,
      exits: [],
    };

    this.setState({
      locationInfo: this.state.locationInfo.concat(newLoc),
    });
  }

  // ToDo:
  // LocData should probably be in states so that all children update

  // Should probably include the original index and pass it to the name list
  LocationNames(){
    let names = [];
    var i;
    for (i = 0; i < this.state.locationInfo.length; i++)
    {
      names.push(this.state.locationInfo[i].name);
    }
    return names;
  }

  LocationExits(){
    if (this.state.locationInfo[this.state.currentLoc] != null)
    {
      return this.state.locationInfo[this.state.currentLoc].exits;
    }
    else {
      return [];
    }
  }

  render(){
    return(
      <div
        className="row"
        style={{margin: "8px"}}>
        <div className="col-sm-6">
            <div className="row" style={{padding: "16px"}}>
              <input className="col-sm-8 form-control"/>
              <button
                className="col-sm-4 btn btn-primary"
                onClick={() => this.addLocation("New Location")}>
                Add New
              </button>
            </div>
            <LocationNameList
              LocationInfo={this.LocationNames()}
              clickFunc={this.setCurrentLocation.bind(this)}/>
          </div>
        <div className="col-sm-6">
          <LocationExitList ExitInfo={this.LocationExits(0)}/>
        </div>
      </div>
    );
  }
}

class LocationNameList extends React.Component {
  constructor(props){
    super();
  }

  changeParentLocation(index){
    this.props.clickFunc(index);
  }

  render(){
    return(
      <>
        {this.props.LocationInfo.map((name, index)=>{
          return (
            <div
              className="card"
              key={index}
              onClick={() => this.changeParentLocation(index)}
            >
              <h3>{name}</h3>
            </div>
          )
        })}
      </>
    );
  }
}

class LocationExitList extends React.Component {
  constructor(props){
    super();
  }

  render(){
    return(
      <div className="card">
        {this.props.ExitInfo.map((exit, index) =>{
          return (
            <p key={index}>
              {exit.name} -> {exit.Destination}
            </p>
          )
        })}
      </div>
    )
  }
}
