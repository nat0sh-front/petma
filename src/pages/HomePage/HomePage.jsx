import React from 'react'
import styles from './HomePage.module.scss'
import Header from '../../components/Header/Header'
import Sidebar from '../../components/Sidebar/Sidebar'

const HomePage = () => {
  return (
    <div className={styles.homePage}>
        <Header />
        <Sidebar />
    </div>
  )
}

export default HomePage