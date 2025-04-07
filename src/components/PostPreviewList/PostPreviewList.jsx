import React, { useEffect, useState } from 'react'
import styles from './PostPreviewList.module.scss'
import PostPreview from '../PostPreview/PostPreview'

const PostPreviewList = ({ posts }) => {

  return (
    <div className={styles.postsPreviewList}>
        <h3 className={styles.postsPreviewTitle}>Публикации</h3>
        <div className={styles.postsPreviewContent}>
          {posts.map(post => (
            <PostPreview key={post.id} image={post.image} />
          ))}
        </div>
    </div>
  )
}

export default PostPreviewList