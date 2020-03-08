import React from 'react';
import {CH1Comp, CH2Comp} from './Children.js'

export class ParentComp extends React.Component {
  constructor(){
    super();
    this.state={
      child2val: "Well, Hi",
    };
  }

  updateChild2Val(newval){
    console.log("acknowledged change of", newval);
    this.setState({
      child2val: newval,
    });
  }

  render(){
    return(
      <div className="card">
        <h1>Parent</h1>
          <div className="row">
          <div className="col-sm-4">
            <CH1Comp parentClick = {this.updateChild2Val.bind(this)}/>
          </div>
          <div className="col-sm-4">
            <CH2Comp Disp={this.state.child2val}/>
        </div>
        </div>
      </div>
    )
  }
}
