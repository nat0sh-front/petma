import React from 'react';
import styles from './FriendRec.module.scss';
import plus from '../../assets/icons/plus.svg';
import defaultAvatar from '../../assets/images/avatar.png';

const FriendRec = ({ user }) => {

  return (
    <div className={styles.friendRec}>
      <div className={styles.friendHeader}>
        <div className={styles.friendInfo}>
          <img className={styles.avatar} src={user?.avatar || defaultAvatar} alt='avatar' />
          <div className={styles.friendText}>
            <div className={styles.name}>{user.name} {user.surname}</div>
            {/* <div className={styles.bio}>{user.bio}</div> */}
          </div>
        </div>
        <button className={styles.addButton}>
          <svg className={styles.addIcon} width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M10 1V10M10 10V19M10 10H1M10 10H19" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
          </svg>
        </button>
      </div>
    </div>
  );
};

export default FriendRec;
