import React from 'react'
import styles from './ZootaxiLayout.module.scss'
import EmptyState from '../../components/EmptyState/EmptyState'

const ZootaxiLayout = () => {
  return (
    <div className={styles.zootaxiLayout}>
        <EmptyState message={"Зоотакси находится в разработке"} />
    </div>
  )
}

export default ZootaxiLayout