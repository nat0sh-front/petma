import React, { useContext, useState } from 'react'
import styles from './AddPostModal.module.scss'
import defaultBackground from '../../assets/images/background.jpg';
import { AuthContext } from '../../context/AuthContext';
import axios from 'axios';

const AddPostModal = ({ isOpen, onClose, onPostAdded }) => {
    const { user } = useContext(AuthContext);
    const [postImage, setPostImage] = useState("");
    const [postText, setPostText] = useState("");
    const [postLocation, setPostLocation] = useState("");

    if (!isOpen) return null;

    function formatDate(dateString) {
        const date = new Date(dateString);
        return date.toLocaleDateString("ru-RU", {
            day: "numeric",
            month: "long",
            year: "numeric",
        });
    }

    const handleImageUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setPostImage(reader.result);
            };
            reader.readAsDataURL(file);
        }
    }

    const handlePostSubmit = async (e) => {
        e.preventDefault();
    
        try {
            const postTime = formatDate(new Date().toISOString());

            const response = await axios.post('http://localhost:5000/posts', {
                id: String(Date.now()),
                authorId: user.id,
                image: postImage, // Изображение
                text: postText, // Текст поста
                location: postLocation || '', // Местоположение (необязательно)
                createdAt: postTime, // Дата создания
                likedBy: [], // Количество лайков
                comments: [], // Комментарии (пустой массив)
            });
            console.log('Пост добавлен:', response.data);
            setPostImage("");           
            onPostAdded();
            onClose(); 
        } catch (error) {
            console.error('Ошибка при добавлении поста:', error);
        }
    };

  return (
    <div className={styles.modalOverlay} onClick={onClose}>
        <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
            <div className={styles.modalHeader}>
                <h2>Новая публикация</h2>
                <button className={styles.closeButton} onClick={onClose}>×</button>
            </div>
            <form className={styles.form} onSubmit={handlePostSubmit}> 
                <div className={styles.postImage}>
                    <div className={styles.postImageWrapper}>
                        <img 
                            src={postImage || defaultBackground}
                            alt="Post Image" 
                            className={styles.preview} 
                        />
                    </div>
                    <input className={styles.fileInput} type="file" name="postImage" accept="image/*" required onChange={handleImageUpload} />
                </div>
                <div className={styles.postInfo}>
                    <div className={styles.postText}>
                        <span className={styles.label}>Подпись:</span>
                        <textarea name="postText" maxLength="200" required onChange={(e) => setPostText(e.target.value)} />
                    </div>
                    <div className={styles.postLocation}>
                        <span className={styles.label}>Место:</span>
                        <input type="text" name="postLocation" onChange={(e) => setPostLocation(e.target.value)} />
                    </div>
                    <button type="submit" className={styles.submitButton}>Поделиться</button>
                </div>
                                
            </form>
        </div>
    </div>
  )
}

export default AddPostModal