import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import defaultAvatar from '../../assets/images/avatar.png';
import defaultBackground from '../../assets/images/background.jpg';
import like from '../../assets/icons/like.svg';
import comment from '../../assets/icons/comment.svg';
import styles from './Post.module.scss';
import PostModal from '../PostModal/PostModal';
import axios from 'axios';

const Post = ({ post, user, onUpdatePost }) => {
  const [isPostModalOpen, setIsPostModalOpen] = useState(false);

  const handleLikeToggle = () => {
    const userId = user.id;
    const alreadyLiked = post.likedBy?.includes(userId);
  
    const updatedLikedBy = alreadyLiked
      ? post.likedBy.filter(id => id !== userId)
      : [...(post.likedBy || []), userId];
  
    axios.patch(`http://localhost:5000/posts/${post.id}`, {
      likedBy: updatedLikedBy
    })
      .then(res => {
        if (onUpdatePost) {
          onUpdatePost({ ...post, likedBy: updatedLikedBy });
        }
      })
      .catch(err => console.error("Ошибка при обновлении лайков:", err));
  };

  const isLiked = post.likedBy?.includes(user?.id);

  return (
    <article className={styles.post}>
      <div className={styles.postTitle}>
        <img className={styles.avatar} src={user?.avatar || defaultAvatar} alt="" />
        <div className={styles.postAuthor}>
          <Link className={styles.linkProfile} to={`/profile/${user?.id}`}>
            <span className={styles.name}>{user?.name} {user?.surname}</span>
            <span className={styles.username}>{post.location}</span>
          </Link>
        </div>
      </div>
      <img className={styles.postImage} src={post.image || defaultBackground} alt="" />
      <div className={styles.postInfo}>
        <ul className={styles.postButtonList}>
          <li className={styles.postButtonItem} onClick={handleLikeToggle}>
            <svg
              width="18"
              height="17"
              viewBox="0 0 18 17"
              fill={isLiked ? "red" : "none"}
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M8.46111 2.11685L9 2.67356L9.53888 2.11685C11.303 0.294382 14.1528 0.294382 15.917 2.11685C17.6943 3.95302 17.6943 6.93981 15.917 8.77597L9.17963 15.7361C9.08138 15.8376 8.91862 15.8376 8.82037 15.7361L2.08304 8.77597C0.305653 6.93981 0.305653 3.95302 2.08304 2.11685C3.84718 0.294382 6.69698 0.294382 8.46111 2.11685Z"
                stroke={isLiked ? "red" : "currentColor"}
                strokeWidth="1.5"
              />
            </svg>
            <span className={styles.likeCount}>{post.likedBy?.length || 0}</span>
          </li>
          <li className={styles.postButtonItem} onClick={() => setIsPostModalOpen(true)}>
            <img className={styles.commentIcon} src={comment} alt="" />
            <span className={styles.commentCount}>{post.comments?.length || 0}</span>
          </li>
        </ul>
        <span className={styles.postTime}>{post.createdAt}</span>
      </div>
      <p className={styles.postText}>{post.text}</p>
      <PostModal
        isOpen={isPostModalOpen}
        onClose={() => setIsPostModalOpen(false)}
        post={post}
      />
    </article>
  );
};

export default Post;
