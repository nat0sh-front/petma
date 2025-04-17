import React from 'react'
import { Link } from 'react-router-dom'
import defaultAvatar from '../../assets/images/avatar.png'
import defaultBackground from '../../assets/images/background.jpg'
import like from '../../assets/icons/like.svg'
import comment from '../../assets/icons/comment.svg'
import styles from './Post.module.scss'

const Post = ({ post, user }) => {
  return (
    <article className={styles.post}>
        <div className={styles.postTitle}>
            <img className={styles.avatar} src={user.avatar || defaultAvatar} alt="" />
            <div className={styles.postAuthor}>
            <Link className={styles.linkProfile} to="/profile">
                <span className={styles.name}>{user.name} {user.surname}</span>
                <span className={styles.username}>{post.location}</span>
            </Link>
            </div>
        </div>
        <img className={styles.postImage} src={post.image || defaultBackground} alt="" />
        <div className={styles.postInfo}>
            <ul className={styles.postButtonList}>
                <li className={styles.postButtonItem}>
                    <img className={styles.likeIcon} src={like} alt="" />
                    <span className={styles.likeCount}>{post.likedBy?.length || 0}</span>
                </li>
                <li className={styles.postButtonItem}>
                    <img className={styles.commentIcon} src={comment} alt="" />
                    <span className={styles.commentCount}>{post.comments.length}</span>
                </li>
            </ul>
            <span className={styles.postTime}>{post.createdAt}</span>
        </div>
        <p className={styles.postText}>
            {post.text}
        </p>
    </article>
  )
}

export default Post