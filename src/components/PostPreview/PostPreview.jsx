import React from 'react'
import styles from './PostPreview.module.scss'
import defaultBackground from '../../assets/images/background.jpg'

const PostPreview = () => {
  return (
    <div className={styles.postPreview}>
        <img className={styles.postImage} src={defaultBackground} alt="Post Image" />
    </div>
  )
}

export default PostPreview