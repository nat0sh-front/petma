import React from 'react'
import styles from './ProfileLayout.module.scss'
import Profile from '../../components/Profile/Profile'

const ProfileLayout = () => {
  return (
    <div className={styles.profileLayout}>
      <Profile />
    </div>
  )
}

export default ProfileLayout