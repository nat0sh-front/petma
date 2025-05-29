import MessageItem from '../MessageItem/MessageItem';
import styles from './MessageList.module.scss';

const MessageList = ({ currentUserId, messages }) => {
  return (
    <div className={styles.messageList}>
      {messages.map((msg) => (
        <MessageItem
          key={msg.id}
          message={msg}
          isOwn={+msg.senderId === +currentUserId}
        />
      ))}
    </div>
  );
};

export default MessageList;
