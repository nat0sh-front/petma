import styles from './MessageInput.module.scss';
import plane from '../../assets/icons/plane.svg';

const MessageInput = () => {
  return (
    <div className={styles.messageInput}>
        <input type="text" className={styles.input} placeholder="Сообщение..." />
        <button className={styles.sendButton}><img className={styles.sendButtonIcon} src={plane} alt="" /></button>
    </div>
  )
}

export default MessageInput