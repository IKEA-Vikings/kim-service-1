import React from 'react';

class About extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      _id: 0,
      brand: 'TEST',
      category: 'This category',
      color: 'cobalt',
      price: 0.75,
      // UPDATE DATABASE TO USE CAMEL CASE INSTEAD OF DASHES
      linkedColors: [],
      linkedSizes: []
    };
  }

  render() {
    return (<h1>React Component</h1>);
  }
}

export default About;