import React from 'react'
import styles from './HomeLayout.module.scss'
import Feed from '../../components/Feed/Feed'
import Recomendations from '../../components/Recomendations/Recomendations'

const HomeLayout = () => {
  return (
    <div className={styles.homeLayout}>
        <Feed />
        <Recomendations />
    </div>
  )
}

export default HomeLayout