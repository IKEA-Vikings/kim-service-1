import React from 'react';
import MoreColors from './moreColors.jsx';
import MoreSizes from './moreSizes.jsx';
// import MoreColorsSidebar from './moreColorsSidebar.jsx';
// import MoreSizesSidebar from './moreSizesSidebar.jsx';
import styles from '../style.module.css';
import AWS from './urls.js';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import { faTruck } from '@fortawesome/free-solid-svg-icons';
import { faInfoCircle } from '@fortawesome/free-solid-svg-icons';


class About extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      _id: 0,
      brand: '',
      category: '',
      color: '',
      price: 0,
      size: '[size]',
      linkedColors: [],
      linkedSizes: [],
      productAvaliable: true,
      dataQueried: false,
      view: 'normal',
      images: [],
      reviewNum: 0,
      reviewAverage: 0
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
    // fetch produce size information
    fetch(`/api/product/${queriedId}`)
      .then((response) => {
        return response.json();
      })
      .then((jsonResponse) => {
        this.setState(jsonResponse);
        // return jsonResponse.linkedColors;
      });

    // PHUCCI CHANGED URL
    // fetch images if there are moreColors
    // .then((colorArray) => {
    //   let moreColorsImageUrls = [];
    //   let imageUrls = [];
    //   for (let i = 0; i < colorArray.length; i++) {
    //     imageUrls.push(`${AWS.imageAPI}${colorArray[i]}`);
    //   }
    //   let fetchUrlData = function(url) {
    //     return axios.get(url)
    //       .then(response => {
    //         return {
    //           success: true,
    //           data: response.data[0]
    //         };
    //       })
    //       .catch(error => {
    //         return {success: false};
    //       });
    //   };

    //   return Promise.all(imageUrls.map(fetchUrlData));
    // })
    // .then((moreImageArrayPromises) => {
    //   let imageUrls = [];
    //   for (let i = 0; i < moreImageArrayPromises.length; i++) {
    //     imageUrls.push(moreImageArrayPromises[i].data);
    //   }
    //   let stateObject = {
    //     images: imageUrls
    //   };
    //   this.setState(stateObject);
    // })
    // .catch(err => console.error(err));

    ///////////////////////////////////////////////////////////////////
    /* COMMENT OUT REQUEST TO OTHER DATABASES UNTIL ALL DEPLOYED ON EC2

    axios.get(`${AWS.relatedColors}${queriedId}`)
      .then((response) => {
        return response.data;
      })
      .then((relatedColorsArr) => {
        if (relatedColorsArr.length !== 0) {
          axios.get(`${AWS.imageAPI}${queriedId}`)
            .then((response) => {
              relatedColorsArr.unshift(response.data[0]);
              return relatedColorsArr;
            })
            .then((modifiedColorsArr) => {
              let stateObject = {
                images: modifiedColorsArr
              };
              this.setState(stateObject);
            });
        }
      })
      .catch((err) => {
        console.log('err fetching images for related products', err);
      });


    // fetching from Virgina's service for sizes
    axios.get(`${AWS.sizeAPI}${queriedId}`)
      .then((response) => {
        let data = {};
        data.size = response.data.title;
        this.setState(data);
      })
      .catch((error) => {
        console.log('error fetching sizes', error);
      });

    */
    ///////////////////////////////////////////////////////////////////

    // fetch from Josh's service for star rating
    // axios.get(`${AWS.reviewAPI}${queriedId}`)
    //   .then((response) => {
    //     console.log('reviews for before processing', response);
    //     return response.json();
    //   })
    //   .then((jsonResponse) => {
    //     console.log('reviews after processing', jsonResponse);
    //     // this.setState(jsonResponse);
    //   });
  }

  render() {
    let availability;
    let moreOptions;
    let moreColors;
    let moreSizes;
    if (this.state.productAvaliable) {
      availability = (
        <div className={styles.aboutAvailability}>
          <FontAwesomeIcon icon={faTruck} className={styles.bottomIcons}/>
          <div className={styles.aboutAvailabilityText}>Available for delivery in select locations</div>
        </div>
      );
    } else {
      availability = (
        <div className={styles.aboutAvailability}>
          <FontAwesomeIcon icon={faTruck} className={styles.bottomIcons}/>
          <div className={styles.aboutAvailabilityText}>Not available for delivery</div>
        </div>
      );
    }

    // if (this.state.moreOptions) {

    if (this.state.images.length !== 0) {

      // line below used for previous implementation (before Phucci set up another endpoint)
      // if (this.state.linkedColors.length !== 0) {
      // eventually these will not be ids but rather images, will need to query Phucci's service
      moreColors = <MoreColors color={this.state.color} colorOptions={this.state.linkedColors} images={this.state.images}/>;
    } else {
      moreColors = <div></div>;
    }
    if (this.state.linkedSizes.length !== 0) {
      moreSizes = <MoreSizes size={this.state.size}/>;
    } else {
      moreSizes = <div></div>;
    }
    moreOptions = <div className={styles.aboutMoreOptions}>{moreColors}{moreSizes}</div>;

    // } else {
    //   moreOptions = <div></div>;
    // }

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
          {/* <div className={styles.floatClear}></div> */}
          <div className={styles.aboutDescription}>{this.state.category}, {this.state.color}, <span className={styles.aboutSize}>{this.state.size}</span></div>
          <div className={styles.aboutReviews}>{/** query for reviews */}</div>
          <div className={styles.extraLineHeight}> </div>
          {moreOptions}
          <div className={styles.userButtonsContainer}>
            <button className={styles.aboutAddToBagButton}>Add to bag</button>
            <FontAwesomeIcon icon={faHeart} className={styles.aboutHeartButton} />
          </div>
          {availability}
          <div className={styles.aboutCOVID}>
            <FontAwesomeIcon icon={faInfoCircle} className={styles.bottomIcons}/>
            <div className={styles.aboutCOVIDText}>We're sorry, due to COVID-19 delivery times are running longer than usual. We are actively working to improve these issues.</div>
          </div>

        </div>
      );
    }
  }
}

export default About;