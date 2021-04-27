import React from 'react';
import styles from '../style.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGreaterThan } from '@fortawesome/free-solid-svg-icons';

const MoreSizes = (props) => {
  return (<div className={styles.aboutMoreSizes}>
    <div className={styles.gridForMore}>
      <div className={styles.aboutMoreSizesTitle}>Size</div>
      <div className={styles.aboutMoreSizesSize}>{props.size}</div>
      <FontAwesomeIcon icon={faGreaterThan} className={styles.aboutArrowButton}/>
    </div>
  </div>);
};

export default MoreSizes;