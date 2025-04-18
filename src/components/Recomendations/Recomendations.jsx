import React, { useEffect, useState } from 'react'
import styles from './Recomendations.module.scss'
import FriendRec from '../FriendRec/FriendRec'
import axios from 'axios';

const Recomendations = () => {
  const [users, setUsers] = useState([]);

  const fetchUsers = async () => {
    try {
        const response = await axios.get('http://localhost:5000/users');
        setUsers(response.data);
    } catch (error) {
        console.error('Ошибка при загрузке пользователей:', error);
    }
}; 

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div className={styles.recomendations}>
      {users.map((user) => (
        <FriendRec key={user.id} user={user} />
      ))}
    </div>
  )
}

export default Recomendations