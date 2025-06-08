import React, { useContext, useEffect, useState } from 'react';
import styles from './RecomendationList.module.scss';
import axios from 'axios';
import { AuthContext } from '../../context/AuthContext';
import Recomendation from '../Recomendation/Recomendation';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

const RecomendationList = () => {
  const [users, setUsers] = useState([]);
  const [subscriptions, setSubscriptions] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { user } = useContext(AuthContext);
  const currentUserId = user?.id;

  const fetchUsers = async () => {
    try {
      const [usersRes, subsRes] = await Promise.all([
        axios.get('http://localhost:5000/users'),
        axios.get(`http://localhost:5000/subscriptions?followerId=${currentUserId}`)
      ]);

      const followingIds = subsRes.data.map(sub => sub.followingId);
      const filteredUsers = usersRes.data.filter(
        user => user.id !== currentUserId && !followingIds.includes(user.id)
      );

      setUsers(filteredUsers);
      setSubscriptions(subsRes.data);
    } catch (error) {
      console.error('Ошибка при загрузке пользователей:', error);
    } finally {
      setTimeout(() => setIsLoading(false), 1000); // Искусственная задержка
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const isSubscribed = (userId) => {
    return subscriptions.some(sub => sub.followingId === userId);
  };

  const toggleSubscription = async (targetUserId) => {
    const existing = subscriptions.find(sub => sub.followingId === targetUserId);

    try {
      if (existing) {
        await axios.delete(`http://localhost:5000/subscriptions/${existing.id}`);
        setSubscriptions(prev => prev.filter(sub => sub.id !== existing.id));
      } else {
        const res = await axios.post('http://localhost:5000/subscriptions', {
          followerId: currentUserId,
          followingId: targetUserId
        });
        setSubscriptions(prev => [...prev, res.data]);
      }
    } catch (error) {
      console.error('Ошибка при изменении подписки:', error);
    }
  };

  const renderSkeletons = () => (
    <div className={styles.recomendations}>
      {Array(4).fill(0).map((_, idx) => (
        <div key={idx} className={styles.skeletonItem} style={{
          display: 'flex',
          alignItems: 'center',
          gap: '12px',
          padding: '10px 0'
        }}>
          <Skeleton circle width={40} height={40} />
          <div style={{ flexGrow: 1 }}>
            <Skeleton width={120} height={14} />
          </div>
          <Skeleton width={90} height={28} borderRadius={10} />
        </div>
      ))}
    </div>
  );

  return (
    <div className={styles.recomendations}>
      {isLoading
        ? renderSkeletons()
        : users.map((user) => (
            <Recomendation
              key={user.id}
              user={user}
              subscribed={isSubscribed(user.id)}
              onToggle={toggleSubscription}
            />
          ))
      }
    </div>
  );
};

export default RecomendationList;
