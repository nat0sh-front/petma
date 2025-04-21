import React, { useContext, useState, useEffect } from 'react';
import { AuthContext } from '../../context/AuthContext';

import styles from './Profile.module.scss';

import defaultAvatar from '../../assets/images/avatar.png';
import addIcon from '../../assets/icons/plus.svg';
import editIcon from '../../assets/icons/edit.svg';
import EditProfileModal from '../EditProfileModal/EditProfileModal';
import PetList from '../PetList/PetList';
import PostPreviewList from '../PostPreviewList/PostPreviewList';
import AddPostModal from '../AddPostModal/AddPostModal';
import axios from 'axios';
import PetModal from '../PetModal/PetModal';

const Profile = () => {
    const { user } = useContext(AuthContext);

    const [isEditProfileModalOpen, setIsEditProfileModalOpen] = useState(false);
    const [isAddPostModalOpen, setIsAddPostModalOpen] = useState(false);
    const [isAddPetModalOpen, setIsAddPetModalOpen] = useState(false);

    const [posts, setPosts] = useState([]);
    const [pets, setPets] = useState([]);

    const fetchPosts = async () => {
        try {
          const response = await axios.get('http://localhost:5000/posts', { params: { authorId: user?.id } });
          setPosts(response.data);
        } catch (error) {
          console.error('Ошибка при загрузке постов:', error);
        }
      };

    const fetchPets = async () => {
        try {
            const response = await axios.get('http://localhost:5000/pets', { params: { ownerId: user?.id } });
            setPets(response.data);
        } catch (error) {
            console.error('Ошибка при загрузке питомцев:', error);
        }
    };  
    
      useEffect(() => {
        if (user?.id) {
          fetchPosts();
          fetchPets();
        }
      }, [user]);
    
    const handlePostAdded = () => {
        fetchPosts();  
    };

    const handlePetAdded = () => {
        fetchPets();  
    };

    const getWordForm = (count, forms) => {
        const lastDigit = count % 10;
        const lastTwoDigits = count % 100;
      
        if (lastTwoDigits >= 11 && lastTwoDigits <= 14) {
          return `${count} ${forms[2]}`; // множественное число (5+)
        }
      
        if (lastDigit === 1) {
          return `${count} ${forms[0]}`; // единственное число (1)
        }
      
        if (lastDigit >= 2 && lastDigit <= 4) {
          return `${count} ${forms[1]}`; // родительный (2-4)
        }
      
        return `${count} ${forms[2]}`; // множественное число (5+)
      }

      const petCountText = getWordForm(pets.length, ['питомец', 'питомца', 'питомцев']);
      const followerCountText = getWordForm(0, ['подписчик', 'подписчика', 'подписчиков']);
      const followingCountText = getWordForm(0, ['подписка', 'подписки', 'подписок']);

    return (
        <div className={styles.profile}>
            <header className={styles.header}>
                <img className={styles.avatar} src={user?.avatar || defaultAvatar} alt="Avatar" />
                <div className={styles.info}>
                    <div className={styles.nameContainer}>
                        <span className={styles.name}>
                            {user?.name || 'Гость'} {user?.surname || ''}
                        </span>
                    </div>
                    <div className={styles.countContainer}>
                        <span className={styles.petCount}>{petCountText}</span>
                        <span className={styles.followingCount}>{followingCountText}</span>
                        <span className={styles.followerCount}>{followerCountText}</span>
                    </div>
                    <div className={styles.bioContainer}>
                        <span className={styles.bio}>
                            {user?.bio ? user.bio : 'Расскажите о себе...'}
                        </span>
                    </div>
                </div>
            </header>
            <div className={styles.profileButtons}>
                <button className={styles.addPostButton} onClick={() => setIsAddPostModalOpen(true)}>
                    <img className={styles.addIcon} src={addIcon} alt="Add Publication" />
                    <span className={styles.addPostButtonText}>Опубликовать</span>
                </button>
                <button className={styles.editButton} onClick={() => setIsEditProfileModalOpen(true)}>
                    <img className={styles.editIcon} src={editIcon} alt="Edit Profile" />
                    <span className={styles.editButtonText}>Редактировать</span>
                </button>
            </div>
            <PetList pets={pets} handlePetAdded={handlePetAdded} onAddPetClick={() => setIsAddPetModalOpen(true)} />
            <PostPreviewList posts={posts} handlePostAdded={handlePostAdded} />
            <PetModal 
                isOpen={isAddPetModalOpen}
                onClose={() => setIsAddPetModalOpen(false)}
                onPetAdded={handlePetAdded}
                editablePet={null}
            />
            <AddPostModal 
                isOpen={isAddPostModalOpen} 
                onClose={() => setIsAddPostModalOpen(false)}
                onPostAdded={handlePostAdded}
            />
            <EditProfileModal 
                isOpen={isEditProfileModalOpen} 
                onClose={() => setIsEditProfileModalOpen(false)} 
            />
        </div>
    );
};

export default Profile;
