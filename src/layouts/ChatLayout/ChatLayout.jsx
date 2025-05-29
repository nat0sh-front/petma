import React from 'react'
import styles from './ChatLayout.module.scss'
import EmptyState from '../../components/EmptyState/EmptyState'
import Chat from '../../components/Chat/Chat'

const ChatLayout = () => {
  return (
    <div className={styles.chatLayout}>
        <Chat />
    </div>
  )
}

export default ChatLayout