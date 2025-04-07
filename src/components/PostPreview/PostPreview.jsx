import React from 'react'
import styles from './PostPreview.module.scss'

const PostPreview = ({ image }) => {
  if (!image) {
    return null;  
  }

  return (
    <div className={styles.postPreview}>
        <img className={styles.postImage} src={image} alt="Post Image" />
    </div>
  )
}

export default PostPreview