import React from 'react'
import { Link } from 'react-router-dom'
import avatar from '../../assets/images/avatar.png'
import postImage from '../../assets/images/background.jpg'
import like from '../../assets/icons/like.svg'
import comment from '../../assets/icons/comment.svg'
import styles from './Post.module.scss'

const Post = () => {
  return (
    <article className={styles.post}>
        <div className={styles.postTitle}>
            <img className={styles.avatar} src={avatar} alt="" />
            <div className={styles.postAuthor}>
            <Link className={styles.linkProfile} to="/profile">
                <span className={styles.name}>Вы</span>
                <span className={styles.username}>@username</span>
            </Link>
            </div>
        </div>
        <img className={styles.postImage} src={postImage} alt="" />
        <div className={styles.postInfo}>
            <ul className={styles.postButtonList}>
                <li className={styles.postButtonItem}>
                    <img className={styles.likeIcon} src={like} alt="" />
                    <span className={styles.likeCount}>54</span>
                </li>
                <li className={styles.postButtonItem}>
                    <img className={styles.commentIcon} src={comment} alt="" />
                    <span className={styles.commentCount}>27</span>
                </li>
            </ul>
            <span className={styles.postTime}>19 ферваля 2025</span>
        </div>
        <p className={styles.postText}>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorum consequatur alias nihil soluta aliquid quia consectetur? Deleniti voluptas soluta sit, pariatur vero asperiores unde ad similique itaque inventore eum nam.
        </p>
    </article>
  )
}

export default Post