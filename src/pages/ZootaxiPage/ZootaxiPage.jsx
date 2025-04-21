import React from 'react'
import Header from '../../components/Header/Header'
import Sidebar from '../../components/Sidebar/Sidebar'
import ZootaxiLayout from '../../layouts/ZootaxiLayout/ZootaxiLayout'
import styles from './ZootaxiPage.module.scss'

const ZootaxiPage = () => {
  return (
    <div className={styles.zootaxiPage}>
        <Header />
        <Sidebar />
        <ZootaxiLayout />
    </div>
  )
}

export default ZootaxiPage