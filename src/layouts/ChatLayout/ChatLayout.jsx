import React from 'react'
import styles from './ChatLayout.module.scss'
import EmptyState from '../../components/EmptyState/EmptyState'

const ChatLayout = () => {
  return (
    <div className={styles.chatLayout}>
        <EmptyState message={"Чат находится в разработке"} />
    </div>
  )
}

export default ChatLayout