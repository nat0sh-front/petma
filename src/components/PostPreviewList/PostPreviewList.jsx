import React, { useEffect, useState } from 'react'
import styles from './PostPreviewList.module.scss'
import PostPreview from '../PostPreview/PostPreview'
import EmptyState from '../EmptyState/EmptyState'

const PostPreviewList = ({ posts }) => {

  return (
    <div className={styles.postsPreviewList}>
        <h3 className={styles.postsPreviewTitle}>Публикации</h3>
        <div className={styles.postsPreviewContent}>
          {posts.length === 0 ? (
            <EmptyState message="тут скоро будут милые фотки" />
          ) : (
            posts.map(post => (
              <PostPreview key={post.id} post={post} />
            ))
          )}
        </div>
    </div>
  )
}

export default PostPreviewList