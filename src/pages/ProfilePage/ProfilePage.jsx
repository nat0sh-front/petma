import React from 'react'
import styles from './ProfilePage.module.scss'
import ProfileLayout from '../../layouts/ProfileLayout/ProfileLayout'

const ProfilePage = () => {
  return (
    <div className={styles.profilePage}>
        <ProfileLayout />
    </div>
  )
}

export default ProfilePage