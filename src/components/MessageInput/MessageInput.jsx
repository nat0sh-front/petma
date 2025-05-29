import { useState } from 'react';
import styles from './MessageInput.module.scss';
import plane from '../../assets/icons/plane.svg';
import axios from 'axios';

const MessageInput = ({ chatId, currentUserId, onSendMessage }) => {
  const [text, setText] = useState('');

  const handleInputChange = (e) => {
    setText(e.target.value);
  };

  const handleSend = async () => {
    if (!text.trim()) return;

    const newMessage = {
      chatId,
      senderId: currentUserId,
      text,
      time: new Date().toISOString(),
    };

    try {
      const response = await axios.post('http://localhost:5000/messages', newMessage);
      onSendMessage(response.data); // добавляем в UI
      setText('');
    } catch (error) {
      console.error('Ошибка при отправке сообщения:', error);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleSend();
    }
  };

  return (
    <div className={styles.messageInput}>
      <input
        type="text"
        className={styles.input}
        placeholder="Сообщение..."
        value={text}
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
      />
      <button className={styles.sendButton} onClick={handleSend}>
        <img className={styles.sendButtonIcon} src={plane} alt="Send" />
      </button>
    </div>
  );
};

export default MessageInput;
