import React from 'react'
import styles from './EventsHeader.module.scss'
import plus from '../../assets/icons/plus.svg'

const EventsHeader = () => {
  return (
    <div className={styles.eventsHeader}>
        <div className={styles.eventFilters}>
          <button className={styles.allEventsButton}>Все события</button>
          <button className={styles.myEventsButton}>Мои события</button>
          <select className={styles.cityFilter}>
            <option value="0">Местоположение</option>
            <option value="1">Алматы</option>
            <option value="2">Астана</option>
            <option value="3">Актау</option>
          </select>
        </div>
        <div className={styles.buttonWrapper}>
          <button className={styles.createEventButton}>
            <span>Создать</span>
            <img className={styles.plusIcon} src={plus} alt="" />
          </button>
        </div>
    </div>
  )
}

export default EventsHeader