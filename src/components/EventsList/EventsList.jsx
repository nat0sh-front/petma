import React from 'react'
import styles from './EventsList.module.scss'
import Event from '../Event/Event'
import EventsHeader from '../EventsHeader/EventsHeader'

const EventsList = () => {
  return (
    <div className={styles.events}>
        <EventsHeader />
        <Event />
        <Event />
    </div>
  )
}

export default EventsList