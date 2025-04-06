import React, { useContext } from "react";
import styles from "./EditProfileModal.module.scss";
import { AuthContext } from "../../context/AuthContext";
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
                    <div className={styles.avatar}>
                        <span className={styles.label}>Фото профиля:</span>
                        <div className={styles.avatarContent}>
                            <img 
                                src={user.avatar || defaultAvatar} 
                                alt="Avatar" 
                                className={styles.preview} 
                            />
                            <input className={styles.fileInput} type="file" name="avatar" accept="image/*" onChange={handleImageUpload} />
                        </div>
                    </div>
                    <div className={styles.name}>
                        <span className={styles.label}>Имя:</span>
                        <input type="text" name="name" value={user.name || ""} onChange={handleChange} />
                    </div>
                    <div className={styles.surname}>
                        <span className={styles.label}>Фамилия:</span>
                        <input type="text" name="surname" value={user.surname || ""} onChange={handleChange} />
                    </div>
                    <div className={styles.bio}>
                        <span className={styles.label}>О себе:</span>
                        <textarea name="bio" maxLength="100" value={user.bio || ""} onChange={handleChange} />
                    </div>                    
                    <button type="submit" className={styles.saveButton}>Сохранить</button>
                </form>
            </div>
        </div>
    );
};

export default EditProfileModal;
