import React from 'react';
import MoreColors from './moreColors.jsx';
import MoreSizes from './moreSizes.jsx';
import styles from '../style.module.css';

class About extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      _id: 0,
      brand: '',
      category: '',
      color: '',
      price: 0,
      size: 'size',
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
    // fetching from Virgina's service for sizes
    // fetch(`http://localhost:3002/api/sizes/${queriedId}`)
    //   .then((response) => {
    //     console.log(response);
    //   })
    //   .catch((error) => {
    //     console.log('error fetching sizes', error);
    //   });

    // fetch from Josh's service for star rating

    // fetch from Phucci's service for images
  }

  render() {
    let availability;
    let moreOptions;
    let moreColors;
    let moreSizes;
    if (this.state.productAvaliable) {
      availability = <div className={styles.aboutAvailability}>Available for delivery in select locations</div>;
    } else {
      availability = <div className={styles.aboutAvailability}>Not available for delivery</div>;
    }

    if (this.state.moreOptions) {
      if (this.state.linkedColors.length !== 0) {
        // eventually these will not be ids but rather images, will need to query Phucci's service
        moreColors = <MoreColors color={this.state.color} colorOptions={this.state.linkedColors}/>;
      } else {
        moreColors = <div></div>;
      }
      if (this.state.linkedSizes.length !== 0) {
        moreSizes = <MoreSizes size={this.state.size}/>;
      } else {
        moreSizes = <div></div>;
      }
      moreOptions = <div className={styles.aboutMoreOptions}>{moreColors}{moreSizes}</div>;

    } else {
      moreOptions = <div></div>;
    }

    if (!this.state.dataQueried) {
      return (<div className={styles.errorMessage}>
        This service is currently experiencing technical difficulties. Apologies for the inconvenience.
      </div>
      );
    } else {
      return (
        <div className={styles.aboutComponent}>
          <div className={styles.aboutBrand}>{this.state.brand}</div>
          <div className={styles.aboutPrice}>${this.state.price}</div>
          <div className={styles.aboutDescription}>{this.state.category}, {this.state.color}, <span className={styles.aboutSize}>{this.state.size}</span></div>
          <div className={styles.aboutReviews}>{/** query for reviews */}</div>
          {moreOptions}
          <button className={styles.aboutAddToBagButton}>Add to bag</button>
          <button className={styles.aboutHeartButton}>♥</button>
          {availability}
          <div className={styles.aboutCOVID}>We're sorry, due to COVID-19 delivery times are running longer than usual. We are actively working to improve these issues.</div>

        </div>
      );
    }
  }
}

export default About;