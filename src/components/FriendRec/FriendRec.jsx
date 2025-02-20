import React from 'react'
import styles from './FriendRec.module.scss'
import plus from '../../assets/icons/plus.svg'
import avatar from '../../assets/images/avatar.png'

const FriendRec = () => {
  return (
    <div className={styles.friendRec}>
        <div className={styles.friendHeader}>
            <img className={styles.avatar} src={avatar} alt="" />
            <div className={styles.friendInfo}>
                <div className={styles.name}>Тлек Болатов</div>
                <div className={styles.bio}>Backend разработчик</div>
            </div>
        </div>
        <button className={styles.addButton}><img className={styles.addIcon} src={plus} alt="" /></button>
    </div>
  )
}

export default FriendRec