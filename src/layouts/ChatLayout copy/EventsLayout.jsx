import React from 'react'
import styles from './EventsLayout.module.scss'
import Events from '../../components/EventsList/Events'

const EventsLayout = () => {
  return (
    <div className={styles.eventsLayout}>
        <Events />
    </div>
  )
}

export default EventsLayout