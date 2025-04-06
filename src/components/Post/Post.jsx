import React from 'react'
import styles from './Post.module.scss'
import defaultBackground from '../../assets/images/background.jpg'

const Post = () => {
  return (
    <div className={styles.post}>
        <img className={styles.postImage} src={defaultBackground} alt="Post Image" />
    </div>
  )
}

export default Post