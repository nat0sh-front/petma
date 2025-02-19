import React from 'react'
import styles from './HomePage.module.scss'
import Header from '../../components/Header/Header'
import Sidebar from '../../components/Sidebar/Sidebar'
import HomeLayout from '../../layouts/HomeLayout/HomeLayout'

const HomePage = () => {
  return (
    <div className={styles.homePage}>
        <Header />
        <Sidebar />
        <HomeLayout />
    </div>
  )
}

export default HomePage