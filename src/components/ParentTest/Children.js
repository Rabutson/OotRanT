import React from 'react';

export class CH1Comp extends React.Component {

  changeSibling(){
    console.log("attempted to change sibling");
    this.props.parentClick("Hello");
  }

  render(){
    return(
      <button onClick={this.changeSibling.bind(this)}>
        I am button what of it?
      </button>
    )
  }
}

export class CH2Comp extends React.Component {
  constructor(props) {
    super();
    this.state = {
      display: props.Disp,
    };
  }

  render(){
    return(
      <div>Hello, I'm Text: {this.props.Disp}</div>
    )
  }
}
