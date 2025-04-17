import React, { useContext } from "react";
import styles from "./Comment.module.scss";
import defaultAvatar from "../../assets/images/avatar.png";
import { AuthContext } from "../../context/AuthContext";

const Comment = ({ comment, author, onDelete }) => {
  const {user} = useContext(AuthContext);

  const isAuthor = user?.id === comment.authorId;

  if (!author) return null;
  
  return (
    <div className={styles.comment}>
      <div className={styles.commentHeader}>
        <div className={styles.commentAuthor}>
          <img
            className={styles.avatar}
            src={author.avatar || defaultAvatar}
            alt=""
          />
          <span className={styles.userName}>
            {author.name} {author.surname}
          </span>
        </div>
        <span className={styles.commentTime}>
          {comment.createdAt}
        </span>
      </div>
      <div className={styles.commentContent}>
        <p className={styles.commentText}>{comment.text}</p>
        {comment.authorId === user.id &&
        <svg
          className={styles.commentIcon}
          fill="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
          onClick={onDelete}
        >
          <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
          <g
            id="SVGRepo_tracerCarrier"
            stroke-linecap="round"
            stroke-linejoin="round"
          ></g>
          <g id="SVGRepo_iconCarrier">
            <path d="M5.755,20.283,4,8H20L18.245,20.283A2,2,0,0,1,16.265,22H7.735A2,2,0,0,1,5.755,20.283ZM21,4H16V3a1,1,0,0,0-1-1H9A1,1,0,0,0,8,3V4H3A1,1,0,0,0,3,6H21a1,1,0,0,0,0-2Z"></path>
          </g>
        </svg> }
      </div>
    </div>
  );
};

export default Comment;
