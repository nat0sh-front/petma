import React from 'react'
import styles from './EmptyState.module.scss'

const EmptyState = ({ message }) => {
  return (
    <div className={styles.emptyContainer}>
        <p className={styles.message}>{message}</p>
    </div>
  )
}

export default EmptyState