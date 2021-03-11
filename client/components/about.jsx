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
      linkedColors: [],
      linkedSizes: [],
      productAvaliable: true
    };
  }

  componentDidMount() {
    // let productId = this.props.params.productId;
    // console.log(productId);
  }

  render() {
    let availability;
    let moreOptions;
    if (this.state.productAvaliable) {
      availability = <div>Available for delivery in select locations</div>;
    } else {
      availability = <div>Not available for delivery</div>;
    }

    if (this.state.moreOptions) {
      moreOptions = <div>Will need to figure out how to display images</div>;

    } else {
      moreOptions = <div></div>;
    }

    return (
      <div>
        <div>{this.state.brand}</div>
        <div>{this.state.price}</div>
        <div>{this.state.category}, {this.state.color}, <span>{/** query for size */}</span></div>
        <div>{/** query for reviews */}</div>
        {moreOptions}
        <button>Add to bag</button>
        <button>♥</button>
        {availability}
        <div>We're sorry, due to COVID-19 delivery times are running longer than usual. We are actively working to improve these issues.</div>

      </div>);
  }
}

export default About;