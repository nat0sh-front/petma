import styles from './MessageItem.module.scss';

const MessageItem = ({ message, isOwn }) => {
  return (
    <div className={`${styles.message} ${isOwn ? styles.own : ''}`}>
        <p className={styles.messageText}>
            {message.text}
        </p>
        <span className={styles.messageTime}>
            {message.time.slice(11, 16)}
        </span>
    </div>
  )
}

export default MessageItem