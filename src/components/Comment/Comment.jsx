import React from 'react'
import styles from './Comment.module.scss'
import defaultAvatar from '../../assets/images/avatar.png'

const Comment = ({ comment, author, formatDate }) => {
  if (!author) return null;

  return (
    <div className={styles.comment}>
        <div className={styles.commentHeader}>
          <div className={styles.commentAuthor}>
            <img className={styles.avatar} src={author.avatar || defaultAvatar} alt="" />
            <span className={styles.userName}>{author.name} {author.surname}</span>
          </div>
          <span className={styles.commentTime}>{formatDate(comment.createdAt)}</span>
        </div>
        <p className={styles.commentText}>{comment.text}</p>
    </div>
  )
}

export default Comment