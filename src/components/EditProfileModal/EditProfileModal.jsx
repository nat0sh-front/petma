import React, { useContext } from "react";
import styles from "./EditProfileModal.module.scss";
import { AuthContext } from "../../context/AuthContext";
import defaultCover from "../../assets/images/background.jpg";
import defaultAvatar from "../../assets/images/avatar.png";

const EditProfileModal = ({ isOpen, onClose }) => {
    const { user, updateUser } = useContext(AuthContext);

    const handleChange = (e) => {
        updateUser({ ...user, [e.target.name]: e.target.value });
    };

    const handleImageUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                updateUser({ ...user, [e.target.name]: reader.result });
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        localStorage.setItem("user", JSON.stringify(user)); // Сохраняем в localStorage
        onClose();
    };

    if (!isOpen) return null;

    return (
        <div className={styles.modalOverlay} onClick={onClose}>
            <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
                <div className={styles.modalHeader}>
                    <h2>Редактировать профиль</h2>
                    <button className={styles.closeButton} onClick={onClose}>×</button>
                </div>
                <form className={styles.form} onSubmit={handleSubmit}>
                    <h4 className={styles.label}>Обложка:</h4>
                    <input type="file" name="cover" accept="image/*" onChange={handleImageUpload} />
                    <img 
                        src={user.cover || defaultCover} 
                        alt="Cover" 
                        className={styles.preview} 
                    />
                    
                    <h4 className={styles.label}>Фото профиля:</h4>
                    <input type="file" name="avatar" accept="image/*" onChange={handleImageUpload} />
                    <img 
                        src={user.avatar || defaultAvatar} 
                        alt="Avatar" 
                        className={styles.preview} 
                    />
                    
                    <h4 className={styles.label}>Имя:</h4>
                    <input type="text" name="name" value={user.name || ""} onChange={handleChange} />
                    
                    <h4 className={styles.label}>Фамилия:</h4>
                    <input type="text" name="surname" value={user.surname || ""} onChange={handleChange} />
                    
                    <h4 className={styles.label}>О себе:</h4>
                    <textarea name="bio" value={user.bio || ""} onChange={handleChange} />
                    
                    <button type="submit" className={styles.saveButton}>Сохранить</button>
                </form>
            </div>
        </div>
    );
};

export default EditProfileModal;
