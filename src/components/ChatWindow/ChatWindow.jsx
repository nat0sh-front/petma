import { useEffect, useState } from "react";
import MessageInput from "../MessageInput/MessageInput";
import MessageList from "../MessageList/MessageList";
import styles from "./ChatWindow.module.scss";
import axios from "axios";

const ChatWindow = ({ currentUserId, chatId }) => {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const res = await axios.get(
          `http://localhost:5000/messages?chatId=${chatId}&_sort=createdAt&_order=asc`
        );
        setMessages(res.data);
      } catch (error) {
        console.error("Ошибка при загрузке сообщений:", error);
        setMessages([]);
      }
    };

    if (chatId) {
      fetchMessages();
    }
  }, [chatId]);

  return (
    <div className={styles.chatWindow}>
      <MessageList currentUserId={currentUserId} messages={messages} />
      <MessageInput
        chatId={chatId}
        currentUserId={currentUserId}
        onSendMessage={(msg) => setMessages((prev) => [...prev, msg])}
      />
    </div>
  );
};

export default ChatWindow;
