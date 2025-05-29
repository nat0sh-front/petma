import styles from './MessageItem.module.scss';

const MessageItem = ({ message, isOwn }) => {

  const localTime = new Date(message.time).toLocaleTimeString('ru-RU', {
    hour: '2-digit',
    minute: '2-digit',
  });

  return (
    <div className={`${styles.message} ${isOwn ? styles.own : ''}`}>
        <p className={styles.messageText}>
            {message.text}
        </p>
        <span className={styles.messageTime}>
            {localTime}
        </span>
    </div>
  )
}

export default MessageItem