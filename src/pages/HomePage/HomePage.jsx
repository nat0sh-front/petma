import React from 'react'
import styles from './HomePage.module.scss'
import Header from '../../components/Header/Header'

const HomePage = () => {
  return (
    <div className={styles.homePage}>
        <Header />
    </div>
  )
}

export default HomePage