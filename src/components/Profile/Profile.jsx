import React, { useContext, useState, useEffect } from 'react';
import { AuthContext } from '../../context/AuthContext';

import styles from './Profile.module.scss';

import defaultCover from '../../assets/images/background.jpg';
import defaultAvatar from '../../assets/images/avatar.png';
import addIcon from '../../assets/icons/plus.svg';
import edit from '../../assets/icons/edit.svg';
import EditProfileModal from '../EditProfileModal/EditProfileModal';

const Profile = () => {
    const { user, updateUser } = useContext(AuthContext);
    const [currentUser, setCurrentUser] = useState(user);

    useEffect(() => {
        const storedUser = JSON.parse(localStorage.getItem('user'));
        if (storedUser) {
            setCurrentUser(storedUser);
        }
    }, [user]); // Обновляем при изменении user

    const handleProfileUpdate = (updatedUser) => {
        updateUser(updatedUser);
        localStorage.setItem('user', JSON.stringify(updatedUser)); // Обновляем localStorage
        setCurrentUser(updatedUser);
    };

    const [isModalOpen, setIsModalOpen] = useState(false);

    return (
        <div className={styles.profile}>
            <img className={styles.cover} src={currentUser?.cover || defaultCover} alt="Cover" />
            <img className={styles.avatar} src={currentUser?.avatar || defaultAvatar} alt="Avatar" />
            <button className={styles.editButton} onClick={() => setIsModalOpen(true)}>
                <img className={styles.editIcon} src={edit} alt="Edit" />
            </button>
            <div className={styles.content}>
                <span className={styles.name}>
                    {currentUser?.name || 'Гость'} {currentUser?.surname || ''}
                </span>
                <div className={styles.info}>
                    <span className={styles.petCount}>0 питомцев</span>
                    <span className={styles.followingCount}>0 друзей</span>
                    <span className={styles.followerCount}>0 постов</span>
                </div>
                <span className={styles.bio}>
                    {currentUser?.bio ? currentUser.bio : 'Расскажите о себе...'}
                </span>
                <div className={styles.petContainer}>
                    <button className={styles.petButton}>
                        <img className={styles.petImage} src={defaultAvatar} alt="Pet" />
                        <span className={styles.petName}>Барсик</span>
                    </button>
                    <button className={`${styles.petButton} ${styles.petAdd}`}>
                        <img className={styles.petImg} src={addIcon} alt="Add Pet" />
                    </button>
                </div>
            </div>
            <EditProfileModal 
                isOpen={isModalOpen} 
                onClose={() => setIsModalOpen(false)} 
                onUpdate={handleProfileUpdate}
                userData={currentUser}
            />
        </div>
    );
};

export default Profile;
