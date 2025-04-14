import React, { useContext, useState } from 'react'
import styles from './PostModal.module.scss'
import defaultBackground from '../../assets/images/background.jpg';
import defaultAvatar from '../../assets/images/avatar.png';
import menu from '../../assets/icons/menu.svg';
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
                
            </div>
        </div>
    </div>
  )
}

export default PostModal