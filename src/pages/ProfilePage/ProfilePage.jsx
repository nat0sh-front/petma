import React from 'react'
import styles from './ProfilePage.module.scss'
import ProfileLayout from '../../layouts/ProfileLayout/ProfileLayout'
import Header from '../../components/Header/Header'
import Sidebar from '../../components/Sidebar/Sidebar'

const ProfilePage = () => {
  return (
    <div className={styles.profilePage}>
        <Header />
        <Sidebar />
        <ProfileLayout />
    </div>
  )
}

export default ProfilePage