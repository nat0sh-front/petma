import React from 'react'
import styles from './EventsLayout.module.scss'
import EventsList from '../../components/EventsList/EventsList'

const EventsLayout = () => {
  return (
    <div className={styles.eventsLayout}>
      <EventsList />  
    </div>
  )
}

export default EventsLayout