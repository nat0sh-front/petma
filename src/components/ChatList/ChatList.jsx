import { useEffect, useState } from "react";
import styles from "./ChatList.module.scss";
import ChatPreview from "../ChatPreview/ChatPreview";
import axios from "axios";
import EmptyState from "../EmptyState/EmptyState";

const ChatList = ({ currentUserId, selectedChatId, onSelectChat }) => {
  const [chats, setChats] = useState([]);

  useEffect(() => {
    if (!currentUserId) return;

const fetchChats = async () => {
  try {
    const { data: allChats } = await axios.get("http://localhost:5000/chats");

    const userChats = allChats.filter(chat =>
      chat.participants.includes(currentUserId)
    );

    const chatPromises = userChats.map(async (chat) => {
      const otherUserId = chat.participants.find(id => id !== currentUserId);

      const [userRes, messagesRes] = await Promise.all([
        axios.get(`http://localhost:5000/users/${otherUserId}`),
        axios.get(`http://localhost:5000/messages?chatId=${chat.id}`)
      ]);

      const messages = messagesRes.data;
      if (messages.length === 0) return null; // Пропускаем чаты без сообщений

      const lastMessage = messages
        .sort((a, b) => new Date(b.time) - new Date(a.time))[0].text;

      return {
        chatId: chat.id,
        otherUser: userRes.data,
        lastMessage
      };
    });

    const results = await Promise.all(chatPromises);
    const filteredResults = results.filter(chat => chat !== null); // Убираем null

    setChats(filteredResults);
  } catch (error) {
    console.error("Ошибка при загрузке чатов:", error);
    setChats([]);
  }
};

    fetchChats();
  }, [currentUserId]);

return (
  <div className={styles.chatList}>
    {chats.length > 0 ? (
      chats.map((chat) => (
        <ChatPreview
          key={chat.chatId}
          otherUser={chat.otherUser}
          lastMessage={chat.lastMessage}
          isSelected={chat.chatId === selectedChatId}
          onClick={() => onSelectChat(chat.chatId)}
        />
      ))
    ) : (
      <EmptyState message="Пока что у вас нет чатов. Напишите первому другу!" />
    )}
  </div>
);

};

export default ChatList;
