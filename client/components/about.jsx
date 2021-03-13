import React from 'react';

class About extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      _id: 0,
      brand: '',
      category: '',
      color: '',
      price: 0,
      linkedColors: [],
      linkedSizes: [],
      productAvaliable: true,
      dataQueried: false
    };
    this.componentDidMount = this.componentDidMount.bind(this);
  }


  componentDidMount() {
    let url = window.location.href;
    let splitUrl = url.split('/');
    let queriedId = splitUrl[3];
    if (queriedId.length === 0) {
      // this is for if the url is simply localhost:3003 with no id specified
      return;
    }
    fetch(`/api/product/${queriedId}`)
      .then((response) => {
        return response.json();
      })
      .then((jsonResponse) => {
        // console.log(jsonResponse);
        this.setState(jsonResponse);
      });
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

    if (!this.state.dataQueried) {
      return (<div className="errorMessage">
        This service is currently experiencing technical difficulties. Apologies for the inconvenience.
      </div>
      );
    } else {
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

        </div>
      );
    }
  }
}

export default About;