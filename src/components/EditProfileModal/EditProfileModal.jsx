import React, { useContext, useEffect, useState } from "react";
import styles from "./EditProfileModal.module.scss";
import { AuthContext } from "../../context/AuthContext";
import defaultAvatar from "../../assets/images/avatar.png";

const EditProfileModal = ({ isOpen, onClose }) => {
    const { user, updateUser } = useContext(AuthContext);

    const [name, setName] = useState(user?.name || '');
    const [surname, setSurname] = useState(user?.surname || '');
    const [avatar, setAvatar] = useState(user?.avatar || ''); 
    const [bio, setBio] = useState(user?.bio || '');

    useEffect(() => {
        setName(user?.name || '');
        setSurname(user?.surname || '');
        setAvatar(user?.avatar || '');
        setBio(user?.bio || '');
    }, [user]);

    if (!isOpen) return null; 
    if (!user) return null; 

    const handleSave = async (e) => {
        e.preventDefault();
        const updatedUser = { ...user, name, surname, avatar, bio };
        await updateUser(updatedUser);
        onClose();
    };

    const handleImageUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setAvatar(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    return (
        <div className={styles.modalOverlay} onClick={onClose}>
            <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
                <div className={styles.modalHeader}>
                    <h2>Редактировать профиль</h2>
                    <button className={styles.closeButton} onClick={onClose}>×</button>
                </div>
                <form className={styles.form} onSubmit={handleSave}>
                    <div className={styles.avatar}>
                        <span className={styles.label}>Фото профиля:</span>
                        <div className={styles.avatarContent}>
                            <img 
                                src={avatar || defaultAvatar} 
                                alt="Avatar" 
                                className={styles.preview} 
                            />
                            <input className={styles.fileInput} type="file" name="avatar" accept="image/*" onChange={handleImageUpload} />
                        </div>
                    </div>
                    <div className={styles.name}>
                        <span className={styles.label}>Имя:</span>
                        <input type="text" name="name" value={name || ""} onChange={(e) => setName(e.target.value)} />
                    </div>
                    <div className={styles.surname}>
                        <span className={styles.label}>Фамилия:</span>
                        <input type="text" name="surname" value={surname || ""} onChange={(e) => setSurname(e.target.value)} />
                    </div>
                    <div className={styles.bio}>
                        <span className={styles.label}>О себе:</span>
                        <textarea name="bio" maxLength="150" value={bio || ""} onChange={(e) => setBio(e.target.value)} />
                    </div>                    
                    <button type="submit" className={styles.saveButton}>Сохранить</button>
                </form>
            </div>
        </div>
    );
};

export default EditProfileModal;
