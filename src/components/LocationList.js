import React from 'react';
import LocData from '../TEST_LOCATIONS.json'

export default class LocationList extends React.Component {
  render(){
    return(
      <div className="list-container">
        {LocData.map((location, index)=>{
          return (
            <div className="loc-card">
              <h1>{location.name}</h1>
              {location.exits.map((exit, index)=>{
                return <p>{exit.name} -> {exit.Destination}</p>
              })}
            </div>
          )
        })}
      </div>
    );
  }
}
