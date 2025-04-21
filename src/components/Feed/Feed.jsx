import React, { useEffect, useState } from 'react';
import styles from './Feed.module.scss';
import Post from '../Post/Post';
import axios from 'axios';

const Feed = () => {
  const [posts, setPosts] = useState([]);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/posts')
      .then((res) => {
        setPosts(res.data.reverse()); // показываем новые посты первыми
      })
      .catch((err) => {
        console.error('Ошибка при загрузке постов:', err);
      });
  }, []);

  useEffect(() => {
    axios.get('http://localhost:5000/users')
        .then(res => setUsers(res.data))
        .catch(err => console.error('Ошибка при загрузке пользователей:', err));
  }, []);

  return (
    <div className={styles.feed}>
      {posts.map(post => {
        const user = users.find(user => user.id === post.authorId);
        return (
          <React.Fragment key={post.id}>
            <Post post={post} user={user} onUpdatePost={(updatedPost) => {
              setPosts(posts.map(post => post.id === updatedPost.id ? updatedPost : post));
            }} />
            <hr className={styles.postHR} />
          </React.Fragment>
        );
      })}
    </div>
  );
}

export default Feed;
