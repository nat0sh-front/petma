import React from 'react'
import styles from './Comment.module.scss'
import defaultAvatar from '../../assets/images/avatar.png'

const Comment = () => {
  return (
    <div className={styles.comment}>
        <div className={styles.commentHeader}>
            <img className={styles.avatar} src={defaultAvatar} alt="" />
            <span className={styles.userName}>Ибраймова Айгерим</span>
        </div>
        <p className={styles.commentText}>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quidem ipsa, provident consequatur minima sunt beatae, et quis dolorum, sint fugit dolor. Ex officiis omnis ad blanditiis asperiores ducimus vero fugiat.</p>
    </div>
  )
}

export default Comment