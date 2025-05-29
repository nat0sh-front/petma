import React from 'react'
import Header from '../../components/Header/Header'
import Sidebar from '../../components/Sidebar/Sidebar'
import ChatLayout from '../../layouts/ChatLayout/ChatLayout'
import styles from './ChatPage.module.scss'
import { useParams } from 'react-router-dom'

const ChatPage = () => {
  const { id } = useParams();

  return (
    <div className={styles.chatPage}>
        <Header />
        <Sidebar />
        <ChatLayout chatId={id} />
    </div>
  )
}

export default ChatPage