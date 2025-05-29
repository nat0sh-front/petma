import styles from './Chat.module.scss'
import ChatList from '../ChatList/ChatList'
import ChatWindow from '../ChatWindow/ChatWindow'
import EmptyState from '../EmptyState/EmptyState'
import { useContext, useState } from 'react'
import { AuthContext } from '../../context/AuthContext'

const Chat = () => {
  const { user } = useContext(AuthContext);
  const currentUserId = user?.id;

  const [selectedChatId, setSelectedChatId] = useState(null);

  const handleSelectChat = (chatId) => {
    setSelectedChatId(chatId);
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
          <EmptyState message="Выберите, кому хотели бы написать" />
        </div>
      )}
    </div>
  )
}

export default Chat;
