import React from 'react'
import styles from './Profile.module.scss'
import cover from '../../assets/images/background.jpg'
import avatar from '../../assets/images/avatar.png'
import petImage from '../../assets/images/avatar.png'
import addIcon from '../../assets/icons/plus.svg'

const Profile = () => {
  return (
    <div className={styles.profile}>
        <img className={styles.cover} src={cover} alt="" />
        <img className={styles.avatar} src={avatar} alt="" />
        <div className={styles.content}>
            <div className={styles.name}>Інжу Сұңқарқызы</div>
            <div className={styles.info}>
                <span className={styles.city}>Алматы</span>
                <span className={styles.followingCount}>24 подписок</span>
                <span className={styles.followerCount}>37 подписчиков</span>
            </div>
            <p className={styles.bio}>Incidunt, at accusamus dignissimos explicabo nemo commodi labore magni provident odio veniam necessitatibus eos porro vel, architecto distinctio sed iste corporis temporibus.</p>
            <div className={styles.petContainer}>
                <button className={styles.petButton}>
                    <img className={styles.petImage} src={petImage} alt="" />
                    <span className={styles.petName}>Барсик</span>
                </button>
                <button className={`${styles.petButton} ${styles.petAdd}`}>
                    <img className={styles.petImg} src={addIcon} alt="" />
                </button>
            </div>
        </div>
        
    </div>
  )
}

export default Profile