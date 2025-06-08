import React, { useContext, useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

import styles from './Profile.module.scss';

import defaultAvatar from '../../assets/images/avatar.png';
import addIcon from '../../assets/icons/plus.svg';
import editIcon from '../../assets/icons/edit.svg';
import chatIcon from "../../assets/icons/chat.svg";
import EditProfileModal from '../EditProfileModal/EditProfileModal';
import PetList from '../PetList/PetList';
import PostPreviewList from '../PostPreviewList/PostPreviewList';
import AddPostModal from '../AddPostModal/AddPostModal';
import axios from 'axios';
import PetModal from '../PetModal/PetModal';

const Profile = () => {
  const { user } = useContext(AuthContext);
  const { id: profileId } = useParams();
  const navigate = useNavigate();

  const [profileUser, setProfileUser] = useState(null);
  const [isEditProfileModalOpen, setIsEditProfileModalOpen] = useState(false);
  const [isAddPostModalOpen, setIsAddPostModalOpen] = useState(false);
  const [isAddPetModalOpen, setIsAddPetModalOpen] = useState(false);

  const [posts, setPosts] = useState([]);
  const [pets, setPets] = useState([]);
  const [followers, setFollowers] = useState([]);
  const [following, setFollowing] = useState([]);

  const isOwnProfile = user?.id === profileId;

  const [isFollowingProfileUser, setIsFollowingProfileUser] = useState(false);

  const [isLoading, setIsLoading] = useState(true);

  const checkIfFollowing = async (currentUserId, targetUserId) => {
    try {
        const res = await axios.get(`http://localhost:5000/subscriptions?followerId=${currentUserId}&followingId=${targetUserId}`);
        setIsFollowingProfileUser(res.data.length > 0);
    } catch (error) {
        console.error('Ошибка при проверке подписки:', error);
    }
  };

  const handleSubscribe = async () => {
    try {
        await axios.post('http://localhost:5000/subscriptions', {
        followerId: user.id,
        followingId: profileUser.id
        });
        setIsFollowingProfileUser(true);
        fetchSubscriptions(profileUser.id); // обновим счетчики
    } catch (error) {
        console.error('Ошибка при подписке:', error);
    }
    };

    const handleUnsubscribe = async () => {
    try {
        const res = await axios.get(`http://localhost:5000/subscriptions?followerId=${user.id}&followingId=${profileUser.id}`);
        if (res.data.length > 0) {
        const subId = res.data[0].id;
        await axios.delete(`http://localhost:5000/subscriptions/${subId}`);
        setIsFollowingProfileUser(false);
        fetchSubscriptions(profileUser.id);
        }
    } catch (error) {
        console.error('Ошибка при отписке:', error);
    }
    };

  const fetchProfileUser = async () => {
    try {
      const res = await axios.get(`http://localhost:5000/users/${profileId}`);
      setProfileUser(res.data);
    } catch (error) {
      console.error('Ошибка при загрузке профиля:', error);
    }
  };

  const fetchPosts = async (authorId) => {
    try {
      const res = await axios.get('http://localhost:5000/posts', { params: { authorId } });
      setPosts(res.data.reverse());
    } catch (error) {
      console.error('Ошибка при загрузке постов:', error);
    }
  };

  const fetchPets = async (ownerId) => {
    try {
      const res = await axios.get('http://localhost:5000/pets', { params: { ownerId } });
      setPets(res.data);
    } catch (error) {
      console.error('Ошибка при загрузке питомцев:', error);
    }
  };

  const fetchSubscriptions = async (userId) => {
    try {
      const [subsRes, followersRes] = await Promise.all([
        axios.get(`http://localhost:5000/subscriptions?followerId=${userId}`),
        axios.get(`http://localhost:5000/subscriptions?followingId=${userId}`)
      ]);

      const followingIds = subsRes.data.map(sub => sub.followingId);
      const followerIds = followersRes.data.map(sub => sub.followerId);

      const [followingUsersRes, followerUsersRes] = await Promise.all([
        followingIds.length
          ? axios.get(`http://localhost:5000/users?${followingIds.map(id => `id=${id}`).join('&')}`)
          : Promise.resolve({ data: [] }),

        followerIds.length
          ? axios.get(`http://localhost:5000/users?${followerIds.map(id => `id=${id}`).join('&')}`)
          : Promise.resolve({ data: [] })
      ]);

      setFollowing(followingUsersRes.data.filter(u => u.id !== userId));
      setFollowers(followerUsersRes.data.filter(u => u.id !== userId));
    } catch (error) {
      console.error('Ошибка при загрузке подписок:', error);
    }
  };

    useEffect(() => {
  if (profileId) {
    setIsLoading(true);
    fetchProfileUser().finally(() => {
      setTimeout(() => {
        setIsLoading(false);
      }, 1500); // Задержка в 1.5 секунды
    });
  }
}, [profileId]);


    useEffect(() => {
    if (profileUser?.id) {
        fetchPosts(profileUser.id);
        fetchPets(profileUser.id);
        fetchSubscriptions(profileUser.id);

        // только если чужой профиль
        if (!isOwnProfile && user?.id) {
        checkIfFollowing(user.id, profileUser.id);
        }
    }
    }, [profileUser]);

  const handlePostAdded = () => {
    fetchPosts(profileUser.id);
  };

  const handlePetAdded = () => {
    fetchPets(profileUser.id);
  };

  const getWordForm = (count, forms) => {
    const lastDigit = count % 10;
    const lastTwoDigits = count % 100;

    if (lastTwoDigits >= 11 && lastTwoDigits <= 14) return `${count} ${forms[2]}`;
    if (lastDigit === 1) return `${count} ${forms[0]}`;
    if (lastDigit >= 2 && lastDigit <= 4) return `${count} ${forms[1]}`;
    return `${count} ${forms[2]}`;
  };

  const petCountText = getWordForm(pets.length, ['питомец', 'питомца', 'питомцев']);
  const followerCountText = getWordForm(followers.length, ['подписчик', 'подписчика', 'подписчиков']);
  const followingCountText = getWordForm(following.length, ['подписка', 'подписки', 'подписок']);

  if (!profileUser) return <div>Загрузка профиля...</div>;

const handleMessageClick = async () => {
  try {
    const res = await axios.get(`http://localhost:5000/chats?participants_like=${user.id}`);
    const chats = res.data;

    const existingChat = chats.find(chat =>
      chat.participants.includes(user.id) && chat.participants.includes(profileUser.id)
    );

    if (existingChat) {
      navigate(`/chat/${existingChat.id}`);
    } else {
      const createRes = await axios.post('http://localhost:5000/chats', {
        participants: [user.id, profileUser.id]
      });

      navigate(`/chat/${createRes.data.id}`);
    }
  } catch (error) {
    console.error('Ошибка при переходе в чат:', error);
  }
};

const renderSkeleton = () => (
  <div style={{ maxWidth: 750}}>
    {/* Header */}
    <div style={{ display: 'flex', alignItems: 'center', marginBottom: 16 }}>
      <Skeleton circle width={100} height={100} />
      <div style={{ marginLeft: 32 }}>
        <Skeleton width={160} height={20} />
        <Skeleton width={120} height={20} style={{ marginTop: 8 }} />
      </div>
      <Skeleton width={100} height={20} style={{ marginLeft: 40 }} />
      <Skeleton width={100} height={20} style={{ marginLeft: 10 }} />
      <Skeleton width={100} height={20} style={{ marginLeft: 10 }} />
    </div>

    {/* Bio */}
    <Skeleton width={240} height={14} style={{ marginBottom: 20 }} />

    {/* Buttons */}
    <div style={{ display: 'flex', gap: 10, marginBottom: 24 }}>
      <Skeleton width={350} height={40} />
      <Skeleton width={350} height={40} />
    </div>

    {/* Pet section */}
    <Skeleton width={100} height={16} style={{ marginBottom: 12 }} />
    <div style={{ display: 'flex', alignItems: 'flex-start', marginBottom: 24 }}>
      <Skeleton circle width={48} height={48} />
      <div style={{ marginLeft: 16, flex: 1 }}>
        <Skeleton width={100} height={14} style={{ marginBottom: 8 }} />
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 8 }}>
          <Skeleton width={60} height={20} />
          <Skeleton width={60} height={20} />
          <Skeleton width={60} height={20} />
        </div>
        <Skeleton width={220} height={12} />
        <Skeleton width={180} height={12} style={{ marginTop: 4 }} />
      </div>
    </div>

    {/* Publications */}
    <Skeleton width={100} height={16} style={{ marginBottom: 12 }} />
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, 230px)', gap: 10 }}>
      {Array(3).fill(0).map((_, idx) => (
        <Skeleton key={idx} height={230} style={{ borderRadius: 8 }} />
      ))}
    </div>
  </div>
);

