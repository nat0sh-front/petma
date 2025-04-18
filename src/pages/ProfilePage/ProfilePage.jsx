import React from 'react'
import styles from './ProfilePage.module.scss'
import Header from '../../components/Header/Header'
import Sidebar from '../../components/Sidebar/Sidebar'
import ProfileLayout from '../../layouts/ProfileLayout/ProfileLayout'

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