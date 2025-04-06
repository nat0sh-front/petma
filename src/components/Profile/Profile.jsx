import React, { useContext, useState, useEffect } from 'react';
import { AuthContext } from '../../context/AuthContext';

import styles from './Profile.module.scss';

import defaultBackground from '../../assets/images/background.jpg';
import defaultAvatar from '../../assets/images/avatar.png';
import addIcon from '../../assets/icons/plus.svg';
import editIcon from '../../assets/icons/edit.svg';
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
            <header className={styles.header}>
                <img className={styles.avatar} src={currentUser?.avatar || defaultAvatar} alt="Avatar" />
                <div className={styles.info}>
                    <div className={styles.nameContainer}>
                        <span className={styles.name}>
                            {currentUser?.name || 'Гость'} {currentUser?.surname || ''}
                        </span>
                    </div>
                    <div className={styles.countContainer}>
                        <span className={styles.petCount}>0 питомцев</span>
                        <span className={styles.followingCount}>0 друзей</span>
                        <span className={styles.followerCount}>0 постов</span>
                    </div>
                    <div className={styles.bioContainer}>
                        <span className={styles.bio}>
                            {currentUser?.bio ? currentUser.bio : 'Расскажите о себе...'}
                        </span>
                    </div>
                </div>
            </header>
            <div className={styles.profileButtons}>
                <button className={styles.addPostButton}>
                    <img className={styles.addIcon} src={addIcon} alt="Add Publication" />
                    <span className={styles.addPostButtonText}>Опубликовать</span>
                </button>
                <button className={styles.editButton} onClick={() => setIsModalOpen(true)}>
                    <img className={styles.editIcon} src={editIcon} alt="Edit Profile" />
                    <span className={styles.editButtonText}>Редактировать</span>
                </button>
            </div>
            <div className={styles.pets}>
                <h3 className={styles.petsTitle}>Питомцы</h3>
                <div className={styles.petsContent}>
                    <div className={styles.pet}>
                        <img className={styles.petAvatar} src={defaultAvatar} alt="Pet" />
                        <div className={styles.petInfo}>
                            <span className={styles.petName}>Барсик</span>
                            <div className={styles.petInfoWrapper}>
                                <span className={styles.petType}>Кот</span>
                                <span className={styles.petAge}>2 года</span>
                                <span className={styles.petBreed}>Сиамский</span>
                            </div>
                            <span className={styles.petBio}>Любит спать на клавиатуре</span>
                        </div>
                    </div>
                    <div className={styles.pet}>
                        <img className={styles.petAvatar} src={defaultAvatar} alt="Pet" />
                        <div className={styles.petInfo}>
                            <span className={styles.petName}>Барсик</span>
                            <div className={styles.petInfoWrapper}>
                                <span className={styles.petType}>Кот</span>
                                <span className={styles.petAge}>2 года</span>
                                <span className={styles.petBreed}>Сиамский</span>
                            </div>
                            <span className={styles.petBio}>Любит спать на клавиатуре</span>
                        </div>
                    </div>
                </div>
            </div>
            <div className={styles.posts}>
                <h3 className={styles.postsTitle}>Публикации</h3>
                <div className={styles.postsContent}>
                    <div className={styles.post}>
                        <img className={styles.postImage} src={defaultBackground} alt="Post Image" />
                    </div>
                    <div className={styles.post}>
                        <img className={styles.postImage} src={defaultBackground} alt="Post Image" />
                    </div>
                    <div className={styles.post}>
                        <img className={styles.postImage} src={defaultBackground} alt="Post Image" />
                    </div>
                    <div className={styles.post}>
                        <img className={styles.postImage} src={defaultBackground} alt="Post Image" />
                    </div>
                </div>
            </div>

            {/* <img className={styles.avatar} src={currentUser?.avatar || defaultAvatar} alt="Avatar" />
            <span className={styles.name}>
                    {currentUser?.name || 'Гость'} {currentUser?.surname || ''}
            </span>
            <button className={styles.editButton} onClick={() => setIsModalOpen(true)}>
                <img className={styles.editIcon} src={edit} alt="Edit" />
            </button>
            <div className={styles.content}>
                
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
            /> */}
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
