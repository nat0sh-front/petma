import React from 'react'
import styles from './ChatLayout.module.scss'
import EmptyState from '../../components/EmptyState/EmptyState'
import Chat from '../../components/Chat/Chat'

const ChatLayout = ({ chatId }) => {
  return (
    <div className={styles.chatLayout}>
        <Chat chatId={chatId} />
    </div>
  )
}

export default ChatLayout