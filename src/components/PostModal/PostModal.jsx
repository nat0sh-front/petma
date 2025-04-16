import React, { useContext, useEffect, useState } from 'react'
import styles from './PostModal.module.scss'
import defaultBackground from '../../assets/images/background.jpg';
import defaultAvatar from '../../assets/images/avatar.png';
import menu from '../../assets/icons/menu.svg';
import like from '../../assets/icons/like.svg';
import comment from '../../assets/icons/comment.svg';
import plane from '../../assets/icons/plane.svg'
import Comment from '../Comment/Comment';
import { AuthContext } from '../../context/AuthContext';
import axios from 'axios';

const PostModal = ({ isOpen, onClose, post }) => {
    const { user } = useContext(AuthContext);
    const [users, setUsers] = useState([]);
    const [newComment, setNewComment] = useState(''); 
    const [comments, setComments] = useState(post.comments || []); 
    const [newCommentText, setNewCommentText] = useState('');
    const [currentPost, setCurrentPost] = useState(post);

    useEffect(() => {
        if (isOpen) {
            axios.get('http://localhost:5000/users')
                .then(res => setUsers(res.data))
                .catch(err => console.error('Ошибка при загрузке пользователей:', err));
    
            setCurrentPost(post); // обновить текущий пост
        }
    }, [isOpen, post]);

    const handleCommentSubmit = () => {
        if (newCommentText.trim() === '') return;
    
        const newComment = {
            id: Date.now().toString(),
            authorId: user.id,
            text: newCommentText,
            createdAt: new Date().toISOString(),
        };
    
        const updatedComments = [...(currentPost.comments || []), newComment];
    
        axios.patch(`http://localhost:5000/posts/${post.id}`, {
            comments: updatedComments
        })
        .then(res => {
            setCurrentPost(res.data); 
            setNewCommentText('');
        })
        .catch(err => {
            console.error("Ошибка при добавлении комментария:", err);
        });
    };

    if (!isOpen || !post) return null;

    function formatDate(dateString) {
        const date = new Date(dateString);
        return date.toLocaleDateString("ru-RU", {
            day: "numeric",
            month: "long",
            year: "numeric",
        });
    }

    const formattedDate = formatDate(post.createdAt);

    return (
    <div className={styles.modalOverlay} onClick={onClose}>
        <button className={styles.closeButton} onClick={onClose}>×</button>
        <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
            <div className={styles.postImage}>
                <img 
                    src={post.image || defaultBackground}
                    alt="Post Image"
                    className={styles.previewPost} 
                />
            </div>
            <div className={styles.postInfo}>
                <div className={styles.postHeader}>
                    <div className={styles.postAuthor}>
                        <img 
                            className={styles.avatar} 
                            src={user.avatar || defaultAvatar} 
                            alt="Avatar" 
                        />
                        <div className={styles.author}>
                            <span className={styles.name}>{user.name} {user.surname}</span>
                            <span className={styles.location}>{post.location || ""}</span>
                        </div>
                    </div>
                    <button className={styles.menuButton}>
                        <img className={styles.menuIcon} src={menu} alt="" />
                    </button>
                </div>
                <div className={styles.postText}>
                    <p>{post.text}</p>
                </div>
                <div className={styles.commentList}>
                {(currentPost.comments || []).map(comment => {
                    const commentAuthor = users.find(user => user.id === comment.authorId);
                    return (
                        <Comment 
                            key={comment.id} 
                            comment={comment} 
                            author={commentAuthor} 
                            formatDate={formatDate}
                        />
                    );
                })}
                </div>
                <div className={styles.postFooter}>
                    <ul className={styles.postButtonList}>
                        <li className={styles.postButtonItem}>
                            <img className={styles.likeIcon} src={like} alt="" />
                            <span className={styles.likeCount}>{post.likes}</span>
                        </li>
                        <li className={styles.postButtonItem}>
                            <img className={styles.commentIcon} src={comment} alt="" />
                            <span className={styles.commentCount}>{(currentPost.comments || []).length}</span>
                        </li>
                    </ul>
                    <span className={styles.postTime}>{formattedDate}</span>
                    <div className={styles.commentInputWrapper}>
                        <input type="text" className={styles.commentInput} placeholder="Добавить комментарий..." value={newCommentText} onChange={(e) => setNewCommentText(e.target.value)} />
                        <button className={styles.commentButton} onClick={handleCommentSubmit}><img className={styles.commentButtonIcon} src={plane} alt="" /></button>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default PostModal