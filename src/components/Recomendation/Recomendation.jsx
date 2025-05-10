import React from 'react';
import styles from './Recomendation.module.scss';
import defaultAvatar from '../../assets/images/avatar.png';
import { Link } from 'react-router-dom';

const Recomendation = ({ user, subscribed, onToggle }) => {

  return (
    <div className={styles.friendRec}>
      <div className={styles.friendHeader}>
        <Link className={styles.friendLinkProfile} to={`/profile/${user?.id}`}>
          <div className={styles.friendInfo}>
            <img className={styles.avatar} src={user?.avatar || defaultAvatar} alt='avatar' />
            <div className={styles.friendText}>
              <div className={styles.name}>{user.name} {user.surname}</div>
            </div>
          </div>
        </Link>
        <button className={styles.subButton} onClick={() => onToggle(user.id)}>
          {subscribed ? 'Отписаться' : 'Подписаться'}
        </button>
      </div>
    </div>
  );
};

export default Recomendation;
