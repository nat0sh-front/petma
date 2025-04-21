import React from 'react';
import styles from './FriendRec.module.scss';
import defaultAvatar from '../../assets/images/avatar.png';

const FriendRec = ({ user }) => {

  return (
    <div className={styles.friendRec}>
      <div className={styles.friendHeader}>
        <div className={styles.friendInfo}>
          <img className={styles.avatar} src={user?.avatar || defaultAvatar} alt='avatar' />
          <div className={styles.friendText}>
            <div className={styles.name}>{user.name} {user.surname}</div>
          </div>
        </div>
        <button className={styles.subButton}>
          Подписаться
        </button>
      </div>
    </div>
  );
};

export default FriendRec;
