import styles from './Chat.module.scss'
import ChatList from '../ChatList/ChatList'
import ChatWindow from '../ChatWindow/ChatWindow'
import EmptyState from '../EmptyState/EmptyState'
import { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../../context/AuthContext'
import { useNavigate } from 'react-router-dom'

const Chat = ({chatId}) => {
  const { user } = useContext(AuthContext);
  const currentUserId = user?.id;
  const navigate = useNavigate();


  const [selectedChatId, setSelectedChatId] = useState(null);

useEffect(() => {
  setSelectedChatId(chatId || null);
}, [chatId]);

  const handleSelectChat = (id) => {
    setSelectedChatId(id);
    navigate(`/chat/${id}`); // меняем URL при выборе чата
  }

  return (
    <div className={styles.chat}>
      <ChatList
        currentUserId={currentUserId}
        selectedChatId={selectedChatId}
        onSelectChat={handleSelectChat}
      />

      {selectedChatId ? (
        <ChatWindow currentUserId={currentUserId} chatId={selectedChatId} />
      ) : (
        <div className={styles.chatWindow}>
          <EmptyState message="Откройте или создайте чат, чтобы начать общение" />
        </div>
      )}
    </div>
  )
}

export default Chat;
