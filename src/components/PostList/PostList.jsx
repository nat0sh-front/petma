import React from 'react'
import styles from './PostList.module.scss'
import Post from '../Post/Post'

const PostList = () => {
  return (
    <div className={styles.posts}>
        <h3 className={styles.postsTitle}>Публикации</h3>
        <div className={styles.postsContent}>
            <Post />
            <Post />
            <Post />
            <Post />
        </div>
    </div>
  )
}

export default PostList