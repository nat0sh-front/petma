import React from 'react'
import styles from './HomeLayout.module.scss'
import Feed from '../../components/Feed/Feed'
import RecomendationList from '../../components/RecomendationList/RecomendationList'

const HomeLayout = () => {
  return (
    <div className={styles.homeLayout}>
        <Feed />
        <RecomendationList />
    </div>
  )
}

export default HomeLayout