return (
  <div className={styles.profile}>
    {isLoading ? (
      <div className={styles.profile}>
        {renderSkeleton()}
      </div>
    ) : (
      <>
        <header className={styles.header}>
          <img className={styles.avatar} src={profileUser?.avatar || defaultAvatar} alt="Avatar" />
          <div className={styles.info}>
            <div className={styles.nameContainer}>
              <span className={styles.name}>
                {profileUser?.name || 'Гость'} {profileUser?.surname || ''}
              </span>
            </div>
            <div className={styles.countContainer}>
              <span className={styles.petCount}>{petCountText}</span>
              <span className={styles.followingCount}>{followingCountText}</span>
              <span className={styles.followerCount}>{followerCountText}</span>
            </div>
            <div className={styles.bioContainer}>
              <span className={styles.bio}>
                {profileUser?.bio || 'Расскажите о себе...'}
              </span>
            </div>
          </div>
        </header>

        <div className={styles.profileButtons}>
          {isOwnProfile ? (
            <>
              <button className={styles.addPostButton} onClick={() => setIsAddPostModalOpen(true)}>
                <img className={styles.addIcon} src={addIcon} alt="Add Publication" />
                <span className={styles.addPostButtonText}>Опубликовать</span>
              </button>
              <button className={styles.editButton} onClick={() => setIsEditProfileModalOpen(true)}>
                <img className={styles.editIcon} src={editIcon} alt="Edit Profile" />
                <span className={styles.editButtonText}>Редактировать</span>
              </button>
            </>
          ) : (
            <>
              <button className={styles.addPostButton} onClick={handleMessageClick}>
                <img className={styles.addIcon} src={chatIcon} alt="Message" />
                <span className={styles.addPostButtonText}>Написать</span>
              </button>
              <button
                className={styles.editButton}
                onClick={isFollowingProfileUser ? handleUnsubscribe : handleSubscribe}
              >
                <span className={styles.editButtonText}>
                  {isFollowingProfileUser ? 'Отписаться' : 'Подписаться'}
                </span>
              </button>
            </>
          )}
        </div>

        <PetList
          pets={pets}
          handlePetAdded={handlePetAdded}
          onAddPetClick={() => setIsAddPetModalOpen(true)}
          isOwnProfile={isOwnProfile}
        />
        <PostPreviewList posts={posts} handlePostAdded={handlePostAdded} />

        {isOwnProfile && (
          <>
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
          </>
        )}
      </>
    )}
  </div>
);
}

export default Profile;
