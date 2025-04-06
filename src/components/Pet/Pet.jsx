import React from 'react'
import styles from './Pet.module.scss'
import defaultAvatar from '../../assets/images/avatar.png'

const Pet = () => {
  return (
    <div className={styles.pet}>
        <img className={styles.petAvatar} src={defaultAvatar} alt="Pet" />
        <div className={styles.petInfo}>
            <span className={styles.petName}>Барсик</span>
            <div className={styles.petInfoWrapper}>
                <span className={styles.petType}>Кот</span>
                <span className={styles.petAge}>2 года</span>
                <span className={styles.petBreed}>Сиамский</span>
            </div>
            <span className={styles.petBio}>Любит спать на клавиатуре</span>
        </div>
    </div>
  )
}

export default Pet