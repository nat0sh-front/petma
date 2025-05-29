import styles from './ChatPreview.module.scss';
import defaultAvatar from '../../assets/images/avatar.png';

const ChatPreview = ({ otherUser, lastMessage, isSelected, onClick }) => {

  return (
     <div
      className={`${styles.chatPreview} ${isSelected ? styles.selected : ''}`}
      onClick={onClick}
    >
        <img className={styles.chatPreviewAvatar} src={otherUser?.avatar || defaultAvatar} alt="Аватарка" />
        <div className={styles.chatPreviewContent}>
            <h4 className={styles.chatPreviewName}>{otherUser?.name} {otherUser?.surname}</h4>
            <p className={styles.chatPreviewMessage}>{lastMessage}</p>
        </div>
    </div>
  )
}

export default ChatPreview