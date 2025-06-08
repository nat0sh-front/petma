import { useEffect, useState } from "react";
import styles from "./ChatList.module.scss";
import ChatPreview from "../ChatPreview/ChatPreview";
import axios from "axios";
import EmptyState from "../EmptyState/EmptyState";

const ChatList = ({ currentUserId, selectedChatId, onSelectChat }) => {
  const [chats, setChats] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

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
          if (messages.length === 0) return null;

          const lastMessage = messages
            .sort((a, b) => new Date(b.time) - new Date(a.time))[0].text;

          return {
            chatId: chat.id,
            otherUser: userRes.data,
            lastMessage
          };
        });

        const results = await Promise.all(chatPromises);
        const filteredResults = results.filter(chat => chat !== null);

        setTimeout(() => {
          setChats(filteredResults);
          setIsLoading(false);
        }, 1500);
      } catch (error) {
        console.error("Ошибка при загрузке чатов:", error);
        setChats([]);
        setIsLoading(false);
      }
    };

    fetchChats();
  }, [currentUserId]);

  const pulseAnimation = {
    animation: "pulse 1.2s infinite ease-in-out"
  };

  const renderSkeletons = () => {
    return Array.from({ length: 6 }).map((_, index) => (
      <div key={index} style={{
        display: "flex",
        alignItems: "center",
        padding: "12px",
        gap: "12px"
      }}>
        <div style={{
          width: "40px",
          height: "40px",
          borderRadius: "50%",
          background: "#e0e0e0",
          flexShrink: 0,
          ...pulseAnimation
        }} />
        <div style={{ flexGrow: 1 }}>
          <div style={{
            height: "12px",
            width: "40%",
            marginBottom: "8px",
            borderRadius: "6px",
            background: "#e0e0e0",
            ...pulseAnimation
          }} />
          <div style={{
            height: "12px",
            width: "70%",
            borderRadius: "6px",
            background: "#e0e0e0",
            ...pulseAnimation
          }} />
        </div>
      </div>
    ));
  };

  return (
    <div className={styles.chatList}>
      <style>
        {`
          @keyframes pulse {
            0% { opacity: 1; }
            50% { opacity: 0.4; }
            100% { opacity: 1; }
          }
        `}
      </style>

      {isLoading ? (
        renderSkeletons()
      ) : chats.length > 0 ? (
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
