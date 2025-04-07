import React from 'react'
import styles from './PostPreviewList.module.scss'
import PostPreview from '../PostPreview/PostPreview'

const PostPreviewList = () => {
  return (
    <div className={styles.postsPreviewList}>
        <h3 className={styles.postsPreviewTitle}>Публикации</h3>
        <div className={styles.postsPreviewContent}>
            <PostPreview />
            <PostPreview />
            <PostPreview />
            <PostPreview />
            <PostPreview />
        </div>
    </div>
  )
}

export default PostPreviewList