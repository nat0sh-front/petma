import { useEffect, useState } from "react";
import styles from "./ChatList.module.scss";
import ChatPreview from "../ChatPreview/ChatPreview";
import axios from "axios";

const ChatList = ({ currentUserId, selectedChatId, onSelectChat }) => {
  const [chats, setChats] = useState([]);

  useEffect(() => {
    const fetchChats = async () => {
      try {
        const userChatsRes = await axios.get(
          `http://localhost:5000/chatUsers?userId=${currentUserId}`
        );
        const chatIds = userChatsRes.data.map((item) => item.chatId);

        const chatsData = await Promise.all(
          chatIds.map(async (chatId) => {
            const chatUsersRes = await axios.get(
              `http://localhost:5000/chatUsers?chatId=${chatId}`
            );
            const usersInChat = chatUsersRes.data;

            const otherUserEntry = usersInChat.find(
              (u) => +u.userId !== +currentUserId
            );
            if (!otherUserEntry) return null;

            const otherUserRes = await axios.get(
              `http://localhost:5000/users/${otherUserEntry.userId}`
            );

            const res = await axios.get(`http://localhost:5000/messages?chatId=${chatId}`);
            const sortedMessages = res.data.sort((a, b) => Number(b.id) - Number(a.id));
            const lastMessage = sortedMessages[0]?.text || 'Нет сообщений';

            return {
              chatId,
              otherUser: otherUserRes.data,
              lastMessage,
            };
          })
        );

        const filteredChats = chatsData.filter((chat) => chat !== null);
        setChats(filteredChats);
      } catch (error) {
        console.error("Ошибка при загрузке чатов:", error);
        setChats([]);
      }
    };

    fetchChats();
  }, [currentUserId]);

  return (
    <div className={styles.chatList}>
      {chats.map((chat) => (
        <ChatPreview
          key={chat.chatId}
          otherUser={chat.otherUser}
          lastMessage={chat.lastMessage}
          isSelected={chat.chatId === selectedChatId}
          onClick={() => onSelectChat(chat.chatId)}
        />
      ))}
    </div>
  );
};

export default ChatList;
