import React from 'react'
import styles from './ServicesLayout.module.scss'
import EmptyState from '../../components/EmptyState/EmptyState'

const ServicesLayout = () => {
  return (
    <div className={styles.servicesLayout}>
        <EmptyState message={"Услуги находятся в разработке"} />
    </div>
  )
}

export default ServicesLayout