import React, { useContext, useEffect, useState } from 'react'
import styles from './RecomendationList.module.scss'
import axios from 'axios';
import { AuthContext } from '../../context/AuthContext';
import Recomendation from '../Recomendation/Recomendation';

const RecomendationList = () => {
  const [users, setUsers] = useState([]);
  const [subscriptions, setSubscriptions] = useState([]);
  const { user } = useContext(AuthContext);
  const currentUserId = user.id;

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
    } catch (error) {
      console.error('Ошибка при загрузке пользователей:', error);
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


  return (
    <div className={styles.recomendations}>
      {users.map((user) => (
        <Recomendation key={user.id} user={user} subscribed={isSubscribed(user.id)} onToggle={toggleSubscription} />
      ))}
    </div>
  )
}

export default RecomendationList