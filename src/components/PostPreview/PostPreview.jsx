import React, { useState } from 'react'
import styles from './PostPreview.module.scss'
import PostModal from '../PostModal/PostModal';

const PostPreview = ({ image }) => {
  const [isPostModalOpen, setIsPostModalOpen] = useState(false);

  if (!image) {
    return null;  
  }

  const handleModalOpen = () => {
    setIsPostModalOpen(true);
  }

  return (
  <>
    <button className={styles.postPreview} onClick={handleModalOpen}>
        <img className={styles.postImage} src={image} alt="Post Image" />
    </button>
    <PostModal 
      isOpen={isPostModalOpen} 
      onClose={() => setIsPostModalOpen(false)}
    />
  </>
  )
}

export default PostPreview