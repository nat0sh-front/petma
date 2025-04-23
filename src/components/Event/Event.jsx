import React from 'react'
import styles from './Event.module.scss'
import defaultBackground from '../../assets/images/background.jpg'

const Event = () => {
  return (
    <div className={styles.event}>
      <div className={styles.eventImageWrapper}>
        <img className={styles.eventImage} src={defaultBackground} alt="" />
      </div>
      <div className={styles.eventInfo}>
        <h2 className={styles.eventTitle}>Прогулка с собаками</h2>
        <div className={styles.eventDateTime}>
            <p className={styles.eventDate}>25 апреля</p>
            <p className={styles.eventTime}>10 : 00</p>
        </div>
        <div className={styles.eventLocation}>
          <img className={styles.locationIcon} src="" alt="" />
          <span className={styles.locationText}>Парк ЦПКиО</span>
        </div>
        <p className={styles.eventDescription}>Присоединяйстесь к нам для утренней прогулки с собаками.</p>
        <div className={styles.eventActions}>
          <p className={styles.eventOrganizer}>Организатор: Натали Гвоздь</p>
          <button className={styles.joinButton}>Присоединяюсь</button>
        </div>
      </div>
    </div>
  )
}

export default Event