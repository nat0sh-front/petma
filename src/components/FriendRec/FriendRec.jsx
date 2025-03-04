import React from 'react';
import styles from './FriendRec.module.scss';
import plus from '../../assets/icons/plus.svg';
import avatar from '../../assets/images/avatar.png';

const FriendRec = () => {
  const friends = [
    {
        id: 1,
        name: 'Тлек Болатов',
        bio: 'Разводчик собак',
        avatar: avatar
    },
    {
        id: 2,
        name: 'Інжу Сұңқарқызы',
        bio: 'Люблю кошек',
        avatar: avatar
    }
  ];

  return (
    <div className={styles.friendRec}>
      {friends.map((friend) => (
        <div key={friend.id} className={styles.friendHeader}>
          <div className={styles.friendInfo}>
            <img className={styles.avatar} src={friend.avatar} alt={friend.name} />
            <div className={styles.friendText}>
              <div className={styles.name}>{friend.name}</div>
              <div className={styles.bio}>{friend.bio}</div>
            </div>
          </div>
          <button className={styles.addButton}>
            <img className={styles.addIcon} src={plus} alt="Add friend" />
          </button>
        </div>
      ))}
    </div>
  );
};

export default FriendRec;
