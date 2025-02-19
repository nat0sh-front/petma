import React from 'react'
import styles from './HomeLayout.module.scss'
import Feed from '../../components/Feed/Feed'

const HomeLayout = () => {
  return (
    <div className={styles.homeLayout}>
        <Feed />
        <div className={styles.recomendations}></div>
    </div>
  )
}

export default HomeLayout