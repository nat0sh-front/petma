import React, { useContext, useEffect, useState } from 'react'
import styles from './PostModal.module.scss'
import defaultBackground from '../../assets/images/background.jpg';
import defaultAvatar from '../../assets/images/avatar.png';
import menu from '../../assets/icons/menu.svg';
import like from '../../assets/icons/like.svg';
import comment from '../../assets/icons/comment.svg';
import plane from '../../assets/icons/plane.svg'
import Comment from '../Comment/Comment';
import { AuthContext } from '../../context/AuthContext';
import axios from 'axios';

const PostModal = ({ isOpen, onClose }) => {
    // const { user } = useContext(AuthContext);
    // const [postImage, setPostImage] = useState("");
    // const [postText, setPostText] = useState("");
    // const [postLocation, setPostLocation] = useState("");

    if (!isOpen) return null;

    // const handleImageUpload = (e) => {
    //     const file = e.target.files[0];
    //     if (file) {
    //         const reader = new FileReader();
    //         reader.onloadend = () => {
    //             setPostImage(reader.result);
    //         };
    //         reader.readAsDataURL(file);
    //     }
    // }

    // const handlePostSubmit = async (e) => {
    //     e.preventDefault();
    
    //     try {
    //         const postTime = new Date().toISOString();

    //         const response = await axios.post('http://localhost:5000/posts', {
    //             userId: user.id,
    //             image: postImage, // Изображение
    //             text: postText, // Текст поста
    //             location: postLocation || '', // Местоположение (необязательно)
    //             createdAt: postTime, // Дата создания
    //             likes: 0, // Количество лайков
    //             comments: [], // Комментарии (пустой массив)
    //         });
    //         console.log('Пост добавлен:', response.data);
    //         onPostAdded();
    //         onClose(); 
    //     } catch (error) {
    //         console.error('Ошибка при добавлении поста:', error);
    //     }
    // };

  return (
    <div className={styles.modalOverlay} onClick={onClose}>
        <button className={styles.closeButton} onClick={onClose}>×</button>
        <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
            <div className={styles.postImage}>
                <img 
                    src={defaultBackground}
                    alt="Post Image"
                    className={styles.previewPost} 
                />
            </div>
            <div className={styles.postInfo}>
                <div className={styles.postHeader}>
                    <div className={styles.postAuthor}>
                        <img 
                            className={styles.avatar} 
                            src={defaultAvatar} 
                            alt="Avatar" 
                        />
                        <div className={styles.author}>
                            <span className={styles.name}>Натали Гвоздь</span>
                            <span className={styles.location}>Almaty</span>
                        </div>
                    </div>
                    <button className={styles.menuButton}>
                        <img className={styles.menuIcon} src={menu} alt="" />
                    </button>
                </div>
                <div className={styles.postText}>
                    <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Alias odio suscipit veritatis doloremque? Consequuntur neque quidem ut provident, consequatur accusamus voluptates iste vitae, dignissimos excepturi, illo fuga cumque maxime deserunt?</p>
                </div>
                <div className={styles.commentList}>
                    <Comment />
                    <Comment />
                    <Comment />
                </div>
                <div className={styles.postFooter}>
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
                    <div className={styles.commentInputWrapper}>
                        <input type="text" className={styles.commentInput} placeholder="Добавить комментарий..." />
                        <button className={styles.commentButton}><img className={styles.commentButtonIcon} src={plane} alt="" /></button>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default PostModal