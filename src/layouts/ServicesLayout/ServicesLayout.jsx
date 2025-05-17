import React from 'react'
import styles from './ServicesLayout.module.scss'
import Services from '../../components/Services/Services'

const ServicesLayout = () => {
  return (
    <div className={styles.servicesLayout}>
      <Services />
    </div>
  )
}

export default ServicesLayout