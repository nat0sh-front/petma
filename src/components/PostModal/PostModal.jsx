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

const PostModal = ({ isOpen, onClose, onPostAdded, post }) => {
    const { user } = useContext(AuthContext);
    const [users, setUsers] = useState([]);
    const [newCommentText, setNewCommentText] = useState('');
    const [currentPost, setCurrentPost] = useState(post);
    const [isPostMenuOpen, setIsPostMenuOpen] = useState(false);
    const [isLiked, setIsLiked] = useState(false);
    const [author, setAuthor] = useState(null);

    useEffect(() => {
        if (users.length > 0 && post?.authorId) {
            const foundAuthor = users.find(user => user.id === post.authorId);
            setAuthor(foundAuthor);
        }
    }, [users, post]);

    useEffect(() => {
        if (isOpen) {
          axios.get('http://localhost:5000/users')
            .then(res => setUsers(res.data))
            .catch(err => console.error('Ошибка при загрузке пользователей:', err));
        }
      }, [isOpen]);
      
    useEffect(() => {
        setCurrentPost(post);
    }, [post]);

    useEffect(() => {
        setIsLiked( currentPost.likedBy?.includes(user?.id) || false );
    }, [currentPost, user?.id]);

    if (!isOpen || !post) return null;

    function formatDate(dateString) {
        const date = new Date(dateString);
        return date.toLocaleDateString("ru-RU", {
            day: "numeric",
            month: "long",
            year: "numeric",
        });
    }

    const handleCommentSubmit = () => {
        if (newCommentText.trim() === '') return;
    
        const newComment = {
            id: Date.now().toString(),
            authorId: user.id,
            text: newCommentText,
            createdAt: formatDate(new Date().toISOString()),
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

    const handleCommentDelete = async (commentId) => {
        if (window.confirm("Вы уверены, что хотите удалить этот комментарий?")) {
            try {
                const updatedComments = currentPost.comments.filter(
                    (comment) => comment.id !== commentId
                );
    
                const response = await axios.patch(`http://localhost:5000/posts/${currentPost.id}`, {
                    comments: updatedComments,
                });
    
                setCurrentPost(response.data);
                console.log("Комментарий удалён");
            } catch (error) {
                console.error("Ошибка при удалении комментария:", error);
            }
        }
    };

    const handlePostDelete = async (id) => {
        if (window.confirm("Вы уверены что хотите удалить данный пост?")) {
            try {
                await axios.delete(`http://localhost:5000/posts/${id}`);
                console.log("Пост удалён");
                onPostAdded(); 
                onClose();
            } catch (error) {
                console.error('Ошибка при удалении поста:', error);
            }
        }
    }

    const handleLikeToggle = () => {
        const userId = user.id;
        const alreadyLiked = currentPost.likedBy?.includes(userId);

        const updatedLikedBy = alreadyLiked
            ? currentPost.likedBy.filter(id => id !== userId)
            : [...(currentPost.likedBy || []), userId];
        
        axios.patch(`http://localhost:5000/posts/${currentPost.id}`, {
            likedBy: updatedLikedBy
        })
        .then(res => {
            setCurrentPost(res.data);           
            setIsLiked(!alreadyLiked); 
        })
        .catch(err => console.error("Ошибка при обновлении лайков:", err));
    };       

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
                            src={author?.avatar || defaultAvatar} 
                            alt="Avatar" 
                        />
                        <div className={styles.author}>
                            <span className={styles.name}>{author?.name} {author?.surname}</span>
                            <span className={styles.location}>{post.location || ""}</span>
                        </div>
                    </div>
                    {user.id === post.authorId && (
                    <>
                    <button className={`${styles.menuButton} ${isPostMenuOpen ? styles.active : ''}`} onClick={() => setIsPostMenuOpen(!isPostMenuOpen)}>
                        <img className={styles.menuIcon} src={menu} alt="" />
                    </button>
                    {isPostMenuOpen && (
                        <div className={styles.menuContent}>
                            <button className={styles.deletePostButton} onClick={() => handlePostDelete(post.id)}>
                                <span>Удалить</span>
                            </button>
                        </div>
                    )}
                    </>
                    )}
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
                            onDelete={() => handleCommentDelete(comment.id)}
                        />
                    );
                })}
                </div>
                <div className={styles.postFooter}>
                    <ul className={styles.postButtonList}>
                        <li className={styles.postButtonItem} onClick={handleLikeToggle}>
                            <svg
                                width="18"
                                height="17"
                                viewBox="0 0 18 17"
                                fill={isLiked ? "red" : "none"}
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    d="M8.46111 2.11685L9 2.67356L9.53888 2.11685C11.303 0.294382 14.1528 0.294382 15.917 2.11685C17.6943 3.95302 17.6943 6.93981 15.917 8.77597L9.17963 15.7361C9.08138 15.8376 8.91862 15.8376 8.82037 15.7361L2.08304 8.77597C0.305653 6.93981 0.305653 3.95302 2.08304 2.11685C3.84718 0.294382 6.69698 0.294382 8.46111 2.11685Z"
                                    stroke={isLiked ? "red" : "currentColor"}
                                    strokeWidth="1.5"
                                />
                            </svg>
                            <span className={styles.likeCount}>{currentPost.likedBy?.length || 0}</span>
                        </li>
                        <li className={styles.postButtonItem}>
                            <img className={styles.commentIcon} src={comment} alt="" />
                            <span className={styles.commentCount}>{(currentPost.comments || []).length}</span>
                        </li>
                    </ul>
                    <span className={styles.postTime}>{post.createdAt}</span>
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