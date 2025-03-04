import React from 'react'
import styles from './Recomendations.module.scss'
import FriendRec from '../FriendRec/FriendRec'

const Recomendations = () => {
  return (
    <div className={styles.recomendations}>
        <FriendRec />
    </div>
  )
}

export default Recomendations