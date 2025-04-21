import React from 'react'
import Header from '../../components/Header/Header'
import Sidebar from '../../components/Sidebar/Sidebar'
import ChatLayout from '../../layouts/ChatLayout/ChatLayout'
import styles from './ChatPage.module.scss'

const ChatPage = () => {
  return (
    <div className={styles.chatPage}>
        <Header />
        <Sidebar />
        <ChatLayout />
    </div>
  )
}

export default ChatPage