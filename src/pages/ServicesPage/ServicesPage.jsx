import React from 'react'
import Header from '../../components/Header/Header'
import Sidebar from '../../components/Sidebar/Sidebar'
import ServicesLayout from '../../layouts/ServicesLayout/ServicesLayout'
import styles from './ServicesPage.module.scss'

const ServicesPage = () => {
  return (
    <div className={styles.servicesPage}>
        <Header />
        <Sidebar />
        <ServicesLayout />
    </div>
  )
}

export default ServicesPage