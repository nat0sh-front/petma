import React from 'react'
import styles from './Feed.module.scss'
import Post from '../Post/Post'

const Feed = () => {
  return (
    <div className={styles.feed}>
      <Post />
      <hr className={styles.postHR} />
      <Post />
    </div>
  )
}

export default Feed