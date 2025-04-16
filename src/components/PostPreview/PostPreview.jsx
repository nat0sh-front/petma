import React, { useState } from 'react'
import styles from './PostPreview.module.scss'
import PostModal from '../PostModal/PostModal';

const PostPreview = ({ post, handlePostAdded }) => {
  const [isPostModalOpen, setIsPostModalOpen] = useState(false);

  if (!post.image) {
    return null;  
  }

  const handleModalOpen = () => {
    setIsPostModalOpen(true);
  }

  return (
  <>
    <button className={styles.postPreview} onClick={handleModalOpen}>
        <img className={styles.postImage} src={post.image} alt="Post Image" />
    </button>
    <PostModal 
      isOpen={isPostModalOpen} 
      onClose={() => setIsPostModalOpen(false)}
      onPostAdded={handlePostAdded}
      post = {post}
    />
  </>
  )
}

export default PostPreview