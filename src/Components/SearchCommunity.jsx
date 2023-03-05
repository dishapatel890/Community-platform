import React from 'react';
import styles from '../Styles/SearchCommunity.module.css';

const SearchCommunity = () => {
  // Search bar on first communities page
  return (
      <form className={styles.noSubmit}>
        <input className={styles.noSubmit} type="search" placeholder="Search Community" />
      </form>
  )
}

export default SearchCommunity